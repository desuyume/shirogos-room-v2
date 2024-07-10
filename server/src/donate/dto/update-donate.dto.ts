import { IsString } from 'class-validator';

export class UpdateAmountDonateDto {
	addAmount: string
}

export class UpdateGiftsDonateDto {
	@IsString()
	gifts: string
}
