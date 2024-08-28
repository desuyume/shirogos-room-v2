export class CreatePanopticonDto {
  title: string;
  description: string | null;
  cost: number;
  isForSale: string;
}

export class UpdatePanopticonDto {
  title: string;
  description: string | null;
  cost: number;
}
