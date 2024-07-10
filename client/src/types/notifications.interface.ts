export interface INotification {
	id: number
	text: string
	img: string | null
	date_created: Date
}

export interface IFetchedNotification extends INotification {
	isRead: boolean
}

export interface IUserNotifications {
	unreadCount: number
	notifications: IFetchedNotification[]
}
