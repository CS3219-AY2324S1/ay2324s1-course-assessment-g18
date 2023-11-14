import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './chat/chat.gateway';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ChatService } from './chat/chat.service';

@Module({
  imports: [ClientsModule.register([{
    name: 'HISTORY_SERVICE',
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://34.142.210.160:5672'],
      queue: 'history_queue',
      queueOptions: {
        durable: false
      }
    }
  }])],
  controllers: [AppController],
  providers: [AppService, ChatGateway, ChatService],
})
export class AppModule {}
