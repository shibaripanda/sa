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
import { UpdateUserFilter } from './dto/UpdateUserFilter.dto'

@WebSocketGateway({cors:{origin:'*'}})

  export class UserGateway  {

  constructor(
    private userSevice: UsersService
  ) {}

  @WebSocketServer() server: Server 

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('editUserFilter')
  async editUserFilter(@ConnectedSocket() client: Socket, @MessageBody() payload: UpdateUserFilter, @Request() req: any): Promise<void> {
    console.log(payload)
    const userRoles = await this.userSevice.editUserFilter(payload.serviceId, payload.subServiceId, payload.filter, payload.item, req.user)
    console.log(userRoles.services_roles.find(item => item.serviceId === payload.serviceId).subServices.find(item => item.subServiceId === payload.subServiceId))
    // if(user){
    //   this.server.to(client.id).emit('getNewOrderImages', [])
    // }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('deleteAllImage')
  async deleteAllImage(@ConnectedSocket() client: Socket, @MessageBody() payload: any, @Request() req: any): Promise<void> {
    const user = await this.userSevice.deleteAllImage(req.user._id)
    if(user){
      this.server.to(client.id).emit('getNewOrderImages', [])
    }
  }

 
  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('disconectTelegram')
  async disconectTelegram(@ConnectedSocket() client: Socket, @MessageBody() payload: any, @Request() req: any): Promise<void> {
    const user = await this.userSevice.disconectTelegram(req.user._id)
    if(user){
      this.server.to(client.id).emit('alert', {title: 'Telegram', message: 'Telegram disconnected'})
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('changeAuthTelegram')
  async changeAuthTelegram(@ConnectedSocket() client: Socket, @MessageBody() payload: any, @Request() req: any): Promise<void> {
    const user = await this.userSevice.changeAuthTelegram(req.user._id, payload.passwordToTelegram)
    if(user){
      this.server.to(client.id).emit('alert', {title: 'Password to', message: payload.passwordToTelegram ? 'Telegram' : 'Email'})
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('getTelegramPass')
  async getTelegramPass(@ConnectedSocket() client: Socket, @Request() req: any): Promise<void> {
    const code = await this.userSevice.getTelegramPass(req.user._id)
    if(code){
      this.server.to(client.id).emit('alert', {title: 'Connecting Telegram Link', message: 'Click to connect', telegramCode: code})
    }
  }

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
