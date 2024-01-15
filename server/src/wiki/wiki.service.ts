import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  CreateCharacterDto,
  ICharacteristic,
  IDescription,
  UpdateCharacterDto,
} from './dto/create-update-character.dto';
import { removeFile } from 'src/utils/removeFile';
import { CreateCharacterCategoryDto } from './dto/create-character-category.dto';

@Injectable()
export class WikiService {
  constructor(private prisma: PrismaService) {}

  async createCharacter(
    dto: CreateCharacterDto,
    originalImg: Express.Multer.File | null,
    miniatureImg: Express.Multer.File | null,
  ) {
    const createdCharacter = await this.prisma.character.findUnique({
      where: {
        id: dto.id,
      },
    });

    if (!!createdCharacter) {
      throw new BadRequestException('Character already exists');
    }

    const descriptions = JSON.parse(
      dto.characterDescriptions,
    ) as IDescription[];
    const characteristics = JSON.parse(
      dto.characterCharacteristics,
    ) as ICharacteristic[];

    let category;

    if (!!dto.categoryId) {
      category = await this.prisma.characterCategory.findUnique({
        where: {
          id: +dto.categoryId,
        },
      });

      if (!category) {
        throw new BadRequestException('Category not found');
      }
    }

    const character = await this.prisma.character.create({
      data: {
        id: dto.id,
        name: dto.name,
        subTitle: !!dto.subTitle ? dto.subTitle : null,
        subSubTitle: !!dto.subSubTitle ? dto.subSubTitle : null,
        characterCategoryId: !!category ? category.id : null,
        original_img: !!originalImg ? originalImg.filename : null,
        miniature_img: !!miniatureImg ? miniatureImg.filename : null,
      },
    });

    for (const desc of descriptions) {
      await this.prisma.characterDescription.create({
        data: {
          title: desc.title,
          description: desc.description,
          characterId: character.id,
        },
      });
    }

    for (const characteristic of characteristics) {
      await this.prisma.characterCharacteristic.create({
        data: {
          title: characteristic.title,
          characteristic: characteristic.characteristic,
          characterId: character.id,
        },
      });
    }

    return character;
  }

  async getAllCharacters() {
    const characters = await this.prisma.character.findMany({
      select: {
        id: true,
        name: true,
        category: true,
        original_img: true,
        miniature_img: true,
      },
      orderBy: {
        id: 'asc',
      },
    });

    return characters;
  }

  async getCharacter(id: string) {
    const character = await this.prisma.character.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        subTitle: true,
        subSubTitle: true,
        category: true,
        original_img: true,
        miniature_img: true,
        characterCharacteristics: true,
        characterDescriptions: true,
      },
    });

    if (!character) {
      throw new BadRequestException('Character not found');
    }

    return character;
  }

  async updateCharacter(
    id: string,
    dto: UpdateCharacterDto,
    originalImg: Express.Multer.File | null,
    miniatureImg: Express.Multer.File | null,
  ) {
    const character = await this.prisma.character.findUnique({
      where: {
        id,
      },
    });

    if (!character) {
      throw new BadRequestException('Character not found');
    }

    const descriptions = JSON.parse(
      dto.characterDescriptions,
    ) as IDescription[];
    const characteristics = JSON.parse(
      dto.characterCharacteristics,
    ) as ICharacteristic[];

    if (!!originalImg) {
      if (!!character.original_img) {
        removeFile(character.original_img);
      }

      await this.prisma.character.update({
        where: {
          id,
        },
        data: {
          original_img: originalImg.filename,
        },
      });
    }

    if (!!miniatureImg) {
      if (!!character.miniature_img) {
        removeFile(character.miniature_img);
      }

      await this.prisma.character.update({
        where: {
          id,
        },
        data: {
          miniature_img: miniatureImg.filename,
        },
      });
    }

    if (!!originalImg && !miniatureImg && !!character.miniature_img) {
      removeFile(character.miniature_img);
      await this.prisma.character.update({
        where: {
          id,
        },
        data: {
          miniature_img: null,
        },
      });
    }

    await this.prisma.characterCharacteristic.deleteMany({
      where: {
        characterId: id,
      },
    });

    await this.prisma.characterDescription.deleteMany({
      where: {
        characterId: id,
      },
    });

    for (const desc of descriptions) {
      await this.prisma.characterDescription.create({
        data: {
          title: desc.title,
          description: desc.description,
          characterId: character.id,
        },
      });
    }

    for (const characteristic of characteristics) {
      await this.prisma.characterCharacteristic.create({
        data: {
          title: characteristic.title,
          characteristic: characteristic.characteristic,
          characterId: character.id,
        },
      });
    }

    let category;

    if (!!dto.categoryId) {
      category = await this.prisma.characterCategory.findUnique({
        where: {
          id: +dto.categoryId,
        },
      });
    }

    return await this.prisma.character.update({
      where: {
        id,
      },
      data: {
        id: dto.id,
        name: dto.name,
        subTitle: !!dto.subTitle ? dto.subTitle : null,
        subSubTitle: !!dto.subSubTitle ? dto.subSubTitle : null,
        characterCategoryId: !!category ? category.id : null,
      },
    });
  }

  async deleteCharacter(id: string) {
    const character = await this.prisma.character.findUnique({
      where: {
        id,
      },
    });

    if (!character) {
      throw new BadRequestException('Character not found');
    }

    if (!!character.original_img) {
      removeFile(character.original_img);
    }

    if (!!character.miniature_img) {
      removeFile(character.miniature_img);
    }

    await this.prisma.characterDescription.deleteMany({
      where: {
        characterId: id,
      },
    });

    await this.prisma.characterCharacteristic.deleteMany({
      where: {
        characterId: id,
      },
    });

    return await this.prisma.character.delete({
      where: {
        id,
      },
    });
  }

  async getCharacterCategories() {
    return await this.prisma.characterCategory.findMany({
      orderBy: {
        title: 'asc',
      },
    });
  }

  async createCharacterCategory(dto: CreateCharacterCategoryDto) {
    const category = await this.prisma.characterCategory.findUnique({
      where: {
        title: dto.title,
      },
    });

    if (!!category) {
      throw new BadRequestException('Category already exists');
    }

    return await this.prisma.characterCategory.create({
      data: {
        title: dto.title,
      },
    });
  }

  async deleteCharacterCategory(id: number) {
    const category = await this.prisma.characterCategory.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      throw new BadRequestException('Category not found');
    }

    await this.prisma.character.updateMany({
      where: {
        characterCategoryId: id,
      },
      data: {
        characterCategoryId: null,
      },
    });

    return await this.prisma.characterCategory.delete({
      where: {
        id,
      },
    });
  }
}
