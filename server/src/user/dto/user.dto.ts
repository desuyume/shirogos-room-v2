export class UserDto {
  id: number;
  username: string | null;
  email: string | null;
  role: string;
  displayName: string;
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
    this.displayName = model.displayName;
    this.roomId = model.roomId;
  }
}
