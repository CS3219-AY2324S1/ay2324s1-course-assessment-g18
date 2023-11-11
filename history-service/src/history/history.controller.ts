import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
} from '@nestjs/common';
import { HistoryService } from './history.service';
import { CreateHistoryDto } from './create-history.dto';
import { UpdateHistoryDto } from './update-history.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UpdateCodeExecutedDto } from './update-code.dto';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Post()
  async addHistory(@Body() createHistoryDto: CreateHistoryDto) {
    console.log('add history called');
    console.log(createHistoryDto);
    return await this.historyService.addHistory(createHistoryDto);
  }

  @MessagePattern({ cmd: 'addHistory' })
  async addPayloadHistory(@Payload() data) {
    console.log('add payload history called');
    const history: CreateHistoryDto = {
      userEmail: data.userEmail,
      roomId: data.roomId,
      questionId: data.questionId,
      questionTitle: data.questionTitle,
      questionCategories: data.questionCategories,
      questionDifficulty: data.questionDifficulty,
      questionDescription: data.questionDescription,
      questionExamples: data.questionExamples,
      questionConstraints: data.questionConstraints,
      questionImages: data.questionImages,
      chatHistory: [],
      codeExecuted: '',
    };
    console.log(history);
    return await this.historyService.addHistory(history);
  }

  @MessagePattern({ cmd: 'chatting' })
  async addChatHistory(@Payload() data) {
    console.log('chat called');
    const message = data.message;
    const roomId = data.roomId;
    console.log(message);
    console.log(roomId);
    return await this.historyService.addChatHistory(message, roomId);
  }

  @Put('/updateCodeByRoomIdAndUserEmail/:roomId/:userEmail')
  async updateCodeByRoomIdAndUserEmail(
    @Param('roomId') roomId: string,
    @Param('userEmail') userEmail: string,
    @Body() updateCodeExecutedDto: UpdateCodeExecutedDto,
  ) {
    return this.historyService.updateCodeByRoomIdAndUserEmail(
      roomId,
      userEmail,
      updateCodeExecutedDto.codeExecuted,
    );
  }

  @Put('/updateCodeExecutedByRoomId/:roomId')
  async updateCodeExecutedByRoomId(
    @Param('roomId') roomId: string,
    @Body() updateCodeExecutedDto: UpdateCodeExecutedDto,
  ) {
    return this.historyService.updateCodeExecutedByRoomId(
      roomId,
      updateCodeExecutedDto.codeExecuted,
    );
  }

  @Post('/chat')
  async chat(@Body() data) {
    return await this.historyService.addChatHistory(data.message, data.roomId);
  }

  @Get()
  async getHistory() {
    return this.historyService.getHistory();
  }

  @Get(':userEmail')
  async getHistoryByUserId(@Param('userEmail') userEmail: string) {
    return this.historyService.getHistoryByUserEmail(userEmail);
  }

  @Delete(':userEmail')
  async deleteHistoryByUserId(@Param('userEmail') userEmail: string) {
    return this.historyService.deleteHistoryByUserEmail(userEmail);
  }

  @Put(':historyId')
  async updateHistoryById(
    @Param('historyId') historyId: string,
    @Body() updateHistoryDto: UpdateHistoryDto,
  ) {
    return this.historyService.updateHistoryById(historyId, updateHistoryDto);
  }
}
