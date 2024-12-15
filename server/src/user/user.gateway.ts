import { UseGuards } from '@nestjs/common'
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { UsersService } from './users.service'

@WebSocketGateway(
  {
      cors:{
        origin:'*'
    }
  }
)

export class UserGateway {

  constructor(
    // private screenSevice: ScreenService,
    // private botSevice: BotService,
    private userSevice: UsersService
  ) {}

  
  @WebSocketServer() server: Server

  // @SubscribeMessage('updateUserToClient')
  // async updateUserToClient(client: Socket, payload: any): Promise<void> {
  //   if(payload.token === process.env.SERVER_TOKEN && global['connectUsers'][payload.botId]){
  //     const res = await this.userSevice.getUsers(payload.botId)
  //     this.server.to(global['connectUsers'][payload.botId]).emit('getUsers', res)
  //   }
  // }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage('getUsers')
  async getUsers(client: Socket, payload: any): Promise<void> {
    // global['connectUsers'][payload] = client.id
    console.log('fffffffffffff')
    const user = await this.userSevice.getUserByEmail(payload.email)
    // this.server.to(client.id).emit('getUsers', user)
  }


}
