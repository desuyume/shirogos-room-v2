import { PrismaClient } from '@prisma/client';
import { OrderSeed } from './seeds/order-seed';
import { BirthdayAwardSeed } from './seeds/birthday-award-seed'

const prisma = new PrismaClient();

async function main() {
  await OrderSeed();
  await BirthdayAwardSeed();
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
