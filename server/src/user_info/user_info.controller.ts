import {
  Body,
  Controller,
  Get,
  Patch,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserInfoService } from './user_info.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UpdateUsernameDto } from './dto/update-username.dto';
import { UpdateBirthdayDto } from './dto/update-birthday.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer.config';

@Controller('userInfo')
export class UserInfoController {
  constructor(private readonly userInfoService: UserInfoService) {}

  @UseGuards(AuthGuard)
  @Get('')
  async getUserInfo(@Request() req) {
    const { id } = req.user;
    return this.userInfoService.getUserInfo(id);
  }

  @UseGuards(AuthGuard)
  @Patch('username')
  async updateUsername(@Request() req, @Body() dto: UpdateUsernameDto) {
    const { id } = req.user;
    return await this.userInfoService.updateUsername(id, dto);
  }

  @UseGuards(AuthGuard)
  @Patch('birthday')
  async updateBirthday(@Request() req, @Body() dto: UpdateBirthdayDto) {
    const { id } = req.user;
    return await this.userInfoService.updateBirthday(id, dto);
  }

  @UseGuards(AuthGuard)
  @Patch('gender')
  async updateGender(@Request() req, @Body() dto: UpdateGenderDto) {
    const { id } = req.user;
    return await this.userInfoService.updateGender(id, dto);
  }

  @UseGuards(AuthGuard)
  @Patch('profileImg')
  @UseInterceptors(FileInterceptor('img', multerOptions))
  async updateProfileImg(
    @Request() req,
    @UploadedFile() img: Express.Multer.File,
  ) {
    const { id } = req.user;
    return await this.userInfoService.updateProfileImg(id, img);
  }
}
