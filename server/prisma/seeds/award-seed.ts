import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const AwardSeed = async () => {
  await prisma.awardType.upsert({
    where: {
      id: 1,
    },
    create: {
      id: 1,
      type: 'frame',
      title: 'Рамка',
    },
    update: {
      id: 1,
      type: 'frame',
      title: 'Рамка',
    },
  });

  await prisma.awardType.upsert({
    where: {
      id: 2,
    },
    create: {
      id: 2,
      type: 'unique-badge',
      title: 'Уникальный значок',
    },
    update: {
      id: 2,
      type: 'unique-badge',
      title: 'Уникальный значок',
    },
  });

  await prisma.awardType.upsert({
    where: {
      id: 3,
    },
    create: {
      id: 3,
      type: 'copyright-badge',
      title: 'Копирайтный значок',
    },
    update: {
      id: 3,
      type: 'copyright-badge',
      title: 'Копирайтный значок',
    },
  });

  await prisma.awardType.upsert({
    where: {
      id: 4,
    },
    create: {
      id: 4,
      type: 'common-badge',
      title: 'Обычный значок',
    },
    update: {
      id: 4,
      type: 'common-badge',
      title: 'Обычный значок',
    },
  });
};
