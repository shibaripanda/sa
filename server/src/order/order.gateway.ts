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
    private orderService: OrderService
  ) {}

  @WebSocketServer() server: Server

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('closePayOrderStatus')
  async closeOrderStatus(@ConnectedSocket() client: Socket, @MessageBody() payload: any, @Request() req: any): Promise<void> {
    console.log(payload)
    const order = await this.orderService.closePayOrderStatus(payload.serviceId, payload.subServiceId, payload.orderId, payload.order, payload.value, payload.accounId, req.user, req.service)
    if(order){
      this.server.in(client.id).emit('getOrders', order)
      this.server.to(client.id).emit('alert', {title: 'Order closed', message: 'Done ✅'})
      // client.to(payload.serviceId).emit('getOrders', order)
    }
    else{
      this.server.to(client.id).emit('alert', {title: '⚠️ Warning ⚠️', message: 'Error ❌'})
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('deleteOrderbyId')
  async deleteOrderbyId(@ConnectedSocket() client: Socket, @MessageBody() payload: any, @Request() req: any): Promise<void> {
    console.log(payload)
    const status = await this.orderService.deleteOrderbyId(payload.serviceId, payload.subServiceId, payload.orderId, req.user, req.service)
    console.log(status)
    if(status.deletedCount){
      this.server.in(client.id).emit('deleteOrderbyId', payload.orderId)
      this.server.to(client.id).emit('alert', {title: 'Order deleted', message: 'Done ✅'})
      // client.to(payload.serviceId).emit('deleteOrderbyId', payload.orderId)
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('getOrdersFilter')
  async getOrdersFilter(@ConnectedSocket() client: Socket, @MessageBody() payload: any, @Request() req: any): Promise<void> {
    console.log(payload)
    const orders = await this.orderService.getOrdersFilter(payload.serviceId, payload.subServiceId, payload.orderId, payload.exist, req.user, req.service)
    if(orders){
      for(const order of orders){
        this.server.to(client.id).emit('getOrders', order)
      }
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('updateOrderWork')
  async updateOrderWork(@ConnectedSocket() client: Socket, @MessageBody() payload: any, @Request() req: any): Promise<void> {
    console.log(payload)
    const order = await this.orderService.updateOrderWork(payload.serviceId, payload.subServiceId, payload.orderId, payload.work, req.user, req.service)
    if(order){
      this.server.in(payload.serviceId).emit('getOrders', order)
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('deleteAllWork')
  async deleteAllWork(@ConnectedSocket() client: Socket, @MessageBody() payload: any, @Request() req: any): Promise<void> {
    console.log(payload)
    const order = await this.orderService.deleteAllWork(payload.serviceId, payload.subServiceId, payload.orderId, payload.work, req.user, req.service)
    if(order){
      this.server.in(payload.serviceId).emit('getOrders', order)
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('deleteWork')
  async deleteWork(@ConnectedSocket() client: Socket, @MessageBody() payload: any, @Request() req: any): Promise<void> {
    console.log(payload)
    const order = await this.orderService.deleteWork(payload.serviceId, payload.subServiceId, payload.orderId, payload.work, req.user, req.service)
    if(order){
      this.server.in(payload.serviceId).emit('getOrders', order)
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('addNewWork')
  async addNewWork(@ConnectedSocket() client: Socket, @MessageBody() payload: any, @Request() req: any): Promise<void> {
    console.log(payload)
    const order = await this.orderService.addNewWork(payload.serviceId, payload.subServiceId, payload.orderId, payload.work, req.user, req.service)
    if(order){
      this.server.in(payload.serviceId).emit('getOrders', order)
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('addInformationOrder')
  async addInformationOrder(@ConnectedSocket() client: Socket, @MessageBody() payload: any, @Request() req: any): Promise<void> {
    console.log(payload)
    const order = await this.orderService.addInformationOrder(payload.serviceId, payload.subServiceId, payload.orderId, payload.data, req.user, req.service)
    if(order){
      this.server.in(payload.serviceId).emit('getOrders', order)
    } 
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('editOrderStatus')
  async editOrderStatus(@ConnectedSocket() client: Socket, @MessageBody() payload: any, @Request() req: any): Promise<void> {
    console.log(payload)
    const order = await this.orderService.editOrderStatus(payload.serviceId, payload.subServiceId, payload.orderId, payload.newStatus, req.user, req.service)
    if(order){
      this.server.in(payload.serviceId).emit('getOrders', order)
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('createOrder')
  async createOrder(@ConnectedSocket() client: Socket, @MessageBody() payload: any, @Request() req: any): Promise<void> {
    const order = await this.orderService.createOrder(payload.serviceId, payload.subServiceId, payload.newOrder, req.user, req.service)
    if(order){
      this.server.to(client.id).emit('createOrder', order)
      client.to(payload.serviceId).emit(`getNewOrder${payload.serviceId}`, order)
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('getOrdersCount')
  async getOrdersCount(@ConnectedSocket() client: Socket, @MessageBody() payload: any, @Request() req: any): Promise<void> {
    const orders = await this.orderService.getOrders(payload.serviceId, payload.subServiceId, payload.start, payload.end, req.user, req.service)
    for(const order of orders){
      this.server.to(client.id).emit('getOrders', order)
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('getOrder')
  async getOrder(@ConnectedSocket() client: Socket, @MessageBody() payload: any, @Request() req: any): Promise<void> {
    const order = await this.orderService.getOrder(payload.orderId, req.user, req.service)
    if(order){
      this.server.to(client.id).emit('getOrders', order)
    }
  }


}
