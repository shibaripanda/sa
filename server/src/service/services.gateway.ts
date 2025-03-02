import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { ServicesService } from './services.service'
import { Server, Socket } from 'socket.io'
import { Request, UseGuards, UsePipes } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
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
import { DeleteServiceDto } from './dto/DeleteServiceDto.dto'
import { ChangeServiceOrderDataDto } from './dto/ChangeServiceOrderDataDto.dto'
import { EditOrderDataDto } from './dto/EditOrderDataDto.dto'
import { ReplaceOrderDataDto } from './dto/ReplaceOrderDataDto.dto'
import { EditVariantDto } from './dto/EditVariantDto.dto'
import { ChangeServiceDataDto } from './dto/ChangeServiceDataDto.dto'
import { ChangeServiceColorStatusDto } from './dto/ChangeServiceColorStatusDto.dto'

@WebSocketGateway({cors:{origin:'*'}})
export class ServicesGateway {

  constructor(
      private serviceSevice: ServicesService
    ) {}

  @WebSocketServer() server: Server

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('updateCurrency')
  async updateCurrency(@ConnectedSocket() client: Socket, @MessageBody() payload: any): Promise<void> {
    const service = await this.serviceSevice.updateCurrency(payload.serviceId, payload.newCurrency)
    if(service){
      this.server.in(payload.serviceId).emit(`getServiceById${payload.serviceId}`, service)
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('updateDocument')
  async updateDocument(@ConnectedSocket() client: Socket, @MessageBody() payload: any): Promise<void> {
    const service = await this.serviceSevice.updateDocument(payload.serviceId, payload.docName, payload.newDoc)
    if(service){
      this.server.in(payload.serviceId).emit(`getServiceById${payload.serviceId}`, service)
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('replaceStatusPosition')
  async replaceStatusPosition(@ConnectedSocket() client: Socket, @MessageBody() payload: ReplaceOrderDataDto): Promise<void> {
    const service = await this.serviceSevice.replaceStatusPosition(payload.serviceId, payload.index1, payload.index2)
    if(service){
      this.server.in(payload.serviceId).emit(`getServiceById${payload.serviceId}`, service)
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('changeColorStatus')
  async changeColorStatus(@ConnectedSocket() client: Socket, @MessageBody() payload: ChangeServiceColorStatusDto): Promise<void> {
    const service = await this.serviceSevice.changeColorStatus(payload.serviceId, payload.status, payload.color)
    if(service){
      this.server.in(payload.serviceId).emit(`getServiceById${payload.serviceId}`, service)
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('changeFeeService')
  async changeFeeService(@ConnectedSocket() client: Socket, @MessageBody() payload: any): Promise<void> {
    console.log(payload.serviceId, payload.fee)
    const service = await this.serviceSevice.changeFeeService(payload.serviceId, payload.fee)
    if(service){
      this.server.in(payload.serviceId).emit(`getServiceById${payload.serviceId}`, service)
    } 
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('changeInfoMainService')
  async changeInfoMainService(@ConnectedSocket() client: Socket, @MessageBody() payload: ChangeServiceDataDto): Promise<void> {
    const service = await this.serviceSevice.changeInfoMainService(payload.serviceId, payload.newData)
    if(service){
      this.server.in(payload.serviceId).emit(`getServiceById${payload.serviceId}`, service)
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('addOrDelListVariant')
  async addOrDelListVariant(@ConnectedSocket() client: Socket, @MessageBody() payload: EditVariantDto): Promise<void> {
    const service = await this.serviceSevice.addOrDelListVariant(payload.serviceId, payload.item, payload.variant)
    if(service){
      this.server.in(payload.serviceId).emit(`getServiceById${payload.serviceId}`, service)
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('replaceOrderDataItems')
  async replaceOrderDataItems(@ConnectedSocket() client: Socket, @MessageBody() payload: ReplaceOrderDataDto): Promise<void> {
    const service = await this.serviceSevice.replaceOrderDataItems(payload.serviceId, payload.index1, payload.index2)
    if(service){
      this.server.in(payload.serviceId).emit(`getServiceById${payload.serviceId}`, service)
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('orderDataEdit')
  async orderDataEdit(@ConnectedSocket() client: Socket, @MessageBody() payload: EditOrderDataDto): Promise<void> {
    const service = await this.serviceSevice.orderDataEdit(payload.serviceId, payload.item, payload.data, payload.newValue)
    if(service){
      this.server.in(payload.serviceId).emit(`getServiceById${payload.serviceId}`, service)
    }
  }
  
  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('changeServiceOrderDataList')
  async changeServiceOrderDataList(@ConnectedSocket() client: Socket, @MessageBody() payload: ChangeServiceOrderDataDto): Promise<void> {
    const service = await this.serviceSevice.changeServiceOrderDataList(payload.serviceId, payload.newOrderData)
    if(service){
      this.server.in(payload.serviceId).emit(`getServiceById${payload.serviceId}`, service)
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('deleteService')
  async deleteService(@MessageBody() payload: DeleteServiceDto, @ConnectedSocket() client: Socket,): Promise<void> {
    const res = await this.serviceSevice.deleteService(payload.serviceId) 
    if(res) client.emit(`deleteService${payload.serviceId}`, 'done')
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('changeTimeSubService')
  async changeSubServiceTime(@ConnectedSocket() client: Socket, @MessageBody() payload: ChangeSubServiceDataDto): Promise<void> {
    const service = await this.serviceSevice.changeSubServiceData(
      payload.serviceId, 
      payload.subServiceId, 
      payload.workTime ? payload.workTime : payload.contact ? payload.contact : payload.address ? payload.address: '',
      payload.data)
    if(service){
      this.server.in(payload.serviceId).emit(`getServiceById${payload.serviceId}`, service)
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('changeContactSubService')
  async changeSubServiceContact(@ConnectedSocket() client: Socket, @MessageBody() payload: ChangeSubServiceDataDto): Promise<void> {
    const service = await this.serviceSevice.changeSubServiceData(
      payload.serviceId, 
      payload.subServiceId, 
      payload.workTime ? payload.workTime : payload.contact ? payload.contact : payload.address ? payload.address: '',
      payload.data)
    if(service){
      this.server.in(payload.serviceId).emit(`getServiceById${payload.serviceId}`, service)
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('changeAddressSubService')
  async changeSubServiceAddress(@ConnectedSocket() client: Socket, @MessageBody() payload: ChangeSubServiceDataDto): Promise<void> {
    const service = await this.serviceSevice.changeSubServiceData(
      payload.serviceId, 
      payload.subServiceId, 
      payload.workTime ? payload.workTime : payload.contact ? payload.contact : payload.address ? payload.address: '',
      payload.data)
    if(service){
      this.server.in(payload.serviceId).emit(`getServiceById${payload.serviceId}`, service)
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('changeLocalService')
  async changeLocalService(@ConnectedSocket() client: Socket, @MessageBody() payload: ChangeServiceLocalDto): Promise<void> {
    const service = await this.serviceSevice.changeLocalService(payload.serviceId, payload.subServiceIdDeleteOrNew)
    if(service){
      this.server.in(payload.serviceId).emit(`getServiceById${payload.serviceId}`, service)
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('addNewServiceRole')
  async addNewServiceRole(@ConnectedSocket() client: Socket, @MessageBody() payload: AddServiceRoleDto): Promise<void> {
    const service = await this.serviceSevice.addNewServiceRole(payload.serviceId, payload.newRole)
    if(service){
      this.server.in(payload.serviceId).emit(`getServiceById${payload.serviceId}`, service)
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('changeServiceRole')
  async changeServiceRole(@ConnectedSocket() client: Socket, @MessageBody() payload: ChangeServiceRoleDto): Promise<void> {
    const service = await this.serviceSevice.changeServiceRole(payload.serviceId, payload.role, payload.access)
    if(service){
      this.server.in(payload.serviceId).emit(`getServiceById${payload.serviceId}`, service)
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('changeServiceStatusList')
  async changeServiceStatusList(@ConnectedSocket() client: Socket, @MessageBody() payload: ChangeServiceStatusDto): Promise<void> {
    const service = await this.serviceSevice.changeServiceStatusList(payload.serviceId, payload.status[0].toUpperCase() + payload.status.slice(1, payload.status.length).toLowerCase())
    if(service){
      this.server.in(payload.serviceId).emit(`getServiceById${payload.serviceId}`, service)
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('changeServiceDeviceList')
  async changeServiceDeviceList(@ConnectedSocket() client: Socket, @MessageBody() payload: ChangeServiceDeviceDto): Promise<void> {
    const service = await this.serviceSevice.changeServiceDeviceList(payload.serviceId, payload.device[0].toUpperCase() + payload.device.slice(1, payload.device.length).toLowerCase())
    if(service){
      this.server.in(payload.serviceId).emit(`getServiceById${payload.serviceId}`, service)
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('changeNameSubService')
  async changeNameSubService(@ConnectedSocket() client: Socket, @MessageBody() payload: ChangeServiceNameDto): Promise<void> {
    const service = await this.serviceSevice.changeNameSubService(payload.serviceId, payload.subServiceId, payload.newName)
    if(service){
      this.server.in(payload.serviceId).emit(`getServiceById${payload.serviceId}`, service)
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('changeNameMainService')
  async changeNameMainService(@ConnectedSocket() client: Socket, @MessageBody() payload: ChangeServiceNameDto): Promise<void> {
    const service = await this.serviceSevice.changeNameMainService(payload.serviceId, payload.newName)
    if(service){
      this.server.in(payload.serviceId).emit(`getServiceById${payload.serviceId}`, service)
    }
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
  async getServiceById(@ConnectedSocket() client: Socket, @MessageBody() payload: GetServiceByIdDto, @Request() reg: any): Promise<any> {
    console.log('Gateway getServiceById')
    client.join(payload.serviceId)
    this.server.to(client.id).emit(`getServiceById${payload.serviceId}`, reg.service)
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
