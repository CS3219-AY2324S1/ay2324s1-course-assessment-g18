import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IHistory } from './history.interface';
import { CreateHistoryDto } from './create-history.dto';
import { UpdateHistoryDto } from './update-history.dto';

@Injectable()
export class HistoryService {
  constructor(@InjectModel('History') private historyModel: Model<IHistory>) {}

  async addHistory(createHistoryDto: CreateHistoryDto): Promise<IHistory> {
    const newHistory = await new this.historyModel(createHistoryDto);
    return newHistory.save();
  }

  async getHistory(): Promise<IHistory[]> {
    const historyData = await this.historyModel.find();
    if (!historyData || historyData.length === 0) {
      throw new NotFoundException('History data not found');
    }
    return historyData;
  }

  async getHistoryByUserId(userId: string): Promise<IHistory[]> {
    const existingHistory = await this.historyModel.find({ userId });
    if (!existingHistory || existingHistory.length === 0) {
      throw new NotFoundException('History data not found');
    }
    return existingHistory;
  }

  async deleteHistoryByUserId(userId: string) {
    const deletedHistory = await this.historyModel.deleteMany({ userId });
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
}
