import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ServicesService } from 'src/service/services.service'
// import { Observable } from 'rxjs'
import { UsersService } from 'src/user/users.service'

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService,
        private userService: UsersService,
        private serviceSevice: ServicesService,
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean>  {
        const req = context.switchToHttp().getRequest()
        try{
            const authHeader = req.handshake.auth.token.Authorization
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]
            if(bearer !== 'Bearer' || !token){
                console.log('Авторизация false')
                throw new UnauthorizedException({message: 'Нет авторизации1'})
            }
            const userEmail = this.jwtService.verify(token).email
            req.user = await this.userService.getUserByEmail(userEmail)
            if(context.switchToWs().getData().serviceId){
               req.service = await this.serviceSevice.getServiceById(context.switchToWs().getData().serviceId) 
            }
            return true
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        catch(e){
            console.log('Авторизация (JwtAuthGuard) false')
            if(req.handshake.headers.upgrade !== 'websocket'){
               throw new UnauthorizedException({message: 'Нет авторизации2'}) 
            }
        }
    }

}