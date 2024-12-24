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

@WebSocketGateway({cors:{origin:'*'}})
export class ServicesGateway {

  constructor(
      private serviceSevice: ServicesService
    ) {}

  @WebSocketServer() server: Server

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
    console.log('SEND')
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
