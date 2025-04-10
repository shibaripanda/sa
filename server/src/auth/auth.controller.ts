import { Body, Controller, Get, Ip, Post, Req, UsePipes } from '@nestjs/common'
import { AuthService } from './auth.service'
import { WSValidationPipe } from 'src/modules/wsPipeValid'
import { HttpService } from '@nestjs/axios'
import { lastValueFrom } from 'rxjs';
import { AuthDto } from './dto/Auth.dto'

@Controller('/auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/demo')
    @UsePipes(new WSValidationPipe())
    async demo(@Body() data: Pick<AuthDto, 'demo'>, @Ip() ip: string){
        console.log(ip, data)
        const local = await lastValueFrom(new HttpService().get(`https://ipinfo.io/${ip}/json`))
        return this.authService.demo(data, ip, local.data)
    }

    @Post('/updemo')
    @UsePipes(new WSValidationPipe())
    async updemo(@Body() data: Pick<AuthDto, 'email' | 'demo'>){
        // const local = await lastValueFrom(new HttpService().get(`https://ipinfo.io/${ip}/json`))
        return this.authService.upDemo(data)
    }

    @Post('/googleLogin')
    @UsePipes(new WSValidationPipe())
    async googleLogin(@Body() data: Pick<AuthDto, 'access_token'>, @Req() req: any, @Ip() ip: any){
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
