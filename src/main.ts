import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // Global Compression
  app.use(compression());

  // Global Validation
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  // App Start
  await app.listen(process.env.PORT || 4000, () => {
    Logger.verbose(`Server is running on port ${process.env.PORT || 4000}`);
  });
}
bootstrap();
