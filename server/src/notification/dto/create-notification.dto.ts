export class CreateNotificationDto {
	text: string;
	usernames: string;
}

export interface IFetchedNotification {
	id: number;
	text: string;
	img: string | null;
	date_created: Date;
	isRead: boolean
}