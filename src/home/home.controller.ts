import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { HomeService } from './home.service';
import type { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';


@Controller('dashboard')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get('/')
  getAllBooks(): any {
    return this.homeService.getBooks();
  }
  @Get('book/:id')
  searchBooks(@Req() req: Request): any {
    const id = parseInt(req.params.id);
    return this.homeService.getBookById(id);
  }
}
