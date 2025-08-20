import { Module } from '@nestjs/common';
import { SamlStrategy } from './saml.strategy';
import { AuthController } from './auth.controller';
import { SessionSerializer } from './session.serializer';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule.register({ session: true })],
  controllers: [AuthController],
  providers: [SamlStrategy, SessionSerializer],
})
export class AuthModule {}
