import { Body, Controller, Get, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { ReqestAuthDto } from './dto/request-auth.dto'

@Controller('/auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/login')
    login(@Body() data: ReqestAuthDto){
        console.log('/auth/login', data)
        return this.authService.login(data)
    }

    @Get('/text')
    getTextPackFromServer(){
        console.log('/auth/text')
        return this.authService.getTextPackFromServer()
    }

}
