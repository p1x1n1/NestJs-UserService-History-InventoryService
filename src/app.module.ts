import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './user/user.modele';

@Module({
  imports: [
    ConfigModule.forRoot({//передаём объект содержащий информацию о
      envFilePath: `.${process.env.NODE_ENV}.env` //файл с системными переменными
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.USER_POSTGRES_HOST,
      port: Number(process.env.USER_POSTGRES_PORT),
      username: process.env.USER_POSTGRES_USER,
      password: process.env.USER_POSTGRES_PASSWORD,
      database: process.env.USER_POSTGRES_DB,
      entities: [User],
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
