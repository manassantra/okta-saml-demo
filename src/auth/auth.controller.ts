import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Response, Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor() { }

  @Post('saml/callback')
  @UseGuards(AuthGuard('saml'))
  async callback(@Req() req: Request, @Res() res: Response) {
    if (req.user) {
      // console.log('User authenticated:', req.user);
      // This is critical: persist user into session
      req.login(req.user, (err) => {
        if (err) {
          console.error('Login error:', err);
          return res.status(500).json({ message: 'Login failed' });
        }

        // console.log('>>> Session after login:', req.session);
        return res.redirect('/api/dashboard');
      });
    } else {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }
}
