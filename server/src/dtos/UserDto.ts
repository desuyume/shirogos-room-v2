import { IUserPayload } from '../types/IUser.js'

class UserDto {
	id;
	email;
	role;

	constructor(model: IUserPayload) {
		this.id = model.id;
		this.email = model.email;
		this.role = model.role;
	}
}

export default UserDto;