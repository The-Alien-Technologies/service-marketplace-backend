import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SeederService } from './common/seeders/seeder.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.enableCors();

  // Run seeders
  const seederService = app.get(SeederService);
  await seederService.runAllSeeders();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
