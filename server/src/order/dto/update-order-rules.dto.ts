import { IsString } from 'class-validator'

export class UpdateOrderRulesDto {
	id: number
	@IsString()
	rules: string
}