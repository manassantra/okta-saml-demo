import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: any, done: Function) {
    // console.log('>>> serializeUser called:', user);
    done(null, user);
  }

  deserializeUser(payload: any, done: Function) {
    // console.log('>>> deserializeUser called:', payload);
    done(null, payload);
  }
}

