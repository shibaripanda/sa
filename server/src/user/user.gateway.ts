import { UseGuards } from '@nestjs/common'
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { UsersService } from './users.service'
import { ReqestUserByEmailDto } from './dto/request-user.dto'

@WebSocketGateway({cors:{origin:'*'}, namespace: 'user'})

export class UserGateway implements OnGatewayConnection, OnGatewayDisconnect {

  constructor(
    private userSevice: UsersService
  ) {}

  @WebSocketServer() server: Server

  handleConnection(@ConnectedSocket() client: Socket) {
    // client.join(room['hello'])
    // client.join(room2)
    console.log(client.rooms)
  }
  handleDisconnect(@ConnectedSocket() client: Socket) {
    client.disconnect(true)
  }


  @UseGuards(JwtAuthGuard)
  @SubscribeMessage('getUsers')
  async getUsers(@ConnectedSocket() client: Socket, @MessageBody() payload: ReqestUserByEmailDto): Promise<void> {
    const user = await this.userSevice.getUserByEmail(payload.email)
    this.server.to(client.id).emit('getUsers', user)
  }


}
