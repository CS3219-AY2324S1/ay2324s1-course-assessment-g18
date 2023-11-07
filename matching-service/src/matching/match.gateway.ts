import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MatchService } from './match.service';

@WebSocketGateway({cors: true})
export class MatchGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() server: Server;
  
    constructor(private readonly matchService: MatchService) {}
  
    handleConnection(client: Socket) {
      console.log(`Client connected: ${client.id}`);
    }
  
    handleDisconnect(client: Socket) {
        this.matchService.dequeueUser(client.id, 'Easy');
        this.matchService.dequeueUser(client.id, 'Medium');
        this.matchService.dequeueUser(client.id, 'Hard');
        console.log(`Client disconnected: ${client.id}`);
    }
  
    @SubscribeMessage('match')
    async handleSelectDifficulty(client: Socket, payload: { difficulty: string, userId: String, userEmail: string }) {
      const { difficulty, userId, userEmail } = payload;
      const user = { client: client, difficulty, userId, userEmail };
      await this.matchService.enqueueUser(user);
      client.emit('matching', { userId, difficulty });
    }

    @SubscribeMessage('matchCancel')
    handleMatchCancel(client: Socket, payload: { difficulty: string, userId: string }) {
      const { userId } = payload;
      console.log("matchCancel called");
      this.matchService.dequeueUser(userId, "Easy");
      this.matchService.dequeueUser(userId, "Medium");
      this.matchService.dequeueUser(userId, "Hard");
      client.emit('matchCancelSuccess', { userId });
    }

    @SubscribeMessage('leaveSession')
    handleSessionLeave(client: Socket, payload: {roomId: string}) {
        const {roomId} = payload;
        console.log("client leaving session");
        console.log(roomId);
        this.server.to(roomId).emit("partnerLeaveSession");
        client.leave(roomId);
    }

}
