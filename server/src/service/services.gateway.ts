import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { ServicesService } from './services.service'
import { Server, Socket } from 'socket.io'
import { Request, UseGuards, UsePipes } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
// import { RolesGuard } from 'src/auth/roles.guard'
import { CreateServiceDto } from './dto/CreateServiceDto.dto'
import { WSValidationPipe } from 'src/modules/wsPipeValid'
import { RolesGuard } from 'src/auth/roles.guard'
import { EditStatusServiceDto } from './dto/EditStatusServiceDto.dto'
import { EditDeviceServiceDto } from './dto/EditDeviceServiceDto.dto'
import { GetServiceByIdDto } from './dto/GetServiceByIdDto.dto'
import { ChangeServiceNameDto } from './dto/ChangeServiceNameDto.dto'
import { ChangeServiceDeviceDto } from './dto/ChangeServiceDeviceDto.dto'
import { ChangeServiceStatusDto } from './dto/ChangeServiceStatusDto.dto'
import { ChangeServiceRoleDto } from './dto/ChangeServiceRoleDto.dto'
import { AddServiceRoleDto } from './dto/AddServiceRoleDto.dto'
import { ChangeServiceLocalDto } from './dto/ChangeServiceLocalDto.dto'
import { ChangeSubServiceDataDto } from './dto/ChangeSubServiceDataDto.dto'

@WebSocketGateway({cors:{origin:'*'}})
export class ServicesGateway {

  constructor(
      private serviceSevice: ServicesService
    ) {}

  @WebSocketServer() server: Server 

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('changeTimeSubService')
  async changeSubServiceTime(@MessageBody() payload: ChangeSubServiceDataDto, @ConnectedSocket() client: Socket,): Promise<void> {
    const service = await this.serviceSevice.changeSubServiceData(
      payload.serviceId, 
      payload.subServiceId, 
      payload.workTime ? payload.workTime : payload.contact ? payload.contact : payload.address ? payload.address: '',
      payload.data) 
    this.server.to(client.id).emit(`getServiceById${payload.serviceId}`, service)
  }

  @SubscribeMessage('changeContactSubService')
  async changeSubServiceContact(@MessageBody() payload: ChangeSubServiceDataDto, @ConnectedSocket() client: Socket,): Promise<void> {
    const service = await this.serviceSevice.changeSubServiceData(
      payload.serviceId, 
      payload.subServiceId, 
      payload.workTime ? payload.workTime : payload.contact ? payload.contact : payload.address ? payload.address: '',
      payload.data)
    this.server.to(client.id).emit(`getServiceById${payload.serviceId}`, service)
  }

  @SubscribeMessage('changeAddressSubService')
  async changeSubServiceAddress(@MessageBody() payload: ChangeSubServiceDataDto, @ConnectedSocket() client: Socket,): Promise<void> {
    const service = await this.serviceSevice.changeSubServiceData(
      payload.serviceId, 
      payload.subServiceId, 
      payload.workTime ? payload.workTime : payload.contact ? payload.contact : payload.address ? payload.address: '',
      payload.data)
    this.server.to(client.id).emit(`getServiceById${payload.serviceId}`, service)
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('changeLocalService')
  async changeLocalService(@MessageBody() payload: ChangeServiceLocalDto, @ConnectedSocket() client: Socket,): Promise<void> {
    const service = await this.serviceSevice.changeLocalService(payload.serviceId, payload.subServiceIdDeleteOrNew)
    this.server.to(client.id).emit(`getServiceById${payload.serviceId}`, service)
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('addNewServiceRole')
  async addNewServiceRole(@MessageBody() payload: AddServiceRoleDto, @ConnectedSocket() client: Socket,): Promise<void> {
    const service = await this.serviceSevice.addNewServiceRole(payload.serviceId, payload.newRole)
    this.server.to(client.id).emit(`getServiceById${payload.serviceId}`, service)
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('changeServiceRole')
  async changeServiceRole(@MessageBody() payload: ChangeServiceRoleDto, @ConnectedSocket() client: Socket,): Promise<void> {
    const service = await this.serviceSevice.changeServiceRole(payload.serviceId, payload.role, payload.access)
    this.server.to(client.id).emit(`getServiceById${payload.serviceId}`, service)
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('changeServiceStatusList')
  async changeServiceStatusList(@MessageBody() payload: ChangeServiceStatusDto, @ConnectedSocket() client: Socket,): Promise<void> {
    const service = await this.serviceSevice.changeServiceStatusList(payload.serviceId, payload.status[0].toUpperCase() + payload.status.slice(1, payload.status.length).toLowerCase())
    this.server.to(client.id).emit(`getServiceById${payload.serviceId}`, service)
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('changeServiceDeviceList')
  async changeServiceDeviceList(@MessageBody() payload: ChangeServiceDeviceDto, @ConnectedSocket() client: Socket,): Promise<void> {
    const service = await this.serviceSevice.changeServiceDeviceList(payload.serviceId, payload.device[0].toUpperCase() + payload.device.slice(1, payload.device.length).toLowerCase())
    this.server.to(client.id).emit(`getServiceById${payload.serviceId}`, service)
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('changeNameSubService')
  async changeNameSubService(@MessageBody() payload: ChangeServiceNameDto, @ConnectedSocket() client: Socket,): Promise<void> {
    const service = await this.serviceSevice.changeNameSubService(payload.serviceId, payload.subServiceId, payload.newName)
    this.server.to(client.id).emit(`getServiceById${payload.serviceId}`, service)
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('changeNameMainService')
  async changeNameMainService(@MessageBody() payload: ChangeServiceNameDto, @ConnectedSocket() client: Socket,): Promise<void> {
    const service = await this.serviceSevice.changeNameMainService(payload.serviceId, payload.newName)
    this.server.to(client.id).emit(`getServiceById${payload.serviceId}`, service)
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('createNewService')
  async createNewService(@MessageBody() payload: CreateServiceDto, @Request() req: any): Promise<void> {
    await this.serviceSevice.createNewService(payload.name, req.user._id, req.user.email)
  }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage('getServicesByOwnerId')
  async getServicesByOwnerId(@ConnectedSocket() client: Socket, @Request() req: any): Promise<any> {
    const services = await this.serviceSevice.getServicesByOwnerId(req.user._id)
    this.server.to(client.id).emit('getServicesByOwnerId', services)
  }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage('getServiceById')
  async getServiceById(@ConnectedSocket() client: Socket, @MessageBody() payload: GetServiceByIdDto): Promise<any> {
    const service = await this.serviceSevice.getServiceById(payload.serviceId)
    // console.log('SEND')
    this.server.to(client.id).emit(`getServiceById${payload.serviceId}`, service)
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('editDevicesList')
  async editDevicesList(@MessageBody() payload: EditDeviceServiceDto): Promise<any> {
    await this.serviceSevice.editDevicesList(payload.serviceId, payload.device)
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('editStatusList')
  async editStatusList(@MessageBody() payload: EditStatusServiceDto): Promise<any> {
    await this.serviceSevice.editStatusList(payload.serviceId, payload.status)
  }
}
