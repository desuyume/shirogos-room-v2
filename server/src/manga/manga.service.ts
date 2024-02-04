import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateMangaDto } from './dto/create-manga.dto';
import { removeFile } from 'src/utils/removeFile';
import { CreateMangaChapterDto } from './dto/create-manga-chapter.dto';
import { UpdateMangaDto } from './dto/update-manga.dto';

@Injectable()
export class MangaService {
  constructor(private prisma: PrismaService) {}

  async create(
    dto: CreateMangaDto,
    coverImg: Express.Multer.File | null,
    pageImgs: Express.Multer.File[],
  ) {
    if (!coverImg) {
      this.removeMangaFiles(coverImg, pageImgs);
      throw new BadRequestException('coverImg is required');
    }

    let manga = await this.prisma.manga.findUnique({
      where: {
        id: dto.id,
      },
    });

    let mangaChapter;

    if (!!manga) {
      mangaChapter = await this.prisma.mangaChapter.findFirst({
        where: {
          mangaId: manga.id,
          chapter: +dto.chapter,
        },
      });

      if (!!mangaChapter) {
        this.removeMangaFiles(coverImg, pageImgs);
        throw new BadRequestException('chapter already exists');
      } else {
        this.removeMangaFiles(coverImg, null);
      }
    }

    if (!manga) {
      manga = await this.prisma.manga.create({
        data: {
          id: dto.id,
          title: dto.title,
          cover_img: coverImg.filename,
          description: dto.description,
        },
      });
    }

    if (!mangaChapter) {
      mangaChapter = await this.prisma.mangaChapter.create({
        data: {
          mangaId: manga.id,
          chapter: +dto.chapter,
        },
      });
    }

    const pages = [];

    if (!!pageImgs) {
      for (let i = 0; i < pageImgs.length; i++) {
        const page = await this.prisma.mangaPage.create({
          data: {
            mangaChapterId: mangaChapter.id,
            page_number: i + 1,
            page_img: pageImgs[i].filename,
          },
        });

        pages.push(page);
      }
    }

    return {
      id: manga.id,
      title: manga.title,
      description: manga.description,
      cover_img: manga.cover_img,
      chapter: mangaChapter.chapter,
      pages,
    };
  }

  removeMangaFiles(
    coverImg: Express.Multer.File | null,
    pageImgs: Express.Multer.File[],
  ) {
    if (!!coverImg) {
      removeFile(coverImg.filename);
    }

    if (!!pageImgs && !!pageImgs.length) {
      for (let i = 0; i < pageImgs.length; i++) {
        removeFile(pageImgs[i].filename);
      }
    }
  }

  async getAll() {
    const result = [];
    const mangas = await this.prisma.manga.findMany({
      orderBy: {
        title: 'asc',
      },
    });

    for (const manga of mangas) {
      const lastChapter = await this.prisma.mangaChapter.findFirst({
        where: {
          mangaId: manga.id,
        },
        orderBy: {
          chapter: 'desc',
        },
      });
      result.push({
        id: manga.id,
        title: manga.title,
        description: manga.description,
        cover_img: manga.cover_img,
        lastChapter: lastChapter.chapter,
      });
    }

    return result;
  }

