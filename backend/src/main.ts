import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { corsRules } from '@config/cors.config';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from '@/common/filters/http-exception.filter';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors(corsRules);
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
