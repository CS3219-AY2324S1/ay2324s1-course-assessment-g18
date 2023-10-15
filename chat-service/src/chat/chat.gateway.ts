import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class ChatGateway {
    @WebSocketServer() server: Server;


  @SubscribeMessage('message')
  handleMessage(socket: Socket, data: any): void {
    const {message, username} = data;
    socket.broadcast.emit('message', `${username}: ${message}`);
  }
}
