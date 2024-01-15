import { IsNotEmpty } from 'class-validator';

export class CreateCharacterCategoryDto {
  @IsNotEmpty()
  title: string;
}
