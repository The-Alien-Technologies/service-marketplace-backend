import { Controller, Get } from '@nestjs/common';
import { Public } from './common/decorators/is-public.decorator';

@Controller()
export class AppController {
  @Public()
  @Get()
  health(): string {
    return 'OK';
  }
}
