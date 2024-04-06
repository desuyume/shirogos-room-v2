import { Prisma, PrismaClient } from '@prisma/client';
import prismaRandom from 'prisma-extension-random';

export const extendedPrismaClient = new PrismaClient()
  .$extends(prismaRandom())
  .$extends({
    name: 'findManyAndCount',
    model: {
      $allModels: {
        findManyAndCount<Model, Args>(
          this: Model,
          args: Prisma.Exact<Args, Prisma.Args<Model, 'findMany'>>,
        ): Promise<[Prisma.Result<Model, Args, 'findMany'>, number]> {
          return extendedPrismaClient.$transaction([
            (this as any).findMany(args),
            (this as any).count({ where: (args as any).where }),
          ]) as any;
        },
      },
    },
  });

export type ExtendedPrismaClient = typeof extendedPrismaClient;
