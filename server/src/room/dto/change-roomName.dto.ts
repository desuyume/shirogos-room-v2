import { IsNotEmpty, MaxLength, MinLength } from 'class-validator'

export class ChangeRoomNameDto {
	@IsNotEmpty()
  @MinLength(3)
  @MaxLength(34)
	roomName: string
}