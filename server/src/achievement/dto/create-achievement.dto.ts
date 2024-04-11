export class CreateAchievementDto {
	title: string;
	description: string | null;
	awards: string;
	roomsId: string;
}

export interface AchievementAwards {
	badge: number | null;
	frame: number | null;
	background: number | null;
	panopticon: number | null;
	roles: {
		adjective: number | null;
		noun: number | null;
	};
	exp: number;
}