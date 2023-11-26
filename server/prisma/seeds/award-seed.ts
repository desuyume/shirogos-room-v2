import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const AwardSeed = async () => {
  await prisma.awardType.deleteMany()

  await prisma.awardType.upsert({
    where: {
      id: 1,
    },
    create: {
      id: 1,
      type: 'Рамка',
    },
    update: {
      id: 1,
      type: 'Рамка',
    },
  });

  await prisma.awardType.upsert({
    where: {
      id: 2,
    },
    create: {
      id: 2,
      type: 'Значок 1',
    },
    update: {
      id: 2,
      type: 'Значок 1',
    },
  });

  await prisma.awardType.upsert({
    where: {
      id: 3,
    },
    create: {
      id: 3,
      type: 'Значок 2',
    },
    update: {
      id: 3,
      type: 'Значок 2',
    },
  });

  await prisma.awardType.upsert({
    where: {
      id: 4,
    },
    create: {
      id: 4,
      type: 'Значок 3',
    },
    update: {
      id: 4,
      type: 'Значок 3',
    },
  });
};
