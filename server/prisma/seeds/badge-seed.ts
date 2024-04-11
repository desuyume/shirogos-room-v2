import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const BadgeSeed = async () => {
  await prisma.badgeType.upsert({
    where: {
      id: 1,
    },
    create: {
      id: 1,
      type: 'unique',
      title: 'Уникальный',
    },
    update: {
      id: 1,
      type: 'unique',
      title: 'Уникальный',
    },
  });

  await prisma.badgeType.upsert({
    where: {
      id: 2,
    },
    create: {
      id: 2,
      type: 'copyright',
      title: 'Копирайтный',
    },
    update: {
      id: 2,
      type: 'copyright',
      title: 'Копирайтный',
    },
  });

  await prisma.badgeType.upsert({
    where: {
      id: 3,
    },
    create: {
      id: 3,
      type: 'common',
      title: 'Обычный',
    },
    update: {
      id: 3,
      type: 'common',
      title: 'Обычный',
    },
  });
};
