export class CreateNotificationDto {
	text: string;
	usersId: string;
}

export interface IFetchedNotification {
	id: number;
	text: string;
	img: string | null;
	date_created: Date;
	isRead: boolean
}