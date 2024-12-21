import { ConnectedSocket, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'

@WebSocketGateway({cors:{origin:'*'}})

export class AppGateway {

  constructor(
  ) {}

  @WebSocketServer() server: Server

  // handleConnection(@ConnectedSocket() client: Socket) {
  //   console.log('connect', client.id)
  //   // client.join(room['hello'])
  //   // client.join(room2)
  //   // console.log(client.rooms)
  // }
  // handleDisconnect(@ConnectedSocket() client: Socket) {
  //   console.log('disconnect', client.id)
  //   client.disconnect(true)
  // }

  
  @SubscribeMessage('getText')
  async getUsers(): Promise<void> {
    console.log('fff')
  }


}
