import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from 'src/user/users.service'
import { ReqestAuthDto } from './dto/request-auth.dto'
import { User } from 'src/user/user.model'
// import { sendEmail } from 'src/modules/sendMail'

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService){}

    async login(data: ReqestAuthDto){
        console.log(data)
        const user = await this.usersService.getUserByEmail(data.email)
        // const textCode = global.appText.newCode[data.leng] ? global.appText.newCode[data.leng] : global.appText.newCode.en
        const newCode = Math.round(Math.random() * (9999 - 1000) + 1000)
        // const newCode = 5555

        if(user && data.authCode && user.authCode && user.authCode.code === data.authCode && user.authCode.time + 300000 > Date.now()){
            return this.generateToken(user)
        }
        if(!user) await this.usersService.createUser(data.email, newCode, Date.now())
        else await this.usersService.newCodeCreate(data.email, newCode, Date.now())
        // await sendEmail(data.email, textCode, newCode)
        throw new UnauthorizedException({message: global.appText.codeSendToEmail[data.leng] ? global.appText.codeSendToEmail[data.leng] : global.appText.codeSendToEmail.en})
    }

    private async generateToken(user: User){
        const payload = {email: user.email}
        return {
            token: this.jwtService.sign(payload)
        }
    }

}