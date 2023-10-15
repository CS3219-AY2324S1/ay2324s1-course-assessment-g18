// match.service.ts

import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

interface User {
  client: Socket;
  difficulty: string;
  userId: string;
}

@Injectable()
export class MatchService {
  private queues: { [key: string]: User[] } = {
    easy: [],
    medium: [],
    hard: [],
  };

  enqueueUser(user: User): void {
    const { difficulty } = user;
    this.queues[difficulty].push(user);
    this.tryMatchUsers(difficulty);
  }

  dequeueUser(userId: string, difficulty: string): void {
    const queue = this.queues[difficulty];
    const index = queue.findIndex(user => user.client.id === userId);
    if (index !== -1) {
      queue.splice(index, 1);
      console.log(`User ${userId} dequeued from ${difficulty} queue`);
    }
  }

  tryMatchUsers(difficulty: string): void {
    const queue = this.queues[difficulty];
    if (queue.length >= 2) {
      const matchedUsers = queue.splice(0, 2); // Extract the first two users from the queue
      const roomId = this.notifyMatchedUsers(matchedUsers);
      console.log(`Room ID for the match: ${roomId}`);
    }
  }

  notifyMatchedUsers(users: User[]): string {
    const [user1, user2] = users;
    // Generate roomId by concatenating the two user's socket IDs
    const roomId = user1.client.id + user2.client.id;
  
    // Notify users about the match
    this.notifyMatch(user1.userId, user2, roomId);
    this.notifyMatch(user2.userId, user1, roomId);
  
    return roomId;
  }

  notifyMatch(matchedUserId: string, user: User, roomId: string): void {
    const socket: Socket =  user.client;
    socket.emit('matchSuccess', { matchedUserId, roomId });
  }
}

