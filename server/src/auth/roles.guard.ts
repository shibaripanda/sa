import { Injectable, CanActivate, UnauthorizedException } from '@nestjs/common'
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host'
import { JwtService } from '@nestjs/jwt'
import { ServicesService } from 'src/services/services.service'
import { UsersService } from 'src/user/users.service'

// export interface WsArgumentsHost {
//     /**
//      * Returns the data object.
//      */
//     getData<T>(): T;
//     /**
//      * Returns the client object.
//      */
//     getClient<T>(): T;
//   }

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userSevice: UsersService,
    private serviceSevice: ServicesService
  ) {}

  async canActivate(context: ExecutionContextHost): Promise<boolean> {

    const req = context.switchToWs()
    const token = req.getClient().handshake.headers.token.split(' ')[1]
    const user = this.jwtService.verify(token)
    const userFromMongo = (await this.userSevice.getUserById(user._id)).services_roles.find(item => String(item.serviceId) === req.getData().serviceId)
    console.log(userFromMongo.roles)
    console.log(req.getData().serviceId)
    const serviceRoles = await this.serviceSevice.getServiceById(req.getData().serviceId)
    console.log(serviceRoles)


    
    // console.log(req.getData())
    // console.log(req.getPattern())

    console.log('Авторизация role false')
    throw new UnauthorizedException({message: 'Нет авторизации3'})

  }
}