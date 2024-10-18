import { Controller, Get, Query } from '@nestjs/common';
import { RxjsService } from './rxjs.service';

@Controller('rxjs')
export class RxjsController {
  constructor(private rxjsService: RxjsService) {}

  @Get('repositories/')
  async repositories(@Query() { text, hub }: { text: string; hub: string }) {
    return await this.rxjsService.searchRepositories(text, hub);
  }
}
