import { IsNotEmpty } from 'class-validator'

export class ChangeRoomColorDto {
	@IsNotEmpty()
	color: string
}