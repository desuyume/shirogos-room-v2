import { IsNumber, IsString } from 'class-validator'

export class CreateOrderDto {
	id: number
	@IsNumber()
	orderTypeId: number
	@IsNumber()
	orderPriceId: number
	@IsNumber()
	userId: number
	@IsString()
	orderText: string
}