import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { SamlStrategy } from 'src/auth/saml.strategy';
import { SessionSerializer } from 'src/auth/session.serializer';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [PassportModule.register({ session: true })],
    controllers: [HomeController],
    providers: [HomeService, SamlStrategy, SessionSerializer],
})
export class HomeModule {}