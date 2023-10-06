import { IsString } from 'class-validator'

export class CreateChronicleEventDto {
	id: number;
	@IsString()
	day: string;
	text?: string;
}