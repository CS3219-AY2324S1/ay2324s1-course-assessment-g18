import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization',
  });

//   const microservice = app.connectMicroservice<MicroserviceOptions>({
//     transport: Transport.RMQ,
//     options: {
//       urls:['amqp://rabbitmq:5672'],
//       queue: 'users_queue',
//       queueOptions: {
//         durable: false
//       }
//     }
//   });
//   await app.startAllMicroservices();
  await app.listen(4000);
}
bootstrap();
