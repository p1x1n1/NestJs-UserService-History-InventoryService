import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const PORT = process.env.USER_PORT
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
     .setTitle('User Service')
     .setDescription('Сервис для работы с пользователями')
     .setVersion('1.0')
     .build();
   const document = SwaggerModule.createDocument(app, config);
   SwaggerModule.setup('api/docs', app, document);

   
   app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,   
      forbidNonWhitelisted: true,
      transform: true,   
    }),
  );

  await app.listen(PORT, ()=>{
    console.log(`User service is running on port ${PORT}`);
  });
}
bootstrap();