  async getOne(id: string, chapter: number) {
    const manga = await this.prisma.manga.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        title: true,
        _count: true
      }
    });

    if (!manga) {
      throw new BadRequestException('manga not found');
    }

    const mangaChapter = await this.prisma.mangaChapter.findFirst({
      where: {
        mangaId: manga.id,
        chapter,
      },
      select: {
        id: true,
        chapter: true,
        MangaPage: {
          select: {
            id: true,
            page_img: true,
            page_number: true
          }
        }
      }
    });

    if (!mangaChapter) {
      throw new BadRequestException('chapter not found');
    }

    const chaptersCount = await this.prisma.mangaChapter.count({
      where: {
        mangaId: manga.id,
      },
    });

    return {
      id: manga.id,
      title: manga.title,
      chaptersCount,
      chapter: mangaChapter.chapter,
      pages: mangaChapter.MangaPage
    }
  }

  async getAllWithChapters() {
    const mangaChapters = await this.prisma.mangaChapter.findMany({
      select: {
        id: true,
        chapter: true,
        Manga: {
          select: {
            id: true,
            title: true,
            description: true,
            cover_img: true,
          },
        },
        MangaPage: {
          select: {
            id: true,
            page_img: true,
            page_number: true,
          },
        },
      },
      orderBy: [
        {
          Manga: {
            title: 'asc',
          },
        },
        {
          chapter: 'asc',
        },
      ],
    });

    return mangaChapters.map((chapter) => {
      return {
        id: chapter.Manga.id,
        chapterId: chapter.id,
        title: chapter.Manga.title,
        description: chapter.Manga.description,
        cover_img: chapter.Manga.cover_img,
        chapter: chapter.chapter,
        pages: chapter.MangaPage,
      };
    });
  }

  async addChapter(
    id: string,
    dto: CreateMangaChapterDto,
    pageImgs: Express.Multer.File[] | null,
  ) {
    const manga = await this.prisma.manga.findUnique({
      where: {
        id,
      },
    });

    if (!manga) {
      this.removeMangaFiles(null, pageImgs);
      throw new BadRequestException('manga not found');
    }

    let mangaChapter = await this.prisma.mangaChapter.findFirst({
      where: {
        mangaId: manga.id,
        chapter: +dto.chapter,
      },
    });

    if (!!mangaChapter) {
      this.removeMangaFiles(null, pageImgs);
      throw new BadRequestException('chapter already exists');
    }

    mangaChapter = await this.prisma.mangaChapter.create({
      data: {
        mangaId: manga.id,
        chapter: +dto.chapter,
      },
    });

    const pages = [];

    if (!!pageImgs) {
      for (let i = 0; i < pageImgs.length; i++) {
        const page = await this.prisma.mangaPage.create({
          data: {
            mangaChapterId: mangaChapter.id,
            page_number: i + 1,
            page_img: pageImgs[i].filename,
          },
        });

        pages.push(page);
      }
    }

    return {
      id: manga.id,
      title: manga.title,
      description: manga.description,
      cover_img: manga.cover_img,
      chapter: mangaChapter.chapter,
      pages,
    };
  }

  async update(
    id: string,
    dto: UpdateMangaDto,
    coverImg: Express.Multer.File | null,
    pageImgs: Express.Multer.File[],
  ) {
    const manga = await this.prisma.manga.findUnique({
      where: {
        id,
      },
    });

    if (!manga) {
      this.removeMangaFiles(coverImg, pageImgs);
      throw new BadRequestException('manga not found');
    }

    const mangaChapter = await this.prisma.mangaChapter.findFirst({
      where: {
        mangaId: manga.id,
        chapter: +dto.chapter,
      },
    });

    if (!mangaChapter) {
      this.removeMangaFiles(coverImg, pageImgs);
      throw new BadRequestException('manga chapter not found');
    }

    if (!!coverImg) {
      removeFile(manga.cover_img);
    }

    await this.prisma.manga.update({
      where: {
        id,
      },
      data: {
        title: dto.title,
        description: dto.description,
        cover_img: !!coverImg ? coverImg.filename : manga.cover_img,
      },
    });

    await this.prisma.mangaChapter.update({
      where: {
        id: mangaChapter.id,
      },
      data: {
        id: mangaChapter.id,
        chapter: +dto.chapter,
      },
    });

    const pages = [];

    if (!!pageImgs) {
      for (let i = 0; i < pageImgs.length; i++) {
        let page = await this.prisma.mangaPage.findFirst({
          where: {
            mangaChapterId: mangaChapter.id,
            page_number: i + 1,
          },
        });

        if (!!page) {
          removeFile(page.page_img);
          page = await this.prisma.mangaPage.update({
            where: {
              id: page.id,
            },
            data: {
              page_img: pageImgs[i].filename,
              page_number: i + 1,
            },
          });
        } else {
          page = await this.prisma.mangaPage.create({
            data: {
              mangaChapterId: mangaChapter.id,
              page_number: i + 1,
              page_img: pageImgs[i].filename,
            },
          });
        }

        pages.push(page);
      }
    }

    return {
      id: manga.id,
      title: manga.title,
      description: manga.description,
      cover_img: manga.cover_img,
      chapter: mangaChapter.chapter,
      pages,
    };
  }

  async delete(id: number) {
    const mangaChapter = await this.prisma.mangaChapter.findUnique({
      where: {
        id,
      },
    });

    if (!mangaChapter) {
      throw new BadRequestException('manga chapter not found');
    }

    const mangaPages = await this.prisma.mangaPage.findMany({
      where: {
        mangaChapterId: mangaChapter.id,
      },
    });

    for (const page of mangaPages) {
      removeFile(page.page_img);
      await this.prisma.mangaPage.delete({
        where: {
          id: page.id,
        },
      });
    }

    const manga = await this.prisma.manga.findUnique({
      where: {
        id: mangaChapter.mangaId,
      },
      include: {
        MangaChapter: true,
      },
    });

    await this.prisma.mangaChapter.delete({
      where: {
        id: mangaChapter.id,
      },
    });

    if (manga.MangaChapter.length === 1) {
      removeFile(manga.cover_img);
      await this.prisma.manga.delete({
        where: {
          id: manga.id,
        },
      });
    }

    return { id };
  }
}
