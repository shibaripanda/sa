import { UseGuards } from '@nestjs/common'
import { ConnectedSocket, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

@WebSocketGateway({cors:{origin:'*'}})

export class AppGateway {

  constructor(
  ) {}

  @WebSocketServer() server: Server


  @UseGuards(JwtAuthGuard)
  handleConnection(@ConnectedSocket() client: Socket) {
    console.log('connect', client.id)
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log('disconnect', client.id)
    client.disconnect(true)
  }

}
