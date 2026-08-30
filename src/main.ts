import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SeederService } from './common/seeders/seeder.service';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });
  app.setGlobalPrefix('/api');
  app.use(helmet({ crossOriginResourcePolicy: false }));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  const allowedOrigins = (
    process.env.CORS_ORIGINS ||
    process.env.WEBSITE_URL ||
    'http://localhost:3001'
  )
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  });

  // Serve static files from uploads directory
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  // Run seeders
  const seederService = app.get(SeederService);
  await seederService.runAllSeeders();

  const port = process.env.PORT ?? 3000;

  await app.listen(port);
  console.log(`Running on PORT ${process.env.PORT}`);
}
bootstrap();
