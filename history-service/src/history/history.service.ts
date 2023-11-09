import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IHistory } from './history.interface';
import { CreateHistoryDto } from './create-history.dto';
import { UpdateHistoryDto } from './update-history.dto';
import { History } from './history.schema';

@Injectable()
export class HistoryService {
  constructor(
    @InjectModel(History.name) private historyModel: Model<IHistory>,
  ) {}

  async addHistory(createHistoryDto: CreateHistoryDto): Promise<IHistory> {
    const newHistory = await new this.historyModel(createHistoryDto);

    const MaxId = await this.getMaximumId(createHistoryDto.userEmail);

    if (MaxId.length == 0) {
      newHistory.historyId = 1;
    } else {
      newHistory.historyId = MaxId[0].historyId + 1;
    }

    return await new this.historyModel(newHistory).save();
    // const res = await new this.historyModel(createHistoryDto).save();
    // console.log(History.name);
    // console.log(res);
    // return res;
  }

  async updateCodeExecutedByRoomId(
    roomId: string,
    newCodeExecuted: string,
  ): Promise<any> {
    const filter = { roomId };
    const update = { codeExecuted: newCodeExecuted };
    const result = await this.historyModel.updateMany(filter, update);
    return result;
  }

  async addChatHistory(message: any, roomId: string) {
    console.log(message);
    console.log(roomId);
    const foundHistories = await this.historyModel.find({ roomId });
    console.log(foundHistories);
    foundHistories.forEach((history) => {
      history.chatHistory.push(message);
      history.save();
    });
  }

  async getHistory(): Promise<IHistory[]> {
    const historyData = await this.historyModel.find();
    if (!historyData || historyData.length === 0) {
      throw new NotFoundException('History data not found');
    }
    return historyData;
  }

  async getHistoryByUserEmail(userEmail: string): Promise<IHistory[]> {
    const existingHistory = await this.historyModel.find({ userEmail });
    if (!existingHistory || existingHistory.length === 0) {
      throw new NotFoundException('History data not found');
    }
    return existingHistory;
  }

  async deleteHistoryByUserEmail(userEmail: string) {
    const deletedHistory = await this.historyModel.deleteMany({ userEmail });
    if (!deletedHistory) {
      throw new NotFoundException('History data not found');
    }
    return deletedHistory;
  }

  async updateHistoryById(
    historyId: string,
    updateHistoryDto: UpdateHistoryDto,
  ): Promise<IHistory> {
    const updatedHistory = await this.historyModel.findByIdAndUpdate(
      historyId,
      updateHistoryDto,
      { new: true },
    );
    if (!updatedHistory) {
      throw new NotFoundException('History data not found');
    }
    return updatedHistory;
  }

  async getMaximumId(userEmail: string) {
    return await this.historyModel
      .find({ userEmail })
      .sort({ historyId: -1 })
      .limit(1);
  }
}
