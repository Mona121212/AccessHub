import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

/**
 * - Creates the Nest application
 * - Sets global prefix / global pipes
 * - Starts listening on the server port
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set a unified API prefix, similar to ToolJet's urlPrefix + 'api' logic
  app.setGlobalPrefix('api');

  // Enable global validation pipes, used together with class-validator DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const port = 3000;
  await app.listen(port);
  console.log(`🚀 AccessHub is running on http://localhost:${port}/api`);
}

bootstrap();
