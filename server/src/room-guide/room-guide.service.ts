import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CustomPrismaService } from 'nestjs-prisma';
import { ExtendedPrismaClient } from 'src/prisma.extension';

@Injectable()
export class RoomGuideService {
  constructor(
    @Inject('PrismaService')
    private prisma: CustomPrismaService<ExtendedPrismaClient>,
  ) {}

  async getRandomRooms() {
    return await this.prisma.client.room.findManyRandom(8, {
      select: {
        id: true,
        name: true,
        user: {
          select: {
            id: true,
            username: true,
            profile_img: true,
            miniature_img: true,
          },
        },
      },
    });
  }

  async getRoomsByLevel(limit: number, page: number) {
    const [totalPages, rooms] = await this.prisma.client.$transaction([
      this.prisma.client.room.count(),
      this.prisma.client.room.findMany({
        orderBy: [
          {
            user: {
              level: 'desc',
            },
          },
          {
            user: {
              exp: 'desc',
            },
          },
          {
            user: {
              username: 'asc',
            }
          }
        ],
        take: limit,
        skip: (page - 1) * limit,
        select: {
          id: true,
          name: true,
          selected_background: {
            select: {
              id: true,
              img: true,
            },
          },
          user: {
            select: {
              id: true,
              username: true,
              level: true,
              profile_img: true,
              miniature_img: true,
            },
          },
        },
      }),
    ]);

    return {
      totalPages: Math.ceil(totalPages / limit),
      rooms,
    };
  }

  async getRoomByUsername(username: string) {
    const user = await this.prisma.client.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const room = await this.prisma.client.room.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
        name: true,
        created_at: true,
        selected_background: {
          select: {
            id: true,
            title: true,
            img: true,
            cost: true,
          },
        },
        active_room_color: true,
        active_username_color: true,
        favorite_character: {
          select: {
            id: true,
            name: true,
            miniature_img: true,
          },
        },
        selected_unique_role_adjective: true,
        selected_unique_role_noun: true,
        user: {
          select: {
            username: true,
            dangos: true,
            level: true,
            exp: true,
            profile_img: true,
            clips: true,
            games_ordered: true,
            past_usernames: {
              select: {
                id: true,
                username: true,
                created_at: true,
              },
              orderBy: {
                created_at: 'desc',
              },
            },
          },
        },
      },
    });

    const panopticons = await this.prisma.client.panopticonsOnRooms.findMany({
      where: {
        roomId: room.id,
      },
    });
    if (!room) {
      throw new BadRequestException('Room not found');
    }

    const editor = await this.prisma.client.editor.findUnique({
      where: {
        roomId: room.id,
      },
      select: {
        notepad_text: true,
        widgets: true,
        badges: {
          select: {
            id: true,
            badge: true,
            width: true,
            height: true,
            translateX: true,
            translateY: true,
            zIndex: true,
          },
        },
      },
    });

    if (!editor) {
      throw new BadRequestException('Editor not found');
    }

    const widgetsInfo = {
      stats: {
        panopticons_count: panopticons.length,
        clips: room.user.clips,
        games_ordered: room.user.games_ordered,
      },
      favorite_character: room.favorite_character,
      unique_role: {
        selected_unique_role_adjective: room.selected_unique_role_adjective,
        selected_unique_role_noun: room.selected_unique_role_noun,
      },
    };

    return {
      room,
      editor,
      roomAppearance: {
        active_room_color: room.active_room_color,
        active_username_color: room.active_username_color,
        selected_background: room.selected_background,
      },
      widgetsInfo,
    };
  }
}
