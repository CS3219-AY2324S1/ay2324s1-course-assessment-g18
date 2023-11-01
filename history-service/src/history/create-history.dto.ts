import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
export class CreateHistoryDto {
  @IsNumber()
  @IsNotEmpty()
  readonly historyId: number;

  @IsString()
  @IsNotEmpty()
  readonly userEmail: string;

  @IsString()
  @IsNotEmpty()
  readonly questionId: string;

  @IsString()
  @IsNotEmpty()
  readonly questionTitle: string;

  @IsString()
  @IsNotEmpty()
  readonly questionDescription: string;

  @IsString()
  @IsNotEmpty()
  readonly questionDifficulty: string;

  @IsString()
  @IsNotEmpty()
  readonly chatHistory: string;

  @IsString()
  @IsNotEmpty()
  readonly codeExecuted: string;
}
