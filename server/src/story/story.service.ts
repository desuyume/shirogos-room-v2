import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  CreateStoryDto,
  IStoryPage,
  UpdateStoryDto,
} from './dto/create-update-story.dto';
import { removeFile } from 'src/utils/removeFile';

@Injectable()
export class StoryService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateStoryDto, coverImg: Express.Multer.File) {
    let story = await this.prisma.story.findUnique({
      where: {
        id: dto.id,
      },
    });

    if (!!story) {
      removeFile(coverImg.filename);
      throw new BadRequestException('story already exists');
    }

    story = await this.prisma.story.create({
      data: {
        id: dto.id,
        title: dto.title,
        description: dto.description,
        cover_img: coverImg.filename,
      },
      include: {
        StoryPage: true,
      },
    });

    const pages = JSON.parse(dto.pages) as IStoryPage[];

    for (const page of pages) {
      await this.prisma.storyPage.create({
        data: {
          text: page.text,
          page_num: page.page_num,
          storyId: story.id,
        },
      });
    }

    return story;
  }

  async getAll() {
    const stories = await this.prisma.story.findMany({
      include: {
        StoryPage: true,
      },
      orderBy: {
        title: 'asc',
      },
    });

    return stories.map((story) => {
      return {
        id: story.id,
        title: story.title,
        description: story.description,
        cover_img: story.cover_img,
        pages: story.StoryPage,
      };
    });
  }

  async getAllGeneral() {
    return await this.prisma.story.findMany({
      orderBy: {
        title: 'asc',
      },
    });
  }

  async getOne(id: string) {
    const story = await this.prisma.story.findUnique({
      where: {
        id,
      },
      include: {
        StoryPage: true,
      },
    });

    return {
      id: story.id,
      title: story.title,
      description: story.description,
      cover_img: story.cover_img,
      pages: story.StoryPage,
    }
  }

  async update(
    id: string,
    dto: UpdateStoryDto,
    coverImg: Express.Multer.File | null,
  ) {
    let story = await this.prisma.story.findUnique({
      where: {
        id,
      },
    });

    if (!story) {
      throw new BadRequestException('story not found');
    }

    if (!!coverImg) {
      removeFile(story.cover_img);
      story = await this.prisma.story.update({
        where: {
          id,
        },
        data: {
          id: dto.id,
          title: dto.title,
          description: dto.description,
          cover_img: coverImg.filename,
        },
        include: {
          StoryPage: true,
        },
      });
    } else {
      story = await this.prisma.story.update({
        where: {
          id,
        },
        data: {
          id: dto.id,
          title: dto.title,
          description: dto.description,
        },
        include: {
          StoryPage: true,
        },
      });
    }

    const pages = JSON.parse(dto.pages) as IStoryPage[];

    await this.prisma.storyPage.deleteMany({
      where: {
        storyId: story.id,
      },
    });

    for (const page of pages) {
      await this.prisma.storyPage.create({
        data: {
          text: page.text,
          page_num: page.page_num,
          storyId: story.id,
        },
      });
    }

    return story;
  }

  async remove(id: string) {
    const story = await this.prisma.story.findUnique({
      where: {
        id,
      },
      include: {
        StoryPage: true,
      },
    });

    if (!story) {
      throw new BadRequestException('story not found');
    }

    await this.prisma.storyPage.deleteMany({
      where: {
        storyId: id,
      },
    });

    removeFile(story.cover_img);

    await this.prisma.story.delete({
      where: {
        id,
      },
    });

    return story;
  }
}
