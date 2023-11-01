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
import { UpdateBirthdayDto } from './dto/update-birthday.dto'
import { UpdateGenderDto } from './dto/update-gender.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname } from 'path'
import { v4 } from 'uuid';

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
  @UseInterceptors(
    FileInterceptor('img', {
      storage: diskStorage({
        destination: './static',
        filename: (req, file, callback) => {
          const ext = extname(file.originalname);
          const imgName = v4() + ext;
          callback(null, imgName);
        },
      }),
    }),
  )
  async updateProfileImg(@Request() req, @UploadedFile() img: Express.Multer.File) {
    const { id } = req.user;
    return await this.userInfoService.updateProfileImg(id, img);
  }
}
