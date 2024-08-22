export interface IChronicle {
  id: number
  year: number
  month: number
}

export interface ICreateChronicle extends Omit<IChronicle, 'id'> {}

interface IChronicleEvent {
  id: number
  day: number
  prefix: string
  text?: string
  img?: string
  chroniclesId: number
}

export interface IChronicleWithEvents extends IChronicle {
  events: IChronicleEvent[]
}

export interface ICreateChronicleEvent {
  day: number
  prefix: string
  text?: string
  img?: string
}

export interface IChronicleCount {
  count: number
}
