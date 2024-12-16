import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { ServicesService } from './services.service'
import { Server, Socket } from 'socket.io'
import { Request, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { RolesGuard } from 'src/auth/roles.guard'

@WebSocketGateway({cors:{origin:'*'}, namespace: 'service'})
export class ServicesGateway {

  constructor(
      private serviceSevice: ServicesService
    ) {}

  @WebSocketServer() server: Server

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
    @SubscribeMessage('createNewService')
    async createNewService(@MessageBody() payload: any, @Request() req: any): Promise<void> {
      await this.serviceSevice.createNewService({name: payload.name, owner: req.user._id})
    }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage('getServicesByOwnerId')
  async getServicesByOwnerId(@ConnectedSocket() client: Socket, @Request() req: any): Promise<any> {
    const services = await this.serviceSevice.getServicesByOwnerId(req.user._id)
    this.server.to(client.id).emit('getServicesByOwnerId', services)
  }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage('getServiceById')
  async getServiceById(@ConnectedSocket() client: Socket, @MessageBody() payload: any,): Promise<any> {
    const service = await this.serviceSevice.getServiceById(payload.serviceId)
    this.server.to(client.id).emit('getServiceById', service)
  }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage('editDevicesList')
  async editDevicesList(@MessageBody() payload: any): Promise<any> {
    await this.serviceSevice.editDevicesList(payload.serviceId, payload.device)
  }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage('editStatusList')
  async editStatusList(@MessageBody() payload: any): Promise<any> {
    await this.serviceSevice.editStatusList(payload.serviceId, payload.status)
  }
}
