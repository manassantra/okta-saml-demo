import {
  Controller,
  Get,
  Post,
  Redirect,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request, Response } from 'express';

@Controller('auth')
export class AuthController {

  // Step 1: Initiate SAML login
  @Post('login')
  @UseGuards(AuthGuard('saml'))
  async login(@Req() req: Request, @Res() res: Response) {
    if (req.isAuthenticated()) {
      res.redirect(process.env.SP_AUDIENCE_URL || '');
    } else {
      res.status(401).json({ message: "Unauthorized Access !"});
    }
  }

  @Post('callback')
  @UseGuards(AuthGuard('saml'))
  @Redirect(process.env.SP_AUDIENCE_URL, 302)
  async callback() {
    // The user is authenticated by the SAML strategy
    // No additional logic needed here, just redirecting
  }
}


