import { CanActivate, ExecutionContext, forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { WsException } from '@nestjs/websockets'
import { ServicesService } from 'src/service/services.service'
import { UsersService } from 'src/user/users.service'
import { ObjectId }  from 'mongodb'
import { AppErrors } from 'src/app/app.model'
import { AppService } from 'src/app/app.service'

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService,
        private userService: UsersService,
        private serviceSevice: ServicesService,
        @Inject(forwardRef(() => AppService))
        private appService: AppService,
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean>  {
        const req = context.switchToHttp().getRequest()
        try{
            const authHeader = req.handshake.auth.token.Authorization
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]
            if(bearer !== 'Bearer' || !token){
                console.log('Авторизация false')
                if(req.handshake.headers.upgrade !== 'websocket'){
                    throw new UnauthorizedException({message: 'Server authorization error', data: '3'}) 
                }
                throw new WsException({message: 'Server authorization error', data: ''})
            }
            const userEmail = this.jwtService.verify(token).email
            req.user = await this.userService.getUserByEmail(userEmail)
            if(context.switchToWs().getData().serviceId){
                const users = await this.userService.getLocalUsers(context.switchToWs().getData().serviceId, context.switchToWs().getData().subServiceId)
                const service = await this.serviceSevice.getServiceById(context.switchToWs().getData().serviceId)
                service.localUsers = users
                req.service = service
            }
            return true
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        catch(error){
            const indexError = new ObjectId().toString()
            const appError: AppErrors = {
                error: error ? error : undefined,
                time: new Date(Date.now()),
                serviceId: 'JWTAUTH',
                userId: 'JWTAUTH',
                indexError: indexError
            }
            await this.appService.addAppError(appError)
            if(req.handshake.headers.upgrade !== 'websocket'){
               throw new UnauthorizedException({message: 'Server authorization error', indexError: indexError}) 
            }
            throw new WsException({message: 'Server authorization error', indexError: indexError})
        }
    }

}