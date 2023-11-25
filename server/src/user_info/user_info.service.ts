import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateUsernameDto } from './dto/update-username.dto';
import { UpdateBirthdayDto } from './dto/update-birthday.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { Gender } from '@prisma/client';
import { isURL } from 'class-validator';
import * as path from 'path';
import * as fs from 'fs';
import { isUrl } from 'src/utils/isUrl'
import { removeFile } from 'src/utils/removeFile'

@Injectable()
export class UserInfoService {
  constructor(private prisma: PrismaService) {}

  async getUserInfo(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        username: true,
        birthday: true,
        gender: true,
        profile_img: true,
        discord: true,
        telegram: true,
        twitch: true,
        vk: true,
      },
    });
  }

  async updateUsername(userId: number, dto: UpdateUsernameDto) {
    const userWithNewUsername = await this.prisma.user.findUnique({
      where: {
        username: dto.username,
      },
    });

    if (userWithNewUsername) {
      throw new BadRequestException('user with this username already exists');
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    await this.prisma.pastUsername.create({
      data: {
        username: user.username,
        userId,
      },
    });

    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        username: dto.username,
      },
    });
  }

  async updateBirthday(userId: number, dto: UpdateBirthdayDto) {
    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        birthday: dto.birthday,
      },
    });
  }

  async updateGender(userId: number, dto: UpdateGenderDto) {
    switch (dto.gender) {
      case 'MALE':
        return await this.prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            gender: Gender.MALE,
          },
        });
      case 'FEMALE':
        return await this.prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            gender: Gender.FEMALE,
          },
        });
      default:
        throw new BadRequestException('invalid gender');
    }
  }

  async updateProfileImg(userId: number, img: Express.Multer.File) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!isUrl(user.profile_img)) { // remove img from static folder if it's not URL
      removeFile(user.profile_img);
    }

    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        profile_img: img.filename,
      },
    });
  }
}
