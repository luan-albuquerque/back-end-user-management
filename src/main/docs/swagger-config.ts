import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swaggerConfig = (app: NestExpressApplication): void => {
  const config = new DocumentBuilder()
    .setTitle('User Management')
    .setDescription('The User Management in Nestjs API description')
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document);
};
