import { IsString } from 'class-validator'

export class CreateOnlineOptionDto {
	id: number
	@IsString()
	title: string
}