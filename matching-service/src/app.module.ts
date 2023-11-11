import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MatchGateway } from './matching/match.gateway';
import { MatchService } from './matching/match.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [    ClientsModule.register([{
    name: 'QUESTION_SERVICE',
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'questions_queue',
      queueOptions: {
        durable: false
      }
    }
  }])],
  controllers: [AppController],
  providers: [AppService, MatchGateway, MatchService],
})
export class AppModule {}
