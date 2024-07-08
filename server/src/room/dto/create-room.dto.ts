import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateRoomDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(34)
  roomName: string;
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(25)
  username: string;
}
