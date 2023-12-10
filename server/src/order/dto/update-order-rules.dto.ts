import { IsString } from 'class-validator'

export class UpdateOrderRulesDto {
	@IsString()
	rules: string
}