import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MatchGateway } from './matching/match.gateway';
import { MatchService } from './matching/match.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, MatchGateway, MatchService],
})
export class AppModule {}
