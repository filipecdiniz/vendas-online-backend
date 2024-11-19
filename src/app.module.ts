import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local']
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
      entities: [`${__dirname}/**/*.entity.{js,ts}`],
      migrations: [`${__dirname}/migration/*.{ts,js}`],
      migrationsRun: true,
      // synchronize: true
    }),
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
