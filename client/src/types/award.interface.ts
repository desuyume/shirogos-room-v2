export enum AwardType {
	BOUTIQUE = 'BOUTIQUE',
	SPECIAL = 'SPECIAL',
}

export interface IAward {
	id: number
	cost: number
	title: string
	award_img: string
	category: AwardType
	awardType: IAwardType
}

export interface IAwardType {
	id: number
	type: string
}

export interface ICreateAward {
	cost: number;
  title: string;
  awardTypeId: number;
  awardImg: string;
  category: AwardType;
}