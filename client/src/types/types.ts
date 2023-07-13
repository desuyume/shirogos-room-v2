export interface IRoute {
	path: string,
	element: JSX.Element
}

export interface IDonate { 
	nickname: string,
	amount?: string,
	gifts?: string
}