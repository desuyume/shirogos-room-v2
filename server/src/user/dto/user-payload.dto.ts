export class UserPayloadDto {
  constructor(payload) {
    this.id = payload.id;
    this.username = payload.username;
    this.role = payload.role;
    this.roomId = payload.roomId;
  }

  id: number;
  username: string;
  role: string;
  roomId: number;
}
