import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ManualTaskService } from './manual-task.service';
import { CreateManualTaskDto } from './dto/create-manual-task.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer.config';

@Controller('manual-task')
export class ManualTaskController {
  constructor(private readonly manualTaskService: ManualTaskService) {}

  @Get()
  async getAll() {
    return await this.manualTaskService.getAll();
  }

  @Post()
  async create(@Body() dto: CreateManualTaskDto) {
    return await this.manualTaskService.create(dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.manualTaskService.delete(id);
  }

  @Get(':id/responses')
  async getTaskResponses(@Param('id') id: number) {
    return await this.manualTaskService.getTaskResponses(id);
  }

  @UseGuards(AuthGuard)
  @Get('responses/me')
  async getMyTasksWithResponses(@Request() req) {
    const { id: userId } = req.user;
    return await this.manualTaskService.getMyTasksWithResponses(userId);
  }

  @UseGuards(AuthGuard)
  @Post(':id')
  @UseInterceptors(FileInterceptor('responseImg', multerOptions))
  async sendResponse(
    @Request() req,
    @UploadedFile() responseImg: Express.Multer.File | null,
    @Param('id') taskId: number,
  ) {
    const { id: userId } = req.user;
    return await this.manualTaskService.sendResponse(
      responseImg,
      userId,
      taskId,
    );
  }

  @UseGuards(AuthGuard)
  @Patch('response/accept/:id')
  async acceptResponse(@Param('id') responseId: number) {
    return await this.manualTaskService.acceptResponse(responseId);
  }

  @UseGuards(AuthGuard)
  @Patch('response/reject/:id')
  async rejectResponse(@Param('id') responseId: number) {
    return await this.manualTaskService.rejectResponse(responseId);
  }
}
