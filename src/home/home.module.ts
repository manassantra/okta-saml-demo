import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { SamlStrategy } from 'src/auth/saml.strategy';
import { SessionSerializer } from 'src/auth/session.serializer';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [PassportModule.register({ session: true })],
    controllers: [HomeController],
    providers: [HomeService, AuthModule, SamlStrategy, SessionSerializer],
})
export class HomeModule {}