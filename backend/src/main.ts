import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { configService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (!configService.isProduction()) {
    const document = SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Transcendance API')
        .setDescription('The official API of the Transcendance project').build(),)

    SwaggerModule.setup('api', app, document);
  }
  app.enableCors();
  await app.listen(3001);
}
bootstrap();
