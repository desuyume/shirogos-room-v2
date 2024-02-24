import { IsNotEmpty } from 'class-validator'

export class CreateStoryDto {
	@IsNotEmpty()
	id: string
	@IsNotEmpty()
	title: string
	description: string
	pages: string
}

export class UpdateStoryDto extends CreateStoryDto {}

export interface IStoryPage {
	id: number
	text: string
	page_num: number
}