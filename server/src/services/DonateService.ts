import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class DonateService {
	async getAll() {
		const donates = await prisma.donate.findMany({
			orderBy: [
				{
					username: 'asc'
				}
			]
		});
		return donates;
	}

	async addDonate(username: string, amount: number, gifts: string) {
		const donate = await prisma.donate.create({
			data: {
				username,
				amount,
				gifts
			}
		});
		return donate;
	}

	async updateAmount(id: number, addAmount: number) {
		const updatedDonate = await prisma.donate.update({
			where: {
				id
			},
			data: {
				amount: {
					increment: addAmount
				}
			}
		});
		return updatedDonate;
	}

	async updateGifts(id: number, gifts: string) {
		const updatedDonate = await prisma.donate.update({
			where: {
				id
			},
			data: {
				gifts
			}
		});
		return updatedDonate;
	}

	async delete(id: number) {
		const deletedDonate = await prisma.donate.delete({
			where: {
				id
			}
		});
		return deletedDonate;
	}
}

export default new DonateService();
