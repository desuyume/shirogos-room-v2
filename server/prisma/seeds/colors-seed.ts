import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const ColorsSeed = async () => {
  await prisma.roomColor.upsert({
    where: {
      id: 1,
    },
    create: {
      id: 1,
      name: 'pink',
      hex: '#C34375',
      cost: 100,
    },
    update: {
      id: 1,
      name: 'pink',
      hex: '#C34375',
      cost: 100,
    },
  });

  await prisma.usernameColor.upsert({
    where: {
      id: 1,
    },
    create: {
      id: 1,
      name: 'pink',
      hex: '#C34375',
      cost: 100,
    },
    update: {
      id: 1,
      name: 'pink',
      hex: '#C34375',
      cost: 100,
    },
  });

  await prisma.roomColor.upsert({
    where: {
      id: 2,
    },
    create: {
      id: 2,
      name: 'vermilion',
      hex: '#C34343',
      cost: 100,
    },
    update: {
      id: 2,
      name: 'vermilion',
      hex: '#C34343',
      cost: 100,
    },
  });

  await prisma.usernameColor.upsert({
    where: {
      id: 2,
    },
    create: {
      id: 2,
      name: 'vermilion',
      hex: '#C34343',
      cost: 100,
    },
    update: {
      id: 2,
      name: 'vermilion',
      hex: '#C34343',
      cost: 100,
    },
  });

  await prisma.roomColor.upsert({
    where: {
      id: 3,
    },
    create: {
      id: 3,
      name: 'orange',
      hex: '#C37143',
      cost: 100,
    },
    update: {
      id: 3,
      name: 'orange',
      hex: '#C37143',
      cost: 100,
    },
  });

  await prisma.usernameColor.upsert({
    where: {
      id: 3,
    },
    create: {
      id: 3,
      name: 'orange',
      hex: '#C37143',
      cost: 100,
    },
    update: {
      id: 3,
      name: 'orange',
      hex: '#C37143',
      cost: 100,
    },
  });

  await prisma.roomColor.upsert({
    where: {
      id: 4,
    },
    create: {
      id: 4,
      name: 'blue',
      hex: '#4367C3',
      cost: 100,
    },
    update: {
      id: 4,
      name: 'blue',
      hex: '#4367C3',
      cost: 100,
    },
  });

  await prisma.usernameColor.upsert({
    where: {
      id: 4,
    },
    create: {
      id: 4,
      name: 'blue',
      hex: '#4367C3',
      cost: 100,
    },
    update: {
      id: 4,
      name: 'blue',
      hex: '#4367C3',
      cost: 100,
    },
  });

  await prisma.roomColor.upsert({
    where: {
      id: 5,
    },
    create: {
      id: 5,
      name: 'purple',
      hex: '#7B43C3',
      cost: 100,
    },
    update: {
      id: 5,
      name: 'purple',
      hex: '#7B43C3',
      cost: 100,
    },
  });

  await prisma.usernameColor.upsert({
    where: {
      id: 5,
    },
    create: {
      id: 5,
      name: 'purple',
      hex: '#7B43C3',
      cost: 100,
    },
    update: {
      id: 5,
      name: 'purple',
      hex: '#7B43C3',
      cost: 100,
    },
  });

  await prisma.roomColor.upsert({
    where: {
      id: 6,
    },
    create: {
      id: 6,
      name: 'magenta',
      hex: '#C343B6',
      cost: 100,
    },
    update: {
      id: 6,
      name: 'magenta',
      hex: '#C343B6',
      cost: 100,
    },
  });

  await prisma.usernameColor.upsert({
    where: {
      id: 6,
    },
    create: {
      id: 6,
      name: 'magenta',
      hex: '#C343B6',
      cost: 100,
    },
    update: {
      id: 6,
      name: 'magenta',
      hex: '#C343B6',
      cost: 100,
    },
  });

  await prisma.roomColor.upsert({
    where: {
      id: 7,
    },
    create: {
      id: 7,
      name: 'gray',
      hex: '#717171',
      cost: 100,
    },
    update: {
      id: 7,
      name: 'gray',
      hex: '#717171',
      cost: 100,
    },
  });

  await prisma.usernameColor.upsert({
    where: {
      id: 7,
    },
    create: {
      id: 7,
      name: 'gray',
      hex: '#717171',
      cost: 100,
    },
    update: {
      id: 7,
      name: 'gray',
      hex: '#717171',
      cost: 100,
    },
  });

  await prisma.roomColor.upsert({
    where: {
      id: 8,
    },
    create: {
      id: 8,
      name: 'green',
      hex: '#4A9648',
      cost: 100,
    },
    update: {
      id: 8,
      name: 'green',
      hex: '#4A9648',
      cost: 100,
    },
  });

  await prisma.usernameColor.upsert({
    where: {
      id: 8,
    },
    create: {
      id: 8,
      name: 'green',
      hex: '#4A9648',
      cost: 100,
    },
    update: {
      id: 8,
      name: 'green',
      hex: '#4A9648',
      cost: 100,
    },
  });

  await prisma.roomColor.upsert({
    where: {
      id: 9,
    },
    create: {
      id: 9,
      name: 'yellow',
      hex: '#BE9C25',
      cost: 100,
    },
    update: {
      id: 9,
      name: 'yellow',
      hex: '#BE9C25',
      cost: 100,
    },
  });

  await prisma.usernameColor.upsert({
    where: {
      id: 9,
    },
    create: {
      id: 9,
      name: 'yellow',
      hex: '#BE9C25',
      cost: 100,
    },
    update: {
      id: 9,
      name: 'yellow',
      hex: '#BE9C25',
      cost: 100,
    },
  });

  await prisma.roomColor.upsert({
    where: {
      id: 10,
    },
    create: {
      id: 10,
      name: 'aqua',
      hex: '#34A3AA',
      cost: 100,
    },
    update: {
      id: 10,
      name: 'aqua',
      hex: '#34A3AA',
      cost: 100,
    },
  });

  await prisma.usernameColor.upsert({
    where: {
      id: 10,
    },
    create: {
      id: 10,
      name: 'aqua',
      hex: '#34A3AA',
      cost: 100,
    },
    update: {
      id: 10,
      name: 'aqua',
      hex: '#34A3AA',
      cost: 100,
    },
  });

  await prisma.roomColor.upsert({
    where: {
      id: 11,
    },
    create: {
      id: 11,
      name: 'red',
      hex: '#A80000',
      cost: 100,
    },
    update: {
      id: 11,
      name: 'red',
      hex: '#A80000',
      cost: 100,
    },
  });

  await prisma.usernameColor.upsert({
    where: {
      id: 11,
    },
    create: {
      id: 11,
      name: 'red',
      hex: '#A80000',
      cost: 100,
    },
    update: {
      id: 11,
      name: 'red',
      hex: '#A80000',
      cost: 100,
    },
  });

  await prisma.roomColor.upsert({
    where: {
      id: 12,
    },
    create: {
      id: 12,
      name: 'turquoise',
      hex: '#00A880',
      cost: 100,
    },
    update: {
      id: 12,
      name: 'turquoise',
      hex: '#00A880',
      cost: 100,
    },
  });

  await prisma.usernameColor.upsert({
    where: {
      id: 12,
    },
    create: {
      id: 12,
      name: 'turquoise',
      hex: '#00A880',
      cost: 100,
    },
    update: {
      id: 12,
      name: 'turquoise',
      hex: '#00A880',
      cost: 100,
    },
  });

  await prisma.roomColor.upsert({
    where: {
      id: 13,
    },
    create: {
      id: 13,
      name: 'crimson',
      hex: '#A4114A',
      cost: 100,
    },
    update: {
      id: 13,
      name: 'crimson',
      hex: '#A4114A',
      cost: 100,
    },
  });

  await prisma.usernameColor.upsert({
    where: {
      id: 13,
    },
    create: {
      id: 13,
      name: 'crimson',
      hex: '#A4114A',
      cost: 100,
    },
    update: {
      id: 13,
      name: 'crimson',
      hex: '#A4114A',
      cost: 100,
    },
  });
};
