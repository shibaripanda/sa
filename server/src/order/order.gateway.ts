import { Request, UseGuards, UsePipes } from '@nestjs/common'
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { WSValidationPipe } from 'src/modules/wsPipeValid'
import { RolesGuard } from 'src/auth/roles.guard'
import { OrderService } from './order.service'

@WebSocketGateway({cors:{origin:'*'}})

  export class OrdersGateway  {

  constructor(
    private orderService: OrderService,
    // private userSevice: UsersService
  ) {}

  @WebSocketServer() server: Server

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('createOrder')
  async createOrder(@ConnectedSocket() client: Socket, @MessageBody() payload: any, @Request() req: any): Promise<void> {
    const order = await this.orderService.createOrder(payload.serviceId, payload.subServiceId, payload.newOrder, req.user, req.service)
    client.emit('createOrder', order)
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('getOrdersCount')
  async getOrdersCount(@ConnectedSocket() client: Socket, @MessageBody() payload: any, @Request() req: any): Promise<void> {
    console.log(payload)

    const orders = await this.orderService.getOrders(payload.serviceId, req.user)
    // @ts-expect-error
    const res = orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(payload.start, payload.end)
    for(const order of res){
      client.emit('getOrders', order)
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('getOrders')
  async getOrders(@ConnectedSocket() client: Socket, @MessageBody() payload: any, @Request() req: any): Promise<void> {
    console.log(payload)

    const orders = await this.orderService.getOrders(payload.serviceId, req.user)
    // @ts-expect-error
    for(const order of orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))){
      client.emit('getOrders', order)
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('getOrder')
  async getOrder(@ConnectedSocket() client: Socket, @MessageBody() payload: any): Promise<void> {
    console.log(payload)

    await this.orderService.getOrder(payload)
    // const users = await this.userSevice.getServiceUsers(payload.serviceId)
    // this.server.to(client.id).emit(`getServiceUsers${payload.serviceId}`, users)
    // const users1 = await this.userSevice.getServiceLocalUsers(payload.serviceId, payload.subServiceId)
    // this.server.to(client.id).emit(`getServiceLocalUsers${payload.serviceId}`, users1)
  }


}
