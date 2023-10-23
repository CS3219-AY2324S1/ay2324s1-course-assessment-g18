import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({cors: true})
export class ChatGateway {
    @WebSocketServer() server: Server;

    handleConnection(client: Socket) {
        console.log(`Client connected: ${client.id}`);
      }


  @SubscribeMessage('message')
  async handleMessage(socket: Socket, data: any): Promise<void> {
    console.log(data);
    const {message, username, currentRoom} = data;
    const messageDto = {message: message, username: username};
    console.log(currentRoom);
    console.log(message);
    const sockets = await this.server.in(currentRoom).fetchSockets()
    const socketIds = sockets.map(socket => socket.id);
    console.log(socketIds);
    this.server.to(currentRoom).emit('sendMessage', messageDto);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(socket: Socket, data) {
    console.log(data);
    const {roomId, toLeaveRoom} = data;
    socket.leave(toLeaveRoom);
    socket.join(roomId);
    
  }
}
