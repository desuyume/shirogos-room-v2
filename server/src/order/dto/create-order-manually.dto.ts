import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateOrderManuallyDto {
	@IsNumber()
	orderPriceId: number
	@IsNotEmpty()
	userId: number
	@IsString()
	orderText: string
}