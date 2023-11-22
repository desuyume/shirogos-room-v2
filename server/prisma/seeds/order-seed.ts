import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const OrderSeed = async () => {
	await prisma.orderPrice.deleteMany();
	await prisma.orderType.deleteMany();

  const gameOrderType = await prisma.orderType.upsert({
		where: {
			id: 1,
			type: 'game'
		},
		create: {
			id: 1,
			type: 'game',
			orderRules: 'Правлиа заказа игр ;L'
		},
		update: {
			id: 1,
			type: 'game',
			orderRules: 'Правлиа заказа игр ;L'
		}
  });

  const viewingOrderType = await prisma.orderType.upsert({
		where: {
			id: 2,
			type: 'viewing'
		},
		create: {
			id: 2,
			type: 'viewing',
			orderRules: 'Правлиа заказа просмотра ;0'
		},
		update: {
			id: 2,
			type: 'viewing',
			orderRules: 'Правлиа заказа просмотра ;0'
		}
  });

	await prisma.orderPrice.upsert({
		where:{
			id: 1,
		},
		create: {
			id: 1,
			cost: 100,
			text: '1 час',
			orderTypeId: gameOrderType.id,
		},
		update: {
			id: 1,
			cost: 100,
			text: '1 час',
			orderTypeId: gameOrderType.id,
		}
	});

	await prisma.orderPrice.upsert({
		where:{
			id: 2,
		},
		create: {
			id: 2,
			cost: 200,
			text: '2 часа',
			orderTypeId: gameOrderType.id,
		},
		update: {
			id: 2,
			cost: 200,
			text: '2 часа',
			orderTypeId: gameOrderType.id,
		}
	});

	await prisma.orderPrice.upsert({
		where:{
			id: 3,
		},
		create: {
			id: 3,
			cost: 300,
			text: '3 часа',
			orderTypeId: gameOrderType.id,
		},
		update: {
			id: 3,
			cost: 300,
			text: '3 часа',
			orderTypeId: gameOrderType.id,
		}
	});

	await prisma.orderPrice.upsert({
		where:{
			id: 4,
		},
		create: {
			id: 4,
			cost: 100,
			text: 'Видео X',
			orderTypeId: viewingOrderType.id,
		},
		update: {
			id: 4,
			cost: 100,
			text: 'Видео X',
			orderTypeId: viewingOrderType.id,
		}
	});

	await prisma.orderPrice.upsert({
		where:{
			id: 5,
		},
		create: {
			id: 5,
			cost: 200,
			text: 'Видео Y',
			orderTypeId: viewingOrderType.id,
		},
		update: {
			id: 5,
			cost: 200,
			text: 'Видео Y',
			orderTypeId: viewingOrderType.id,
		}
	});

	await prisma.orderPrice.upsert({
		where:{
			id: 6,
		},
		create: {
			id: 6,
			cost: 300,
			text: 'Фильм-лот',
			orderTypeId: viewingOrderType.id,
		},
		update: {
			id: 6,
			cost: 300,
			text: 'Фильм-лот',
			orderTypeId: viewingOrderType.id,
		}
	});
};
