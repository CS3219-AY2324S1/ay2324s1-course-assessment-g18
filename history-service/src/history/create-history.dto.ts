import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
export class CreateHistoryDto {
  // @IsNumber()
  // historyId: number;

  @IsString()
  @IsNotEmpty()
  readonly userEmail: string;

  @IsNumber()
  @IsNotEmpty()
  readonly questionId: number;

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
  readonly chatHistory: Array<string>;

  @IsString()
  @IsNotEmpty()
  readonly codeExecuted: string;
}
