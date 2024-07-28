export class UserPayloadDto {
  constructor(payload) {
    this.id = payload.id;
    this.username = payload.username;
    this.role = payload.role;
    this.roomId = payload.roomId;
    this.displayName = payload.displayName;
  }

  id: number;
  username: string;
  role: string;
  displayName: string;
  roomId: number;
}
