import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { lastValueFrom } from 'rxjs';
import { Socket, Server } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({cors: true})
export class ChatGateway {
    constructor(private readonly chatService: ChatService) {}
    @WebSocketServer() server: Server;

    handleConnection(client: Socket) {
        console.log(`Client connected: ${client.id}`);
      }


  @SubscribeMessage('message')
  async handleMessage(socket: Socket, data: any): Promise<void> {
    console.log(data);
    const {message, username, currentRoom} = data;
    const messageDto = {message: message, username: username};
    await this.chatService.saveMessage(messageDto, currentRoom);
    this.server.to(currentRoom).emit('sendMessage', messageDto);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(socket: Socket, data) {
    console.log(data);
    const {roomId, toLeaveRoom} = data;
    socket.leave(toLeaveRoom);
    socket.join(roomId);
  }

  @SubscribeMessage('leaveSession')
    handleSessionLeave(client: Socket, payload: {roomId: string}) {
        const {roomId} = payload;
        client.leave(roomId);
    }
}
