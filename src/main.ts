import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import 'reflect-metadata';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { GLOBAL_PREFIX, SWAGGER_ROUTE } from 'src/helpers/routes';

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(GLOBAL_PREFIX);

  const config = new DocumentBuilder()
    .setTitle('recentbooks')
    .setDescription('Rest api documentation')
    .setVersion('0.0.1')
    .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(SWAGGER_ROUTE, app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: [process.env.FRONTEND_HOSTNAME],
    methods: 'GET, PUT, POST, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });

  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

start();
