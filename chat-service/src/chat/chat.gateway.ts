import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class ChatGateway {
    @WebSocketServer() server: Server;


  @SubscribeMessage('message')
  handleMessage(socket: Socket, data: any): void {
    const {message, username, currentRoom} = data;
    console.log(currentRoom);
    socket.broadcast.to(currentRoom).emit('message', `${username}: ${message}`);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(socket: Socket, data) {
    const {room, toLeaveRoom} = data;
    socket.leave(toLeaveRoom);
    socket.join(room);
  }
}
