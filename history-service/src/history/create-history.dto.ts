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

  @IsString()
  @IsNotEmpty()
  readonly matchedPeer: string;

  @IsNumber()
  @IsNotEmpty()
  readonly questionId: number;

  @IsString()
  @IsNotEmpty()
  readonly questionTitle: string;

  readonly questionCategories: Array<string>;

  @IsString()
  @IsNotEmpty()
  readonly questionDifficulty: string;

  @IsString()
  @IsNotEmpty()
  readonly questionDescription: string;

  readonly questionExamples: Array<Array<string>>;

  readonly questionConstraints: string;

  readonly questionImages: string;

  @IsNotEmpty()
  readonly chatHistory: Array<string>;

  @IsString()
  readonly codeExecuted: string;
}
