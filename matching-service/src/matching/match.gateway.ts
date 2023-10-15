import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MatchService } from './match.service';

@WebSocketGateway()
export class MatchGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() server: Server;
  
    constructor(private readonly matchService: MatchService) {}
  
    handleConnection(client: Socket) {
      console.log(`Client connected: ${client.id}`);
    }
  
    handleDisconnect(client: Socket) {
        this.matchService.dequeueUser(client.id, 'easy');
        this.matchService.dequeueUser(client.id, 'medium');
        this.matchService.dequeueUser(client.id, 'hard');
        console.log(`Client disconnected: ${client.id}`);
    }
  
    @SubscribeMessage('match')
    handleSelectDifficulty(client: Socket, payload: { difficulty: string, userId: string }) {
      const { difficulty, userId } = payload;
      const user = { client: client, difficulty, userId };
      this.matchService.enqueueUser(user);
      client.emit('matching', { userId, difficulty });
    }

    @SubscribeMessage('matchCancel')
    handleMatchCancel(client: Socket, payload: { difficulty: string, userId: string }) {
      const { difficulty, userId } = payload;
      this.matchService.dequeueUser(userId, difficulty);
      client.emit('matchCancelSuccess', { userId, difficulty });
    }

}
