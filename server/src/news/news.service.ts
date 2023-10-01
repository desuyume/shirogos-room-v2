import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service'
import { CreateNewsDto } from './dto/create-news.dto'

@Injectable()
export class NewsService {
	constructor(private prisma: PrismaService) {}

	async getOne(skip: number) {
		const news = await this.prisma.news.findFirst({
			orderBy: {
				created_at: 'desc'
			},
			skip: skip
		})

		if (!news) {
			return;
		}

		return news;
	}

	async getNewsCount() {
		const count = await this.prisma.news.count();
		return { count };
	}

	async create(dto: CreateNewsDto, img: Express.Multer.File) {
		if (!img) {
			throw new BadRequestException('img is required');
		}

		return await this.prisma.news.create({
			data: {
				text: dto.text,
				news_img: img.filename,
				created_at: dto.created_at
			}
		})
	}
}
