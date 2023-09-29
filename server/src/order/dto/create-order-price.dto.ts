import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateOrderPriceDto {
	id: number
	@IsNumber()
	cost: number
	@IsString()
	text: string
	@IsNotEmpty()
	type: string
}