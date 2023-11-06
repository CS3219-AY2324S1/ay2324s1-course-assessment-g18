import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
export class CreateHistoryDto {
//   @IsNumber()
//   historyId: number;

  @IsString()
  @IsNotEmpty()
  readonly userEmail: string;

  @IsString()
  @IsNotEmpty()
  readonly roomId: string;

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

  @IsNotEmpty()
  readonly chatHistory: Array<string>;

  @IsString()
  readonly codeExecuted: string;
}
