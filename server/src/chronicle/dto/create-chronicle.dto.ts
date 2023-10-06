import { IsNumber } from 'class-validator'

export class CreateChronicleDto {
	id: number
	@IsNumber()
	year: number
	@IsNumber()
	month: number
}