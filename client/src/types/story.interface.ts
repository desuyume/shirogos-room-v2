export interface IStory {
	id: string
	title: string
	description: string | null
	cover_img: string
	pages: IStoryPage[]
}

export interface IStoryPage {
	id: number
	text: string
	page_num: number
}

export interface IStoryGeneral {
	id: string
	title: string
	description: string | null
	cover_img: string
}