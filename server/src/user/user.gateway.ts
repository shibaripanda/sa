import { Request, UseGuards, UsePipes } from '@nestjs/common'
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { UsersService } from './users.service'
import { ReqestUserByEmailDto } from './dto/request-user.dto'
import { UpdateUserRoleDto } from './dto/updateUserRole.dto'
import { WSValidationPipe } from 'src/modules/wsPipeValid'
import { RolesGuard } from 'src/auth/roles.guard'
import { GetServiceUsersDto } from './dto/GetServiceUsers.dto'
import { DeleteServiceUser } from './dto/DeleteServiceUser.dto'
import { AddDeviceToUser } from './dto/AddDeviceToUser.dto'
import { AddStatusToUser } from './dto/AddStatusToUser.dto'
import { UpdateUserData } from './dto/UpdateUserData.dto'
import { UpdateOrderListData } from './dto/UpdateOrderListData.dto'

@WebSocketGateway({cors:{origin:'*'}})

  export class UserGateway  {

  constructor(
    private userSevice: UsersService
  ) {}

  @WebSocketServer() server: Server

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('changeMyMainOrderDataLine')
  async changeDataOrderList(@ConnectedSocket() client: Socket, @MessageBody() payload: UpdateOrderListData, @Request() req: any): Promise<void> {
    console.log(payload.action)
    const user = await this.userSevice.changeDataOrderList(payload.serviceId, payload.data, payload.status, req.user, payload.index1, payload.index2, payload.action)
    console.log(user.orderDataShowItems)
    this.server.to(client.id).emit(`changeMyMainOrderDataLine${payload.serviceId}`, user ? user.orderDataShowItems : [])
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('changeMyName')
  async changeMyName(@ConnectedSocket() client: Socket, @MessageBody() payload: UpdateUserData, @Request() req: any): Promise<void> {
    const user = await this.userSevice.changeMyName(req.user._id.toString(), payload.newUserName)
    this.server.to(client.id).emit(`changeMyName${payload.serviceId}`, user ? user.name : '')
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('getServiceLocalUsers')
  async getServiceLocalUsers(@MessageBody() payload: GetServiceUsersDto, @ConnectedSocket() client: Socket): Promise<void> {
    const users = await this.userSevice.getServiceLocalUsers(payload.serviceId, payload.subServiceId)
    this.server.to(client.id).emit(`getServiceLocalUsers${payload.serviceId}`, users)
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('addStatusToUser')
  async addStatusToUser(@ConnectedSocket() client: Socket, @MessageBody() payload: AddStatusToUser): Promise<void> {
    console.log(payload)
    await this.userSevice.addStatusToUser(payload.email, payload.serviceId, payload.subServiceId, payload.status)
    const users = await this.userSevice.getServiceUsers(payload.serviceId)
    this.server.to(client.id).emit(`getServiceUsers${payload.serviceId}`, users)
    const users1 = await this.userSevice.getServiceLocalUsers(payload.serviceId, payload.subServiceId)
    this.server.to(client.id).emit(`getServiceLocalUsers${payload.serviceId}`, users1)
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('addDeviceToUser')
  async addDeviceToUser(@ConnectedSocket() client: Socket, @MessageBody() payload: AddDeviceToUser): Promise<void> {
    console.log(payload)
    await this.userSevice.addDeviceToUser(payload.email, payload.serviceId, payload.subServiceId, payload.device)
    const users = await this.userSevice.getServiceUsers(payload.serviceId)
    this.server.to(client.id).emit(`getServiceUsers${payload.serviceId}`, users)
    const users1 = await this.userSevice.getServiceLocalUsers(payload.serviceId, payload.subServiceId)
    this.server.to(client.id).emit(`getServiceLocalUsers${payload.serviceId}`, users1)
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('deleteUserFromService')
  async deleteUserFromService(@ConnectedSocket() client: Socket, @MessageBody() payload: DeleteServiceUser): Promise<void> {
    await this.userSevice.deleteUserFromService(payload.email, payload.serviceId)
    const users = await this.userSevice.getServiceUsers(payload.serviceId)
    this.server.to(client.id).emit(`getServiceUsers${payload.serviceId}`, users)
    const users1 = await this.userSevice.getServiceLocalUsers(payload.serviceId, payload.subServiceId)
    this.server.to(client.id).emit(`getServiceLocalUsers${payload.serviceId}`, users1)
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('getServiceUsers')
  async getServiceUsers(@MessageBody() payload: GetServiceUsersDto, @ConnectedSocket() client: Socket): Promise<void> {
    const users = await this.userSevice.getServiceUsers(payload.serviceId)
    this.server.to(client.id).emit(`getServiceUsers${payload.serviceId}`, users)
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('getUserRolesByUserId')
  async getUserRolesByUserId(@ConnectedSocket() client: Socket, @Request() req: any): Promise<void> {
    const roles = await this.userSevice.getUserRolesByUserId(req.user._id)
    this.server.to(client.id).emit('getUserRolesByUserId', roles.services_roles)
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('getUserByEmail')
  async getUsers(@ConnectedSocket() client: Socket, @MessageBody() reqestUserByEmailDto: ReqestUserByEmailDto): Promise<void> {
    const user = await this.userSevice.getUserByEmail(reqestUserByEmailDto.email)
    this.server.to(client.id).emit('getUserByEmail', user)
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('addRoleToUser')
  async addRoleToUser(@ConnectedSocket() client: Socket, @MessageBody() payload: UpdateUserRoleDto): Promise<void> {
    await this.userSevice.addRoleToUser(payload.email, payload.serviceId, payload.role, payload.subServiceId)
    const users = await this.userSevice.getServiceUsers(payload.serviceId)
    this.server.to(client.id).emit(`getServiceUsers${payload.serviceId}`, users)
    const users1 = await this.userSevice.getServiceLocalUsers(payload.serviceId, payload.subServiceId)
    this.server.to(client.id).emit(`getServiceLocalUsers${payload.serviceId}`, users1)
  }

}
