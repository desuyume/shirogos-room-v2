export class UserDto {
  id: number;
  username: string;
  email: string;
  role: string;
  roomId: number;
  profile_img?: string;
  twitchId: number;
  discordId?: number;
  vkId?: number;
  telegramId?: number;

  constructor(model: UserDto) {
    this.id = model.id;
    this.username = model.username;
    this.role = model.role;
    this.roomId = model.roomId;
  }
}
