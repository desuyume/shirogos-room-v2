export interface ICharacter {
  id: string
  name: string
  subTitle: string | null
  subSubTitle: string | null
  category: ICategory | null
  original_img: string | null
  miniature_img: string | null
  characterDescriptions: IDescription[]
  characterCharacteristics: ICharacteristic[]
}

export interface ICharacterPreview {
  id: string
  name: string
  category: ICategory | null
  original_img: string | null
  miniature_img: string | null
}

export interface ICharacteristic {
  id: number
  title: string
  characteristic: string
}

export interface IDescription {
  id: number
  title: string
  description: string
}

export type ICharacterBlock = IDescription | ICharacteristic
export type ICharacterBlocks = IDescription[] | ICharacteristic[]

export interface ICategory {
  id: number
  title: string
}

export interface ICreateCategory extends Omit<ICategory, 'id'> {}
