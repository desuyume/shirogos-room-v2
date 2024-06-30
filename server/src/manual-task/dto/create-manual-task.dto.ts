import { IsNotEmpty } from 'class-validator';

export class CreateManualTaskDto {
  @IsNotEmpty()
  title: string;
  description: string | null;
  do: number | null;
  exp: number | null;
}
