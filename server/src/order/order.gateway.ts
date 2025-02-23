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
  @SubscribeMessage('updateOrderWork')
  async updateOrderWork(@ConnectedSocket() client: Socket, @MessageBody() payload: any, @Request() req: any): Promise<void> {
    console.log(payload)
    const order = await this.orderService.updateOrderWork(payload.serviceId, payload.subServiceId, payload.orderId, payload.work, req.user, req.service)
    if(order) client.emit('getOrders', order)
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('deleteAllWork')
  async deleteAllWork(@ConnectedSocket() client: Socket, @MessageBody() payload: any, @Request() req: any): Promise<void> {
    console.log(payload)
    const order = await this.orderService.deleteAllWork(payload.serviceId, payload.subServiceId, payload.orderId, payload.work, req.user, req.service)
    if(order) client.emit('getOrders', order)
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('deleteWork')
  async deleteWork(@ConnectedSocket() client: Socket, @MessageBody() payload: any, @Request() req: any): Promise<void> {
    console.log(payload)
    const order = await this.orderService.deleteWork(payload.serviceId, payload.subServiceId, payload.orderId, payload.work, req.user, req.service)
    if(order) client.emit('getOrders', order)
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('addNewWork')
  async addNewWork(@ConnectedSocket() client: Socket, @MessageBody() payload: any, @Request() req: any): Promise<void> {
    console.log(payload)
    const order = await this.orderService.addNewWork(payload.serviceId, payload.subServiceId, payload.orderId, payload.work, req.user, req.service)
    if(order) client.emit('getOrders', order)
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('addInformationOrder')
  async addInformationOrder(@ConnectedSocket() client: Socket, @MessageBody() payload: any, @Request() req: any): Promise<void> {
    console.log(payload)
    const order = await this.orderService.addInformationOrder(payload.serviceId, payload.subServiceId, payload.orderId, payload.data, req.user, req.service)
    if(order) client.emit('getOrders', order)
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('editOrderStatus')
  async editOrderStatus(@ConnectedSocket() client: Socket, @MessageBody() payload: any, @Request() req: any): Promise<void> {
    console.log(payload)
    const order = await this.orderService.editOrderStatus(payload.serviceId, payload.subServiceId, payload.orderId, payload.newStatus, req.user, req.service)
    if(order) client.emit('getOrders', order)
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('createOrder')
  async createOrder(@ConnectedSocket() client: Socket, @MessageBody() payload: any, @Request() req: any): Promise<void> {
    const order = await this.orderService.createOrder(payload.serviceId, payload.subServiceId, payload.newOrder, req.user, req.service)
    client.emit('createOrder', order)
    this.server.to(payload.serviceId).emit('getOrders', order)
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('getOrdersCount')
  async getOrdersCount(@ConnectedSocket() client: Socket, @MessageBody() payload: any, @Request() req: any): Promise<void> {
    // console.log(payload)
    const orders = await this.orderService.getOrders(payload.serviceId, payload.subServiceId, payload.start, payload.end, req.user, req.service)
    // const res = orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(payload.start, payload.end)
    for(const order of orders){
      client.emit('getOrders', order)
    }
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(RolesGuard)
  // @UsePipes(new WSValidationPipe())
  // @SubscribeMessage('getOrders')
  // async getOrders(@ConnectedSocket() client: Socket, @MessageBody() payload: any, @Request() req: any): Promise<void> {
  //   console.log(payload)

  //   const orders = await this.orderService.getOrders(payload.serviceId, req.user, req.service)
  //   // @ts-expect-error
  //   for(const order of orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))){
  //     client.emit('getOrders', order)
  //   }
  // }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('getOrder')
  async getOrder(@ConnectedSocket() client: Socket, @MessageBody() payload: any): Promise<void> {
    const order = await this.orderService.getOrder(payload.orderId)
    if(order) client.emit('getOrders', order)
  }


}
