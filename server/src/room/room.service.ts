import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';

@Injectable()
export class RoomService {
  constructor(private readonly prisma: PrismaService) {}

  async getRoom(userId: number) {
    const room = await this.prisma.room.findUnique({
      where: {
        userId,
      },
    });

    if (!room) {
      throw new BadRequestException('room not found');
    }

    return room;
  }

  async isRoomCreated(userId: number) {
    const room = await this.prisma.room.findUnique({
      where: {
        userId,
      },
    });

    if (!room) {
      return false;
    }

    return true;
  }

  async createRoom(userId: number, dto: CreateRoomDto) {
    const room = await this.prisma.room.findUnique({
      where: {
        userId,
      },
    });

    if (room) {
      throw new BadRequestException('room already created');
    }

    const user = await this.prisma.user.findUnique({
      where: {
        username: dto.username,
      },
    });

    if (user && user.id !== userId) {
      throw new BadRequestException('user with this username already exists');
    }

    const updatedUser = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        username: dto.username,
      },
      select: {
        username: true,
      },
    });

    const updatedRoom = await this.prisma.room.create({
      data: {
        userId,
        name: dto.roomName,
      },
      select: {
        name: true,
      },
    });

    return {
      username: updatedUser.username,
      roomName: updatedRoom.name,
    };
  }
}
