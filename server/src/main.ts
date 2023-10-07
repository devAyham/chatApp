import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
    allowedHeaders: [
      'Accept',
      'Authorization',
      'Content-Type',
      'X-Requested-With',
      'apollo-require-preflight',
    ]

  })
  app.use(cookieParser())
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 1000 }));
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    exceptionFactory(errors) {
      {
        const formattedErrors = errors.reduce((accumlator, error) => {
          accumlator[error.property] = Object.values(error.constraints).join(', ');
          return accumlator
        }, {});
        throw new BadRequestException(formattedErrors)
      }
    }
  }))

  await app.listen(3000);
}
bootstrap();
