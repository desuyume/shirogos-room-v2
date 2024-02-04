import { IsNotEmpty } from 'class-validator'

export class UpdateMangaDto {
	@IsNotEmpty()
	id: string
	@IsNotEmpty()
	title: string
	@IsNotEmpty()
	chapter: number
	description: string
}