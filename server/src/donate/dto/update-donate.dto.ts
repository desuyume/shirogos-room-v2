import { IsNumber, IsString } from 'class-validator';

export class UpdateAmountDonateDto {
	@IsNumber()
	addAmount: number
}

export class UpdateGiftsDonateDto {
	@IsString()
	gifts: string
}
