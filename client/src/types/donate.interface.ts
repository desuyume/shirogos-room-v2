export interface IDonate {
  id: number
  username: string
  amount?: number
  gifts?: string
}

export interface ICreateDonate extends Omit<IDonate, 'id'> {}

export interface IUpdateDonateAmount {
  id: number
  addAmount: string
}

export interface IUpdateDonateGifts {
  id: number
  gifts: string
}
