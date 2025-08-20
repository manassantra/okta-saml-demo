import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
import passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: process.env.SESSION_SECRET!,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: false, // Set to true if using HTTPS
        sameSite: 'lax', // Set to 'strict' if you want to prevent CSRF attacks (backend + frontend on the same domain)
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.enableCors({
    // origin: 'https://<yourapp>.azurewebsites.net', // Azure production URL
    origin: 'http://localhost:3000', // Adjust as needed in development
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
    exposedHeaders: 'Content-Length, X-Requested-With',
    credentials: true, // Allow cookies to be sent
  });
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
