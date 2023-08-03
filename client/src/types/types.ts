export interface IRoute {
	path: string,
	element: JSX.Element
}

export interface IDonate { 
	nickname: string,
	amount?: string,
	gifts?: string
}

export interface IWikiCharater {
	id: number,
	name: string,
	img: string,
	section: string
}