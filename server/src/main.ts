import 'dotenv/config'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
// import { v4 as uuidv4 } from 'uuid'

async function bootstrap() {
  const PORT = process.env.PORT || 5050
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  })

  

  await app.listen(PORT, () => {console.log(`Server SERVICEAPP started on port = ${PORT}`)})
}
bootstrap()
