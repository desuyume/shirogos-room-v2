import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { DonateModule } from './donate/donate.module';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { UniqueRoleModule } from './unique-role/unique-role.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { BirthdayAwardModule } from './birthday_award/birthday_award.module';
import { NewsModule } from './news/news.module';
import { ChronicleModule } from './chronicle/chronicle.module';
import { RoomModule } from './room/room.module';
import { UserStatsModule } from './user_stats/user_stats.module';
import { UserInfoModule } from './user_info/user_info.module';
import { TasksModule } from './tasks/tasks.module';
import { ScheduleModule } from '@nestjs/schedule';
import { BadgeModule } from './badge/badge.module';
import { WikiModule } from './wiki/wiki.module';
import { MangaModule } from './manga/manga.module';
import { StoryModule } from './story/story.module';
import { AlmanacModule } from './almanac/almanac.module';
import { RatingModule } from './rating/rating.module';
import { RoomGuideModule } from './room-guide/room-guide.module';
import { AchievementModule } from './achievement/achievement.module';
import { FrameModule } from './frame/frame.module';
import { BackgroundModule } from './background/background.module';
import { PanopticonModule } from './panopticon/panopticon.module';
import { ManualTaskModule } from './manual-task/manual-task.module';
import { NotificationModule } from './notification/notification.module';
import { DateModule } from './date/date.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '../../../', 'client', 'dist'),
      exclude: ['api/*'],
    }),
    MulterModule.register({ dest: process.env.UPLOAD_LOCATION }),
    DonateModule,
    AuthModule,
    TokenModule,
    UniqueRoleModule,
    UserModule,
    OrderModule,
    BirthdayAwardModule,
    NewsModule,
    ChronicleModule,
    RoomModule,
    UserStatsModule,
    UserInfoModule,
    ScheduleModule.forRoot(),
    TasksModule,
    BadgeModule,
    WikiModule,
    MangaModule,
    StoryModule,
    AlmanacModule,
    RatingModule,
    RoomGuideModule,
    AchievementModule,
    FrameModule,
    BackgroundModule,
    PanopticonModule,
    ManualTaskModule,
    NotificationModule,
    DateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
