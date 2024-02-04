import { IsNotEmpty } from 'class-validator';

export class CreateMangaChapterDto {
  @IsNotEmpty()
  chapter: number;
}
