import { IsNumber } from 'class-validator'

export class UpdateBirthdayAwardDto {
	id: number
	@IsNumber()
	award: number
}