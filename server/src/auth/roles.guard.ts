import { Injectable, CanActivate } from '@nestjs/common'
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host'
import { JwtService } from '@nestjs/jwt'
import { ServicesService } from 'src/service/services.service'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private serviceSevice: ServicesService
  ) {}

  async canActivate(context: ExecutionContextHost): Promise<boolean> {

    const req = context.switchToWs()
    // const authHeader = req.handshake.auth.token.Authorization
    // const token = req.getClient().handshake.headers.token.split(' ')[1]
    const token = req.getClient().handshake.auth.token.Authorization.split(' ')[1]
    const user = this.jwtService.verify(token)
    // const roles = user.roles.find(item => item.serviceId === req.getData().serviceId).roles
    // const service = await this.serviceSevice.getServiceById(req.getData().serviceId)
    // console.log(req.getData())
    const roles = (user.roles.filter(item => item.serviceId === req.getData().serviceId))[0].subServices.filter(item => item.subServiceId === req.getData().subServiceId)[0].roles
    // console.log(roles)
    const service = await this.serviceSevice.getServiceById(req.getData().serviceId)
    // console.log(service.roles)
    if(roles.includes('owner') && service.owner.toString() === user._id.toString()){
      return true
    }
    const activPatterns = [...new Set(service.roles.filter(item => roles.includes(item.role)).map(item => item.access).flat())]
    if(activPatterns.includes(req.getPattern())){
      return true
    }
    console.log('Авторизация (RolesGuard) false')
    // throw new UnauthorizedException({message: 'Нет авторизации3'})
    return false
  }
}