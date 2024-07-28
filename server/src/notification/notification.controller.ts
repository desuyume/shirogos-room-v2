import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer.config';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getUserNotifications(@Req() req) {
    const { id: userId } = req.user;
    return await this.notificationService.getUserNotifications(userId);
  }

  @Post()
  @UseInterceptors(FileInterceptor('img', multerOptions))
  async create(
    @Body() dto: CreateNotificationDto,
    @UploadedFile() img: Express.Multer.File | null,
  ) {
    return await this.notificationService.create(dto, img);
  }

  @Patch('read/:id')
  @UseGuards(AuthGuard)
  async readNotification(@Req() req, @Param('id') notificationId: number) {
    const { id: userId } = req.user;
    return await this.notificationService.readNotification(
      userId,
      notificationId,
    );
  }
}
