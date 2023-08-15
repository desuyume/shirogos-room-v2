import { PrismaClient, UniqueRoleType } from '@prisma/client';

const prisma = new PrismaClient();

class UniqueRoleService {
	async getAll(type) {
		const roles = await prisma.uniqueRole.findMany({
			where: {
				type: type.toUpperCase()
			}
		});
		return roles;
	}

	async add(title: string, type) {
		const role = await prisma.uniqueRole.create({
			data: {
				title,
				type:
					type === 'adjectives'
						? UniqueRoleType.ADJECTIVES
						: UniqueRoleType.NOUNS
			}
		});
		return role;
	}

	async delete(id: number) {
		const role = await prisma.uniqueRole.delete({
			where: {
				id
			}
		});
		return role;
	}
}

export default new UniqueRoleService();
