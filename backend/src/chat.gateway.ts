import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WsResponse,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from "@nestjs/websockets";
import { Logger } from "@nestjs/common";
import { Socket, Server } from "socket.io";

// @WebSocketGateway({ namespace: '/chat' })
@WebSocketGateway({ cors: true })
//  , OnGatewayConnection, OnGatewayDisconnect
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger("ChatGateway");
  afterInit(server: Server) {
    this.logger.log("Initialized");
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Chat Client Disconnected:  ${client.id}`);
  }
  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Chat Client Connected:  ${client.id}  ${args}`);
  }

  //   @SubscribeMessage('chatToServer')
  //   //   handleMessage(client: Socket, text: string): WsResponse<string> {
  //   handleMessage(
  //     client: Socket,
  //     message: { sender: string; room: string; message: string },
  //   ): void {
  //     // Same as return type of void and client.emit('msgToClient', text);
  //     this.wss.to(message.room).emit('chatToClient', message);
  //     // return { event: 'msgToClient', data: text };
  //   }

  //   @SubscribeMessage('joinRoom')
  //   handleJoinRoom(client: Socket, room: string) {
  //     client.join(room);
  //     client.emit('joinedRoom', room);
  //   }

  //   @SubscribeMessage('leaveRoom')
  //   handleLeaveRoom(client: Socket, room: string) {
  //     client.leave(room);
  //     client.emit('leftRoom', room);
  //   }
  // }

  @SubscribeMessage("dmToServer")
  dmMessage(
    client: Socket,
    message: { sender: string; receiver: string; message: string }
  ): void {
    this.logger.log(` ${message}`);
    // console.log(message, roomId);
    // console.log(JSON.stringify(message));
    // Same as return type of void and client.emit('msgToClient', text);
    // this.wss.to(message.room).emit('chatToClient', message);
    // this.wss.in(roomId).emit('newChatMessage', message);
    // this.wss.emit('newChatMessage', message);
    // client.emit('newChatMessage', message);
    // return { event: 'msgToClient', data: text };
  }

  @SubscribeMessage("newChatMessage")
  //   handleMessage(client: Socket, text: string): WsResponse<string> {
  handleMessage(
    client: Socket,
    message: { sender: string; room: string; message: string }
    // message,
  ): void {
    const { roomId } = client.handshake.query;

    // console.log("Oui on l'a fait");
    // console.log(message, roomId);
    // console.log(JSON.stringify(message));
    // Same as return type of void and client.emit('msgToClient', text);
    // this.wss.to(message.room).emit('chatToClient', message);
    this.wss.in(roomId).emit("newChatMessage", message);
    // this.wss.emit('newChatMessage', message);
    // client.emit('newChatMessage', message);
    // return { event: 'msgToClient', data: text };
  }

  @SubscribeMessage("joinRoom")
  handleJoinRoom(client: Socket, room: string) {
    client.join(room);
    client.emit("joinedRoom", room);
  }

  @SubscribeMessage("USER_ONLINE")
  handleTest(client: Socket, user: string) {
    this.logger.log(`Server Got Message from ${user}`);
    client.emit("USER_ONLINE", "Si si la famille");
  }

  @SubscribeMessage("leaveRoom")
  handleLeaveRoom(client: Socket, room: string) {
    client.leave(room);
    client.emit("leftRoom", room);
  }
}
