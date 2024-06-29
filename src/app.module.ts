import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://bimaaurasakti2001:s0WSo2e2JPeDdvZX@cluster0.wxu8aqa.mongodb.net/'),
    AuthModule, 
    UsersModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
