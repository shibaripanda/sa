import { UseGuards, UsePipes } from '@nestjs/common'
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { UsersService } from './users.service'
import { ReqestUserByEmailDto } from './dto/request-user.dto'
import { UpdateUserRoleDto } from './dto/updateUserRole.dto'
import { WSValidationPipe } from 'src/modules/wsPipeValid'
import { RolesGuard } from 'src/auth/roles.guard'

@WebSocketGateway({cors:{origin:'*'}, namespace: 'user'})

// export class UserGateway implements OnGatewayConnection, OnGatewayDisconnect {
  export class UserGateway  {

  constructor(
    private userSevice: UsersService
  ) {}

  @WebSocketServer() server: Server

  // handleConnection(@ConnectedSocket() client: Socket) {
  //   // client.join(room['hello'])
  //   // client.join(room2)
  //   console.log(client.rooms)
  // }
  // handleDisconnect(@ConnectedSocket() client: Socket) {
  //   client.disconnect(true)
  // }


  @UseGuards(JwtAuthGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('getUserByEmail')
  async getUsers(@ConnectedSocket() client: Socket, @MessageBody() reqestUserByEmailDto: ReqestUserByEmailDto): Promise<void> {
    const user = await this.userSevice.getUserByEmail(reqestUserByEmailDto.email)
    client.emit('getUserByEmail', user)
    // this.server.to(client.id).emit('getUserByEmail', user)
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('addRoleToUser')
  async addRoleToUser(@MessageBody() updateUserRoleDto: UpdateUserRoleDto): Promise<void> {
    await this.userSevice.addRoleToUser(updateUserRoleDto.email, updateUserRoleDto.serviceId, updateUserRoleDto.role)
  }

}
