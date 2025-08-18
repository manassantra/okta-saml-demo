import {
  Controller,
  Get,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  @Get('login')
  @UseGuards(AuthGuard('saml'))
  async login() {
    // Redirect to Okta IdP
  }

  @Get('callback')
  @UseGuards(AuthGuard('saml'))
  async callback(@Req() req: Request, @Res() res: Response) {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    return res.json({
      message: 'Login successful',
      user: req.user, // 👈 now TypeScript won’t complain
    });
  }

  @Get('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    req.logout(() => {
      res.json({ message: 'Logged out' });
    });
  }
}
