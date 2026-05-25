import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { corsRules } from '@config/cors.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(corsRules);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
