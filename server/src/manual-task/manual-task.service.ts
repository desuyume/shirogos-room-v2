import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateManualTaskDto } from './dto/create-manual-task.dto';
import { PrismaService } from 'src/prisma.service';
import { removeFile } from 'src/utils/removeFile';
import { TaskResponseStatus } from '@prisma/client';

@Injectable()
export class ManualTaskService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.task.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  async create(dto: CreateManualTaskDto) {
    return await this.prisma.task.create({
      data: {
        title: dto.title,
        description: dto.description ?? null,
        do: dto.do ?? null,
        exp: dto.exp ?? null,
      },
    });
  }

  async delete(id: number) {
    const taskResponses = await this.prisma.taskResponse.findMany({
      where: {
        taskId: id,
      },
    });

    for (const taskResponse of taskResponses) {
      if (taskResponse.img) {
        removeFile(taskResponse.img);
      }
      await this.prisma.taskResponse.delete({
        where: {
          id: taskResponse.id,
        },
      });
    }

    return await this.prisma.task.delete({
      where: {
        id,
      },
    });
  }

  async getTaskResponses(id: number) {
    const task = await this.prisma.task.findUnique({
      where: {
        id,
      },
    });
    if (!task) {
      throw new NotFoundException('task not found');
    }

    const taskResponses = await this.prisma.taskResponse.findMany({
      where: {
        taskId: id,
        status: TaskResponseStatus.PENDING,
      },
      select: {
        id: true,
        img: true,
        status: true,
        Room: {
          select: {
            user: {
              select: {
                username: true,
              },
            },
          },
        },
      },
    });

    return {
      task,
      responses: taskResponses.map((taskResponse) => {
        return {
          id: taskResponse.id,
          img: taskResponse.img,
          status: taskResponse.status,
          username: taskResponse.Room.user.username,
        };
      }),
    };
  }

  async getMyTasksWithResponses(userId: number) {
    const tasks = await this.prisma.task.findMany({
      include: {
        TaskResponse: {
          where: {
            Room: {
              userId,
            },
          },
        },
      },
    });

    return tasks.map((task) => {
      return {
        task,
        response: !!task.TaskResponse.length ? task.TaskResponse[0] : null,
      };
    });
  }

  async sendResponse(
    responseImg: Express.Multer.File | null,
    userId: number,
    taskId: number,
  ) {
    const room = await this.prisma.room.findUnique({
      where: {
        userId,
      },
    });
    if (!room) {
      throw new NotFoundException('room not found');
    }

    const taskResponse = await this.prisma.taskResponse.findFirst({
      where: {
        taskId,
        roomId: room.id,
      },
    });
    if (taskResponse) {
      if (taskResponse.status !== TaskResponseStatus.ACCEPTED) {
        if (taskResponse.img) {
          removeFile(taskResponse.img);
        }
        await this.prisma.taskResponse.deleteMany({
          where: {
            taskId,
            roomId: room.id,
          },
        });
      } else {
        throw new BadRequestException('response already accepted');
      }
    }

    return await this.prisma.taskResponse.create({
      data: {
        img: !!responseImg ? responseImg.filename : null,
        status: TaskResponseStatus.PENDING,
        roomId: room.id,
        taskId,
      },
    });
  }

  async acceptResponse(responseId: number) {
    const taskResponse = await this.prisma.taskResponse.findUnique({
      where: {
        id: responseId,
      },
      include: {
        Task: true,
      },
    });
    if (!taskResponse) {
      throw new NotFoundException('response not found');
    }

    const room = await this.prisma.room.findUnique({
      where: {
        id: taskResponse.roomId,
      },
    });
    if (!room) {
      throw new NotFoundException('room not found');
    }

    await this.prisma.user.update({
      where: {
        id: room.userId,
      },
      data: {
        dangos: {
          increment: taskResponse.Task.do,
        },
        exp: {
          increment: taskResponse.Task.exp,
        },
      },
    });

    if (taskResponse.img) {
      removeFile(taskResponse.img);
    }

    return await this.prisma.taskResponse.update({
      where: {
        id: responseId,
      },
      data: {
        status: TaskResponseStatus.ACCEPTED,
        img: null,
      },
    });
  }

  async rejectResponse(responseId: number) {
    const taskResponse = await this.prisma.taskResponse.findUnique({
      where: {
        id: responseId,
      },
    });
    if (!taskResponse) {
      throw new NotFoundException('response not found');
    }

    if (taskResponse.img) {
      removeFile(taskResponse.img);
    }

    return await this.prisma.taskResponse.updateMany({
      where: {
        id: responseId,
      },
      data: {
        status: TaskResponseStatus.REJECTED,
        img: null,
      },
    });
  }
}
