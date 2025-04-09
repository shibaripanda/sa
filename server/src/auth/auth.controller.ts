import { Body, Controller, Get, Ip, Post, Req, UsePipes } from '@nestjs/common'
import { AuthService } from './auth.service'
// import { ReqestAuthDto } from './dto/request-auth.dto'
import { WSValidationPipe } from 'src/modules/wsPipeValid'
import { RequestGoogleLogin } from './dto/request-googleLogin.dto'
import { HttpService } from '@nestjs/axios'
import { lastValueFrom } from 'rxjs';

@Controller('/auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/demo')
    @UsePipes(new WSValidationPipe())
    async demo(@Body() data: {demo: string}, @Ip() ip: string){
        const local = await lastValueFrom(new HttpService().get(`https://ipinfo.io/${ip}/json`))
        console.log(local, data)
        // return this.authService.demo(data, ip, local.data)
    }

    @Post('/googleLogin')
    @UsePipes(new WSValidationPipe())
    async googleLogin(@Body() data: RequestGoogleLogin, @Req() req: any, @Ip() ip: any){
        const local = await lastValueFrom(new HttpService().get(`https://ipinfo.io/${ip}/json`))
        return this.authService.googleLogin(data, ip, local.data)
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
