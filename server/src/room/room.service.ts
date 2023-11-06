import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { ChangeRoomColorDto } from './dto/change-room-color.dto';
import { ChangeUniqueRoleDto } from './dto/change-uniqueRole.dto';
import { BuyUniqueRoleDto } from './dto/buy-uniqueRole.dto';
import { ChooseFavoriteCharacterDto } from './dto/choose-favorite-character.dto';
import { ChooseActiveRoomBackgroundDto } from './dto/choose-active-room-background.dto'

@Injectable()
export class RoomService {
  constructor(private readonly prisma: PrismaService) {}

  async getRoom(userId: number) {
    const room = await this.prisma.room.findUnique({
      where: {
        userId,
      },
      include: {
        user: {
          select: {
            dangos: true,
            exp: true,
            level: true,
            username: true,
            profile_img: true,
            past_usernames: {
              orderBy: {
                created_at: 'desc',
              },
            },
          },
        },
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

  async getAllRoomColors() {
    const allRoomColors = await this.prisma.roomColor.findMany();
    const allUsernameColors = await this.prisma.usernameColor.findMany();
    return {
      roomColors: allRoomColors,
      usernameColors: allUsernameColors,
    };
  }

  async getUserRoomColors(userId: number) {
    const allRoomColors = await this.prisma.roomColor.findMany();
    const allUsernameColors = await this.prisma.usernameColor.findMany();
    const userColors = await this.prisma.room.findUnique({
      where: {
        userId,
      },
      select: {
        room_colors: true,
        active_room_color: true,
        username_colors: true,
        active_username_color: true,
      },
    });

    return {
      roomColors: allRoomColors,
      usernameColors: allUsernameColors,
      userColors: userColors,
    };
  }

  async changeRoomColor(userId: number, dto: ChangeRoomColorDto) {
    return await this.prisma.room.update({
      where: {
        userId,
      },
      data: {
        active_room_color: dto.color,
      },
      select: {
        active_room_color: true,
      },
    });
  }

  async changeUsernameColor(userId: number, dto: ChangeRoomColorDto) {
    return await this.prisma.room.update({
      where: {
        userId,
      },
      data: {
        active_username_color: dto.color,
      },
      select: {
        active_username_color: true,
      },
    });
  }

  async getUserUniqueRoles(userId: number) {
    return await this.prisma.room.findUnique({
      where: {
        userId,
      },
      select: {
        unique_roles: {
          select: {
            UniqueRole: true,
          },
        },
        selected_unique_role_adjective: true,
        selected_unique_role_noun: true,
      },
    });
  }

  async changeUniqueRole(
    userId: number,
    type: string,
    dto: ChangeUniqueRoleDto,
  ) {
    switch (type) {
      case 'adjective':
        return this.prisma.room.update({
          where: {
            userId,
          },
          data: {
            selected_unique_role_adjective: dto.role,
          },
          select: {
            selected_unique_role_adjective: true,
          },
        });
      case 'noun':
        return this.prisma.room.update({
          where: {
            userId,
          },
          data: {
            selected_unique_role_noun: dto.role,
          },
          select: {
            selected_unique_role_noun: true,
          },
        });
      default:
        throw new BadRequestException(`wrong content type`);
    }
  }

  async buyUniqueRole(userId: number, dto: BuyUniqueRoleDto) {
    const uniqueRole = await this.prisma.uniqueRole.findUnique({
      where: {
        id: dto.uniqueRoleId,
      },
    });
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (uniqueRole.cost > user.dangos) {
      throw new BadRequestException('not enough dangos');
    }

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        dangos: {
          decrement: uniqueRole.cost,
        },
      },
    });

    const room = await this.prisma.room.findUnique({
      where: {
        userId,
      },
    });

    return await this.prisma.uniqueRolesOnRooms.create({
      data: {
        uniqueRoleId: uniqueRole.id,
        roomId: room.id,
      },
    });
  }

  async getRoomCharacters(id: number) {
    const userFavoriteCharacter = await this.prisma.room.findUnique({
      where: {
        userId: id,
      },
      select: {
        favorite_character: {
          select: {
            id: true,
          },
        },
      },
    });

    const characterNames = await this.prisma.character.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return {
      favoriteCharacter: userFavoriteCharacter.favorite_character,
      characterNames: characterNames,
    };
  }

  async chooseFavoriteCharacter(
    userId: number,
    dto: ChooseFavoriteCharacterDto,
  ) {
    return await this.prisma.room.update({
      where: {
        userId,
      },
      data: {
        characterId: +dto.characterId,
      },
      select: {
        favorite_character: true,
      },
    });
  }

  async getActiveRoomBackground(userId: number) {
    return await this.prisma.room.findUnique({
      where: {
        userId,
      },
      select: {
        selected_background: true,
      },
    });
  }

  async getRoomBuyedBackgrounds(userId: number) {
    return await this.prisma.room.findUnique({
      where: {
        userId,
      },
      select: {
        buyed_backgrounds: {
          select: {
            RoomBackground: true,
          },
        },
        selected_background: true,
      },
    });
  }

  async chooseActiveRoomBackground(userId: number, dto: ChooseActiveRoomBackgroundDto) {
    return await this.prisma.room.update({
      where: {
        userId,
      },
      data: {
        roomBackgroundId: dto.backgroundId,
      },
      select: {
        selected_background: true,
      },
    })
  }
}
