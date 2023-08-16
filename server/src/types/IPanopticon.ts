export interface IPanopticon {
	id: number
	cost: number
	img: string
}

export interface IPanopticonReq extends Omit<IPanopticon, 'id'> {}