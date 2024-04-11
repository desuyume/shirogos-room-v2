import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { ChangeRoomColorDto } from './dto/change-room-color.dto';
import { ChangeUniqueRoleDto } from './dto/change-uniqueRole.dto';
import { BuyUniqueRoleDto } from './dto/buy-uniqueRole.dto';
import { ChooseFavoriteCharacterDto } from './dto/choose-favorite-character.dto';
import { ChooseActiveRoomBackgroundDto } from './dto/choose-active-room-background.dto';
import { ChangeRoomNameDto } from './dto/change-roomName.dto';
import { BuyColorDto } from './dto/buy-color.dto';
import { UniqueRoleType } from '@prisma/client';
import { getRandomInt } from 'src/utils/getRandomInt';
import { MakeOrderDto } from './dto/make-order.dto';
import { BuyPanopticonDto } from './dto/buy-panopticon.dto';
import { UpdateRoomEditorDto } from './dto/update-room-editor';

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
        id: true,
        name: true,
      },
    });

    await this.prisma.editor.create({
      data: {
        roomId: updatedRoom.id,
      },
    });

    await this.setRoomRandomUniqueRoles(updatedRoom.id);

    return {
      username: updatedUser.username,
      roomName: updatedRoom.name,
    };
  }

  async setRoomRandomUniqueRoles(roomId: number) {
    const adjectives = await this.prisma.uniqueRole.findMany({
      where: {
        type: UniqueRoleType.ADJECTIVES,
      },
    });
    const nouns = await this.prisma.uniqueRole.findMany({
      where: {
        type: UniqueRoleType.NOUNS,
      },
    });

    const randomAdjectiveNum = getRandomInt(0, adjectives.length - 1);
    const randomNounNum = getRandomInt(0, nouns.length - 1);

    return await this.prisma.room.update({
      where: {
        id: roomId,
      },
      data: {
        random_unique_role_adjective: !!adjectives.length
          ? adjectives[randomAdjectiveNum].title
          : null,
        random_unique_role_noun: !!nouns.length
          ? nouns[randomNounNum].title
          : null,
      },
    });
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

  async getRoomAppearance(userId: number) {
    return await this.prisma.room.findUnique({
      where: {
        userId,
      },
      select: {
        active_room_color: true,
        active_username_color: true,
        selected_background: true,
      },
    });
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

  async buyColor(userId: number, type: string, dto: BuyColorDto) {
    const room = await this.prisma.room.findUnique({
      where: {
        userId,
      },
      select: {
        room_colors: true,
        username_colors: true,
      },
    });
    let color;

    switch (type) {
      case 'room':
        color = await this.prisma.roomColor.findUnique({
          where: {
            id: dto.roomColorId,
          },
        });

        if (room.room_colors.includes(color.name)) {
          throw new BadRequestException('room color already exists');
        }

        break;

      case 'username':
        color = await this.prisma.usernameColor.findUnique({
          where: {
            id: dto.roomColorId,
          },
        });

        if (room.username_colors.includes(color.name)) {
          throw new BadRequestException('room color already exists');
        }

        break;

      default:
        throw new BadRequestException('invalid type');
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        dangos: true,
      },
    });

    if (user.dangos < dto.cost) {
      throw new BadRequestException('not enough dangos');
    }

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        dangos: {
          decrement: dto.cost,
        },
      },
    });

    let updatedRoom;
    switch (type) {
      case 'room':
        updatedRoom = await this.prisma.room.update({
          where: {
            userId,
          },
          data: {
            room_colors: {
              push: color.name,
            },
          },
        });
        break;

      case 'username':
        updatedRoom = await this.prisma.room.update({
          where: {
            userId,
          },
          data: {
            username_colors: {
              push: color.name,
            },
          },
        });
        break;

      default:
        throw new BadRequestException('invalid type');
    }

    return updatedRoom;
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

  async getBoutiqueUniqueRoles(userId: number) {
    const userRandomRoles = await this.prisma.room.findUnique({
      where: {
        userId,
      },
      select: {
        random_unique_role_adjective: true,
        random_unique_role_noun: true,
        unique_roles: {
          select: {
            UniqueRole: true,
          },
        },
      },
    });

    let adjective;
    let noun;
    let isAdjectiveBuyed = false;
    let isNounBuyed = false;

    if (!userRandomRoles.random_unique_role_adjective) {
      adjective = null;
    } else {
      adjective = await this.prisma.uniqueRole.findUnique({
        where: {
          title: userRandomRoles.random_unique_role_adjective,
        },
      });
      isAdjectiveBuyed = userRandomRoles.unique_roles.some(
        (obj) => obj.UniqueRole.title === adjective.title,
      );
    }

    if (!userRandomRoles.random_unique_role_noun) {
      noun = null;
    } else {
      noun = await this.prisma.uniqueRole.findUnique({
        where: {
          title: userRandomRoles.random_unique_role_noun,
        },
      });
      isNounBuyed = userRandomRoles.unique_roles.some(
        (obj) => obj.UniqueRole.title === noun.title,
      );
    }

    return {
      adjectiveRole: adjective,
      nounRole: noun,
      isAdjectiveBuyed,
      isNounBuyed,
    };
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

    if (!uniqueRole) {
      throw new BadRequestException('unique role not found');
    }

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
      favoriteCharacter: userFavoriteCharacter?.favorite_character,
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
        characterId: dto.characterId,
      },
      select: {
        favorite_character: true,
      },
    });
  }

  async getFavoriteCharacter(userId: number) {
    const favoriteCharacter = await this.prisma.room.findUnique({
      where: {
        userId,
      },
      select: {
        favorite_character: {
          select: {
            id: true,
            name: true,
            miniature_img: true,
          },
        },
      },
    });

    return !!favoriteCharacter ? favoriteCharacter.favorite_character : null;
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
            Background: true,
          },
        },
        selected_background: true,
      },
    });
  }

  async chooseActiveRoomBackground(
    userId: number,
    dto: ChooseActiveRoomBackgroundDto,
  ) {
    return await this.prisma.room.update({
      where: {
        userId,
      },
      data: {
        backgroundId: dto.backgroundId,
      },
      select: {
        selected_background: true,
      },
    });
  }

  async changeRoomName(userId: number, dto: ChangeRoomNameDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        dangos: true,
      },
    });
    const room = await this.prisma.room.findUnique({
      where: {
        userId,
      },
      select: {
        name: true,
      },
    });

    if (user.dangos < 10) {
      throw new BadRequestException('not enough dangos');
    }

    if (room.name === dto.roomName) {
      throw new BadRequestException('room name equals to current room name');
    }

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        dangos: {
          decrement: 10,
        },
      },
    });

    return await this.prisma.room.update({
      where: {
        userId,
      },
      data: {
        name: dto.roomName,
      },
      select: {
        name: true,
      },
    });
  }

  async makeOrder(userId: number, dto: MakeOrderDto, type: string) {
    const isVideo = dto.orderPriceId === 4 || dto.orderPriceId === 5;

    if (!isVideo && dto.orderText.length > 34) {
      throw new BadRequestException(
        'orderText must be shorter than or equal to 34 characters',
      );
    }

    const orderType = await this.prisma.orderType.findUnique({
      where: {
        type,
      },
    });

    if (!orderType) {
      throw new BadRequestException('order type not found');
    }

    const orderPrice = await this.prisma.orderPrice.findUnique({
      where: {
        id: dto.orderPriceId,
      },
    });

    if (!orderPrice) {
      throw new BadRequestException('order price not found');
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        dangos: true,
      },
    });

    if (user.dangos < orderPrice.cost) {
      throw new BadRequestException('not enough dangos');
    }

    switch (type) {
      case 'game':
        await this.prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            dangos: {
              decrement: orderPrice.cost,
            },
            games_ordered: {
              increment: 1,
            },
          },
        });
        break;

      case 'viewing':
        await this.prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            dangos: {
              decrement: orderPrice.cost,
            },
            viewing_ordered: {
              increment: 1,
            },
          },
        });
        break;

      default:
        throw new BadRequestException('order type not found');
    }

    return await this.prisma.order.create({
      data: {
        userId,
        orderTypeId: orderType.id,
        orderPriceId: dto.orderPriceId,
        orderText: dto.orderText,
      },
    });
  }

  async getRoomPanopticons(userId: number) {
    const panopticons = await this.prisma.panopticon.findMany({
      where: {
        isForSale: true,
      },
    });
    const buyedPanopticons = await this.prisma.room.findUnique({
      where: {
        userId,
      },
      select: {
        buyed_panopticons: {
          select: {
            Panopticon: true,
            buyed_at: true,
            buyed_cost: true,
          },
        },
      },
    });

    return {
      panopticons,
      buyedPanopticons: buyedPanopticons?.buyed_panopticons,
    };
  }

  async buyPanopticon(userId: number, dto: BuyPanopticonDto) {
    const panopticon = await this.prisma.panopticon.findUnique({
      where: {
        id: dto.panopticonId,
      },
    });

    if (!panopticon) {
      throw new BadRequestException('panopticon not found');
    }

    if (!panopticon.isForSale) {
      throw new BadRequestException('this panopticon is not for sale');
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        dangos: true,
      },
    });

    if (user.dangos < panopticon.cost) {
      throw new BadRequestException('not enough dangos');
    }

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        dangos: {
          decrement: panopticon.cost,
        },
        panopticons: {
          increment: 1,
        },
      },
    });

    const room = await this.prisma.room.findUnique({
      where: {
        userId,
      },
      select: {
        id: true,
      },
    });

    return await this.prisma.panopticonsOnRooms.create({
      data: {
        buyed_cost: panopticon.cost,
        panopticonId: dto.panopticonId,
        roomId: room.id,
      },
      select: {
        Panopticon: true,
        buyed_at: true,
        buyed_cost: true,
      },
    });
  }

  async getRoomPanopticon(userId: number, panopticonId: number) {
    const room = await this.prisma.room.findUnique({
      where: {
        userId,
      },
      select: {
        id: true,
        buyed_panopticons: {
          select: {
            Panopticon: true,
            buyed_at: true,
            buyed_cost: true,
          },
        },
      },
    });

    const isBuyed = room.buyed_panopticons.some((panopticon) => {
      if (panopticon.Panopticon.id === panopticonId) {
        return panopticon;
      }
    });

    if (!isBuyed) {
      throw new BadRequestException('panopticon is not buyed');
    }

    return room.buyed_panopticons;
  }

  async getBuyedBadges(userId: number) {
    const badges = await this.prisma.room.findUnique({
      where: {
        userId,
      },
      select: {
        buyed_badges: {
          select: {
            Badge: {
              select: {
                isForSale: true,
                badgeImg: true,
                type: true,
                typeId: true,
                title: true,
                cost: true,
                id: true,
              },
            },
          },
        },
      },
    });

    return badges.buyed_badges.map((badge) => badge.Badge);
  }

  async getBoutiqueBadges(userId: number) {
    const badges = await this.prisma.badge.findMany({
      where: {
        isForSale: true,
      },
      select: {
        badgeImg: true,
        type: true,
        typeId: true,
        title: true,
        cost: true,
        id: true,
      },
    });
    const buyedBadges = await this.prisma.room.findUnique({
      where: {
        userId,
      },
      select: {
        buyed_badges: {
          select: {
            Badge: {
              select: {
                isForSale: true,
                badgeImg: true,
                type: true,
                typeId: true,
                title: true,
                cost: true,
                id: true,
              },
            },
          },
        },
      },
    });

    const filteredBuyedBadges = buyedBadges?.buyed_badges
      .filter((buyedBadge) => {
        return badges.find((badge) => {
          return badge.id === buyedBadge.Badge.id;
        });
      })
      .map((buyedBadge) => {
        return buyedBadge.Badge;
      });

    return {
      badges,
      buyedBadges: filteredBuyedBadges,
    };
  }

  async buyBoutiqueBadge(userId: number, badgeId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        dangos: true,
      },
    });
    const badge = await this.prisma.badge.findUnique({
      where: {
        id: badgeId,
      },
      select: {
        cost: true,
      },
    });

    if (!badge) {
      throw new BadRequestException('badge not found');
    }

    if (user.dangos < badge.cost) {
      throw new BadRequestException('not enough dangos');
    }

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        dangos: {
          decrement: badge.cost,
        },
      },
    });

    const room = await this.prisma.room.findUnique({
      where: {
        userId,
      },
      select: {
        id: true,
      },
    });

    return await this.prisma.badgesOnRooms.create({
      data: {
        badgeId: badgeId,
        roomId: room.id,
      },
    });
  }

  async getBoutiqueBackgrounds(userId: number) {
    const backgrounds = await this.prisma.background.findMany({
      where: {
        isForSale: true,
      },
    });
    const buyedBackgrounds = await this.prisma.room.findUnique({
      where: {
        userId,
      },
      select: {
        buyed_backgrounds: {
          where: {
            Background: {
              isForSale: true,
            },
          },
          select: {
            Background: true,
          },
        },
      },
    });

    return {
      backgrounds,
      buyedBackgrounds: buyedBackgrounds?.buyed_backgrounds.map(
        (bg) => bg.Background,
      ),
    };
  }

  async buyBoutiqueBackground(userId: number, bgId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        dangos: true,
      },
    });
    const bg = await this.prisma.background.findUnique({
      where: {
        id: bgId,
      },
      select: {
        cost: true,
      },
    });

    if (!bg) {
      throw new BadRequestException('background not found');
    }

    if (user.dangos < bg.cost) {
      throw new BadRequestException('not enough dangos');
    }

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        dangos: {
          decrement: bg.cost,
        },
      },
    });

    const room = await this.prisma.room.findUnique({
      where: {
        userId,
      },
      select: {
        id: true,
      },
    });

    return await this.prisma.backroundsOnRooms.create({
      data: {
        backgroundId: bgId,
        roomId: room.id,
      },
    });
  }

  async getRoomStats(userId: number) {
    const room = await this.prisma.room.findUnique({
      where: {
        userId,
      },
      select: {
        id: true,
      },
    });
    const panopticons = await this.prisma.panopticonsOnRooms.findMany({
      where: {
        roomId: room.id,
      },
    });
    const userStats = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        clips: true,
        games_ordered: true,
      },
    });
    return {
      panopticons_count: panopticons.length,
      ...userStats,
    };
  }

  async getRoomEditor(userId: number) {
    const room = await this.prisma.room.findUnique({
      where: {
        userId,
      },
      select: {
        id: true,
      },
    });
    return await this.prisma.editor.findUnique({
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
  }

  async updateRoomEditor(userId: number, dto: UpdateRoomEditorDto) {
    const room = await this.prisma.room.findUnique({
      where: {
        userId,
      },
      select: {
        id: true,
      },
    });

    const editor = await this.prisma.editor.upsert({
      where: {
        roomId: room.id,
      },
      create: {
        roomId: room.id,
        notepad_text: dto.notepad_text,
      },
      update: {
        notepad_text: dto.notepad_text,
      },
    });

    const widgets = dto.widgets;
    const badges = dto.badges;

    await this.prisma.editorWidget.deleteMany({
      where: {
        editorId: editor.id,
      },
    });
    await this.prisma.editorBadge.deleteMany({
      where: {
        editorId: editor.id,
      },
    });

    for (const widget of widgets) {
      await this.prisma.editorWidget.create({
        data: {
          editorId: editor.id,
          widgetType: widget.widgetType,
          translateX: widget.translateX,
          translateY: widget.translateY,
          zIndex: widget.zIndex,
        },
      });
    }
    for (const badge of badges) {
      await this.prisma.editorBadge.create({
        data: {
          editorId: editor.id,
          badgeId: badge.badgeId,
          width: badge.width,
          height: badge.height,
          translateX: badge.translateX,
          translateY: badge.translateY,
          zIndex: badge.zIndex,
        },
      });
    }

    return editor;
  }
}
