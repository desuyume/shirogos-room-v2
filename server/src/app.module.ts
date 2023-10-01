import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { DonateModule } from './donate/donate.module';
import { MulterModule } from '@nestjs/platform-express'
import { AuthModule } from './auth/auth.module'
import { RoomContentModule } from './room-content/room-content.module'
import { TokenModule } from './token/token.module'
import { UniqueRoleModule } from './unique-role/unique-role.module'
import { UserModule } from './user/user.module'
import { OrderModule } from './order/order.module';
import { OnlineOptionModule } from './online_option/online_option.module';
import { BirthdayAwardModule } from './birthday_award/birthday_award.module';
import { NewsModule } from './news/news.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
    MulterModule.register({ dest: './static' }),
    DonateModule,
    AuthModule,
    RoomContentModule,
    TokenModule,
    UniqueRoleModule,
    UserModule,
    OrderModule,
    OnlineOptionModule,
    BirthdayAwardModule,
    NewsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
