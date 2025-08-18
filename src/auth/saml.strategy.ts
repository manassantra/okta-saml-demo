import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, SamlConfig } from 'passport-saml';

@Injectable()
export class SamlStrategy extends PassportStrategy(Strategy, 'saml') {
  constructor() {
    const samlConfig: SamlConfig = {
      entryPoint: process.env.OKTA_SSO_ENTRY!, // ! means "non-null"
      issuer: process.env.SP_ENTITY_ID!,
      callbackUrl: process.env.SP_ACS!,
      cert: process.env.OKTA_CERT!, // must be string | string[] | CertCallback
      disableRequestedAuthnContext: true,
    };

    super(samlConfig);
  }

  async validate(profile: any, done: Function) {
    // Passport already verified SAML response.
    return done(null, profile);
  }
}
