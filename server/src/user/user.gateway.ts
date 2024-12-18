import { UseGuards, UsePipes } from '@nestjs/common'
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { UsersService } from './users.service'
import { ReqestUserByEmailDto } from './dto/request-user.dto'
import { UpdateUserRoleDto } from './dto/updateUserRole.dto'
import { WSValidationPipe } from 'src/modules/wsPipeValid'

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
  @SubscribeMessage('getUserByEmail')
  async getUsers(@ConnectedSocket() client: Socket, @MessageBody() reqestUserByEmailDto: ReqestUserByEmailDto): Promise<void> {
    const user = await this.userSevice.getUserByEmail(reqestUserByEmailDto.email)
    this.server.to(client.id).emit('getUserByEmail', user)
  }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage('addRoleToUser')
  @UsePipes(new WSValidationPipe())
  async addRoleToUser(@MessageBody() updateUserRoleDto: UpdateUserRoleDto): Promise<void> {
    console.log(updateUserRoleDto)
    await this.userSevice.addRoleToUser(updateUserRoleDto.email, updateUserRoleDto.serviceId, updateUserRoleDto.role)
  }


}
