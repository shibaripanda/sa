import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common'
import { AuthService } from './auth.service'
// import { ReqestAuthDto } from './dto/request-auth.dto'
import { WSValidationPipe } from 'src/modules/wsPipeValid'
import { RequestGoogleLogin } from './dto/request-googleLogin.dto'

@Controller('/auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/googleLogin')
    @UsePipes(new WSValidationPipe())
    googleLogin(@Body() data: RequestGoogleLogin){
        console.log('/auth/googleLogin', data)
        return this.authService.googleLogin(data)
    }

    // @Post('/login')
    // login(@Body() data: ReqestAuthDto){
    //     console.log('/auth/login', data)
    //     return this.authService.login(data)
    // }

    @Get('/text')
    getTextPackFromServer(){
        console.log('/auth/text')
        return this.authService.getTextPackFromServer()
    }

}
