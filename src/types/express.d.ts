import 'express';
import type { Profile } from 'passport-saml';

declare module 'express-serve-static-core' {
  interface Request {
    user?: Profile; // Added by Passport
    logout(callback: (err?: any) => void): void; // Added by Passport
    login(user: any, callback: (err?: any) => void): void; // Optional if you use login()
    isAuthenticated(): boolean;
  }
}
