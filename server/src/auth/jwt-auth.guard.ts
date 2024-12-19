import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Observable } from 'rxjs'

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        // console.log(req.handshake.headers.token)
        try{
            const authHeader = req.handshake.headers.token
            // const authHeader = req.handshake.auth.token.Authorization
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]
            if(bearer !== 'Bearer' || !token){
                console.log('Авторизация false')
                throw new UnauthorizedException({message: 'Нет авторизации1'})
            }
            const user = this.jwtService.verify(token)
            // console.log(user)
            req.user = user
            // console.log('Авторизация true')
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