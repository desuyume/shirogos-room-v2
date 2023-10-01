import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service'
import { UpdateBirthdayAwardDto } from './dto/update-birthday-award'

@Injectable()
export class BirthdayAwardService {
	constructor(private prisma: PrismaService) {}

	async getOne() {
		return await this.prisma.birthdayAward.findUnique({
			where: {
				id: 1
			}
		})
	}

	async updateAward(dto: UpdateBirthdayAwardDto) {
		return await this.prisma.birthdayAward.upsert({
			where: {
				id: 1
			},
			update: {
				id: 1,
				award: dto.award
			},
			create: {
				id: 1,
				award: dto.award
			}
		})
	}
}
