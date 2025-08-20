// saml.strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, SamlConfig } from 'passport-saml';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SamlStrategy extends PassportStrategy(Strategy, 'saml') {

  constructor() {
    const samlOptions: SamlConfig = {
      entryPoint: process.env.OKTA_SSO_ENTRY, // Okta SSO URL
      issuer: process.env.SP_ENTITY_ID,       // SP Entity ID
      callbackUrl: process.env.SP_ACS_URL,    // ACS endpoint
      cert: process.env.OKTA_CERT!,           // Okta x.509 cert
    };

    super(samlOptions);

  }

  async validate(profile: any, done: Function) {
    const user = {
      id: profile.nameID,
      email: profile.email || profile.nameID,
      displayName: profile.displayName || profile.cn,
    };
    done(null, user); // <--- MUST be done(null, user)
  }
}
