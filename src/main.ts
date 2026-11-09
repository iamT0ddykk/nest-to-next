import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const preferredPort = Number(process.env.PORT ?? 3000);

  try {
    await app.listen(preferredPort);
  } catch (error: any) {
    if (error?.code === 'EADDRINUSE' && preferredPort === 3000) {
      console.warn(
        `Porta ${preferredPort} em uso. Tentando iniciar na porta 3001...`,
      );
      await app.listen(3001);
      return;
    }

    throw error;
  }
}

await bootstrap();
