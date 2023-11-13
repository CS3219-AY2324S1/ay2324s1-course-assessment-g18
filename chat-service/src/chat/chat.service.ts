// match.service.ts

import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { Socket } from 'socket.io';

@Injectable()
export class ChatService {
    @Inject('HISTORY_SERVICE') private client: ClientProxy
    async saveMessage(message: any, roomId: string) {
        console.log("save message called");
        const req = this.client.send({ cmd: 'chatting' }, { message: message, roomId: roomId });
        await req.subscribe();
    }
}

