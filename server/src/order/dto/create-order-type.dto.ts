import { IsString } from 'class-validator'

export class CreateOrderTypeDto {
	id: number
	@IsString()
	type: string
	orderRules?: string
}