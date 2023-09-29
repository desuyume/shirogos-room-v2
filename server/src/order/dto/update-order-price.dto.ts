import { IsNumber, IsString } from 'class-validator'

export class UpdateOrderPriceDto {
	id: number
	@IsNumber()
	cost: number
	@IsString()
	text: string
}