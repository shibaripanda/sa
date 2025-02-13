import { Injectable, CanActivate } from '@nestjs/common'
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host'
import { JwtService } from '@nestjs/jwt'
import { ServicesService } from 'src/service/services.service'
import { UsersService } from 'src/user/users.service'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private serviceSevice: ServicesService,
    private userService: UsersService
  ) {}

  async canActivate(context: ExecutionContextHost): Promise<boolean> {

    const req = context.switchToWs()
    console.log('- RoleGuard', req.getPattern())
    const token = req.getClient().handshake.auth.token.Authorization.split(' ')[1]
    const userEmail = this.jwtService.verify(token).email
    const user = await this.userService.getUserByEmail(userEmail)
    // const roles = (user.roles.filter(item => item.serviceId === req.getData().serviceId))[0].subServices.filter(item => item.subServiceId === req.getData().subServiceId)[0].roles
    const roles = (user.services_roles.filter(item => item.serviceId === req.getData().serviceId))[0].subServices.filter(item => item.subServiceId === req.getData().subServiceId)[0].roles
    
    const service = await this.serviceSevice.getServiceById(req.getData().serviceId)
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