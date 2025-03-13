import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from 'src/user/users.service'
import { User } from 'src/user/user.model'
import { lengs } from 'src/modules/lenguages/allText'
import { LengDataStart } from 'src/modules/lenguages/lengPackUpdate'
import { BotService } from 'src/bot/bot.service'
import { RequestGoogleLogin } from './dto/request-googleLogin.dto'
// import { OAuth2Client } from 'google-auth-library'
import axios from 'axios'

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private botService: BotService
    ){}

    async googleLogin(data: RequestGoogleLogin){
        
        const loginStatus = await this.verifyIdTokenGoogle(data)

        if(loginStatus){
            const user = await this.usersService.getUserByEmail(loginStatus.email.toLowerCase())
            const newCode = Math.round(Math.random() * (9999 - 1000) + 1000)
            if(!user){
                const newUser = await this.usersService.createUser(loginStatus.email.toLowerCase(), loginStatus.name ? loginStatus.name : '')
                return this.generateToken(newUser)
            }
            if(user.telegramId && user.passwordToTelegram){
                this.botService.sendCodeToBot(user.telegramId, newCode.toString())
            }
            return this.generateToken(user)
        }

        throw new UnauthorizedException({message: 'Error auth :-/'})
    }

    // async login(data: ReqestAuthDto){
    //     console.log(data)
    //     const user = await this.usersService.getUserByEmail(data.email.toLowerCase())
    //     let newCode: number
    //     let textCode: string
    //     if(process.env.MODE === 'prod'){
    //         textCode = global.appText.newCode[data.leng] ? global.appText.newCode[data.leng] : global.appText.newCode.en
    //         newCode = Math.round(Math.random() * (9999 - 1000) + 1000)
    //     }
    //     else{
    //         newCode = Number(process.env.DEVMODEPASSWORD)
    //     }

    //     console.log(Number(process.env.TIMEFORAUTH))

    //     if(user && data.authCode && user.authCode && user.authCode.code === data.authCode && user.authCode.time + Number(process.env.TIMEFORAUTH) > Date.now()){
    //         return this.generateToken(user)
    //     }
    //     if(!user) await this.usersService.createUser(data.email.toLowerCase(), newCode, Date.now())
    //     else await this.usersService.newCodeCreate(data.email.toLowerCase(), newCode, Date.now())
    //     if(process.env.MODE === 'prod'){
    //         if(user.telegramId && user.passwordToTelegram){
    //             this.botService.sendCodeToBot(user.telegramId, newCode.toString())
    //         }
    //         else{
    //           await sendEmail(data.email.toLowerCase(), textCode, newCode.toString())  
    //         }
    //     }
    //     throw new UnauthorizedException({message: global.appText.codeSendToEmail[data.leng] ? global.appText.codeSendToEmail[data.leng] : global.appText.codeSendToEmail.en})
    // }

    async getTextPackFromServer(): Promise<{text: any ; lengPack: LengDataStart[]}>{
        return {text: global.appText, lengPack: lengs}
    }

    private async verifyIdTokenGoogle(data: RequestGoogleLogin){

        const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {headers: { Authorization: `Bearer ${data.access_token}` },})
        .then(res => res.data);

        console.log(userInfo)
    

        // const client = new OAuth2Client(data.clientId)
        // const client = new OAuth2Client(token)

        // if(client){
        //     const 
            
        //     const ticket = await client.verifyIdToken({
        //         idToken: data.credential,
        //         audience: data.clientId,
        //     })
        //     const payload = ticket.getPayload()
        //     console.log(payload)
        //     return payload
        // }
        return userInfo
    }

    private async generateToken(user: User){
        console.log('3')
        const payload = {
            email: user.email, 
            _id: user._id, 
            roles: user.services_roles, 
            name: user.name ? user.name : false, 
            orderDataShowItems: user.orderDataShowItems,
            telegramId: user.telegramId,
            passwordToTelegram: user.passwordToTelegram
        }
        return {
            token: this.jwtService.sign(payload)
        }
    }

}