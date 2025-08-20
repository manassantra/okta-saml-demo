import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { HomeService } from './home.service';
import { AuthenticatedGuard } from 'src/guard/auth.guard';


@Controller('dashboard')
@UseGuards(AuthenticatedGuard)
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get('')
  getAllBooks(): any {
    return this.homeService.getBooks();
  }

  @Get('book/:id')
  searchBooks(@Req() req): any {
    const id = parseInt(req.params.id);
    return this.homeService.getBookById(id);
  }
}
