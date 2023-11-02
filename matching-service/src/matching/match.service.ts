// match.service.ts

import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { Socket } from 'socket.io';

interface User {
  client: Socket;
  difficulty: string;
  userId: String;
}

@Injectable()
export class MatchService {
    @Inject('QUESTION_SERVICE') private client: ClientProxy
  private queues: { [key: string]: User[] } = {
    Easy: [],
    Medium: [],
    Hard: [],
  };

  async enqueueUser(user: User): Promise<void> {
    const { difficulty, userId } = user;
    if (this.queues[difficulty].findIndex(user => user.userId === userId) === -1) {
        console.log("userEnqued");
        this.queues[difficulty].push(user);
        await this.tryMatchUsers(difficulty);
    } else {
        console.log('user already in queue');
    }
  }

  dequeueUser(userId: string, difficulty: string): void {
    const queue = this.queues[difficulty];
    const index = queue.findIndex(user => user.userId === userId);
    if (index !== -1) {
      queue.splice(index, 1);
      console.log(`User ${userId} dequeued from ${difficulty} queue`);
    }
  }

  async tryMatchUsers(difficulty: string): Promise<void> {
    const queue = this.queues[difficulty];
    console.log(queue);
    if (queue.length >= 2) {
      const matchedUsers = queue.splice(0, 2); // Extract the first two users from the queue
      const roomId = await this.notifyMatchedUsers(matchedUsers);
      console.log(`Room ID for the match: ${roomId}`);
    }
  }

  async notifyMatchedUsers(users: User[]): Promise<string> {
    const [user1, user2] = users;
    // Generate roomId by concatenating the two user's socket IDs
    const roomId = user1.client.id + user2.client.id;
    // const user = this.client.send({cmd: 'getUser'}, {"email": email});
        // await user.subscribe();
        // const userData = await lastValueFrom(user);
    const request = this.client.send({cmd: 'random'}, {"difficulty": user1.difficulty});
    await request.subscribe();
    const response = await lastValueFrom(request);
    const randomQuestion = response[0]['questionDifficulty'][0];
    console.log(randomQuestion);
    // Notify users about the match
    this.notifyMatch(user1.userId, user2, roomId, randomQuestion);
    this.notifyMatch(user2.userId, user1, roomId, randomQuestion);
  
    return roomId;
  }

  notifyMatch(matchedUserId: String, user: User, roomId: string, question: any): void {
    const socket: Socket =  user.client;
    console.log(question)
    socket.join(roomId);
    socket.emit('matchSuccess', { matchedUserId, roomId, question });
  }
}

