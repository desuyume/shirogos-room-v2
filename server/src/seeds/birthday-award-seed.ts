import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const BirthdayAwardSeed = async () => {
	const award = await prisma.birthdayAward.findUnique({
		where: {
			id: 1
		}
	})

	if (!award) {
		await prisma.birthdayAward.create({
			data: {
				id: 1,
				award: 20
			}
		})
	}
}