import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './app/config/swagger.config';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  setupSwagger(app);
  
  await app.listen(process.env.PORT || 3000, () => {
    console.log(
      `Server is running on port http://${process.env.HOST}:${process.env.PORT}`,
    );
    console.log(
      `Swagger running on port http://${process.env.HOST}:${process.env.PORT}/api/docs`,
    );
  });
}
bootstrap();


