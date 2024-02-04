import { IsNotEmpty } from 'class-validator'

export class CreateMangaDto {
	@IsNotEmpty()
	id: string
	@IsNotEmpty()
	title: string
	@IsNotEmpty()
	chapter: number
	description: string
}