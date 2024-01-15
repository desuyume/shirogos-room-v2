export class CreateCharacterDto {
  id: string;
  name: string;
  subTitle?: string;
  subSubTitle?: string;
  categoryId?: string;
  characterDescriptions: string;
  characterCharacteristics: string;
}

export class UpdateCharacterDto extends CreateCharacterDto {}

export interface IDescription {
  title: string;
  description: string;
}

export interface ICharacteristic {
  title: string;
  characteristic: string;
}
