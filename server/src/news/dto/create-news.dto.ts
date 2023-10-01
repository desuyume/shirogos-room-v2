import { IsString } from 'class-validator';

export class CreateNewsDto {
  id: number;
  @IsString()
  text: string;
  created_at: Date;
}
