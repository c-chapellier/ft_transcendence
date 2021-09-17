import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { configService } from "./config/config.service";
import * as session from "express-session";
import * as passport from "passport";
import * as cookieParser from "cookie-parser";
import { getRepository } from "typeorm";
import { TypeORMSession } from "./model/session.entity";
import { TypeormStore } from "connect-typeorm";
import { ValidationPipe } from "@nestjs/common";
import { TransformInterceptor } from "./transform.intercept";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //   const sessionRepo = getRepository(TypeORMSession);
  if (!configService.isProduction()) {
    const document = SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle("Transcendance API")
        .setDescription("The official API of the Transcendance project")
        .build()
    );

    SwaggerModule.setup("api", app, document);
  }
  app.enableCors();
  app.use(
    session({
      cookie: {
        maxAge: 86400000,
      },
      secret: process.env.JWT_SECRET,
      resave: false,
      saveUninitialized: false,
      //   store: new TypeormStore().connect(sessionRepo),
    })
  );
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(passport.session());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    })
  );
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(3001);
}
bootstrap();
