import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { DonateModule } from './donate/donate.module';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from './auth/auth.module';
import { RoomContentModule } from './room-content/room-content.module';
import { TokenModule } from './token/token.module';
import { UniqueRoleModule } from './unique-role/unique-role.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { OnlineOptionModule } from './online_option/online_option.module';
import { BirthdayAwardModule } from './birthday_award/birthday_award.module';
import { NewsModule } from './news/news.module';
import { ChronicleModule } from './chronicle/chronicle.module';
import { RoomModule } from './room/room.module';
import { UserStatsModule } from './user_stats/user_stats.module';
import { UserInfoModule } from './user_info/user_info.module';
import { TasksModule } from './tasks/tasks.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AwardModule } from './award/award.module';
import { WikiModule } from './wiki/wiki.module';
import { MangaModule } from './manga/manga.module';
import { StoryModule } from './story/story.module';
import { AlmanacModule } from './almanac/almanac.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', '..', 'static'),
    }),
    MulterModule.register({ dest: process.env.UPLOAD_LOCATION }),
    DonateModule,
    AuthModule,
    RoomContentModule,
    TokenModule,
    UniqueRoleModule,
    UserModule,
    OrderModule,
    OnlineOptionModule,
    BirthdayAwardModule,
    NewsModule,
    ChronicleModule,
    RoomModule,
    UserStatsModule,
    UserInfoModule,
    ScheduleModule.forRoot(),
    TasksModule,
    AwardModule,
    WikiModule,
    MangaModule,
    StoryModule,
    AlmanacModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
