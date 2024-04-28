import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Back End User Management Documentation')
    .setDescription('This application is a REST API crafted using Arch DDD, TDD, and SOLID principles."')
    .setVersion('0.0.1')
    .addBearerAuth() 
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);
}