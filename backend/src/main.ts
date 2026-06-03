import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { corsRules } from '@config/cors.config';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors(corsRules);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
