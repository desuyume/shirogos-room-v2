import { PrismaClient } from '@prisma/client';
import { OrderSeed } from './seeds/order-seed';
import { BirthdayAwardSeed } from './seeds/birthday-award-seed';
import { ColorsSeed } from './seeds/colors-seed';
import { BadgeSeed } from './seeds/badge-seed';

const prisma = new PrismaClient();

async function main() {
  await OrderSeed();
  await BirthdayAwardSeed();
  await ColorsSeed();
  await BadgeSeed();
}

main()
  .then(async () => {
    console.log('seeding complete successfully');
    await prisma.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
