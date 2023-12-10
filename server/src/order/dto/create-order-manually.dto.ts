import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateOrderManuallyDto {
	@IsNumber()
	orderPriceId: number
	@IsNotEmpty()
	username: string
	@IsString()
	orderText: string
}