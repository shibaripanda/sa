import { Injectable, CanActivate, Inject, forwardRef } from '@nestjs/common'
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host'
import { JwtService } from '@nestjs/jwt'
import { WsException } from '@nestjs/websockets'
import { AppErrors } from 'src/app/app.model'
import { AppService } from 'src/app/app.service'
import { canUse } from 'src/modules/canUse'
import { ServicesService } from 'src/service/services.service'
import { UsersService } from 'src/user/users.service'
import { ObjectId }  from 'mongodb'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private serviceSevice: ServicesService,
    private userService: UsersService,
    @Inject(forwardRef(() => AppService))
    private appService: AppService,
  ) {}

  async canActivate(context: ExecutionContextHost): Promise<boolean> {
    
    try{
      const req = context.switchToWs()
      console.log('- RoleGuard', req.getPattern())
      const token = req.getClient().handshake.auth.token.Authorization.split(' ')[1]
      const userEmail = this.jwtService.verify(token).email
      const user = await this.userService.getUserByEmail(userEmail)
      const roles = (user.services_roles.filter(item => item.serviceId === req.getData().serviceId))[0].subServices.filter(item => item.subServiceId === req.getData().subServiceId)[0].roles
      const service = await this.serviceSevice.getServiceById(req.getData().serviceId)
      if(roles.includes('owner') && service.owner.toString() === user._id.toString()){
        return true
      }
      const activPatterns = [...new Set(service.roles.filter(item => roles.includes(item.role)).map(item => item.access).flat())]
      if(activPatterns.includes(req.getPattern()) || canUse.includes(req.getPattern())){
        return true
      }
      console.log('Авторизация (RolesGuard) false')
      throw new WsException({message: 'Server authorization error', data: '1'})
    }
    catch(error){
      console.log(error)
      const indexError = new ObjectId().toString()
      const appError: AppErrors = {
          error: error ? error : undefined,
          time: new Date(Date.now()),
          serviceId: 'RoleGuard',
          userId: 'RoleGuard',
          indexError: indexError
      }
      await this.appService.addAppError(appError)
      throw new WsException({message: 'Server authorization error', indexError: indexError, action: 'exit'})
    }
  }
}