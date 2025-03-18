import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from 'src/user/users.service'
import { User } from 'src/user/user.model'
import { lengs } from 'src/modules/lenguages/allText'
import { LengDataStart } from 'src/modules/lenguages/lengPackUpdate'
import { BotService } from 'src/bot/bot.service'
import { RequestGoogleLogin } from './dto/request-googleLogin.dto'
import axios from 'axios'

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private botService: BotService
    ){}

    async googleLogin(data: RequestGoogleLogin, ip: string, local: object){
        
        const loginStatus = await this.verifyIdTokenGoogle(data)

        if(loginStatus){
            const user = await this.usersService.getUserByEmail(loginStatus.email.toLowerCase())
            // const newCode = Math.round(Math.random() * (9999 - 1000) + 1000)
            if(!user){
                const newUser = await this.usersService.createUser(loginStatus.email.toLowerCase(), loginStatus.name ? loginStatus.name : '')
                return this.generateToken(newUser)
            }
            console.log(user.telegramId, user.passwordToTelegram)
            if(user.telegramId){
                this.botService.sendCodeToBot(
                    user.telegramId, 
                    '⚠️ Login' + ' from IP: ' + ip + '\n\n' + Object.entries(local).filter(item => !['readme', 'bogon', 'ip'].includes(item[0])).map(item => item.join(': ') + '\n').join('')
                )
            }
            return this.generateToken(user)
        }

        throw new UnauthorizedException({message: 'Error auth :-/'})
    }

    async getTextPackFromServer(): Promise<{text: any ; lengPack: LengDataStart[]}>{
        return {text: global.appText, lengPack: lengs}
    }

    private async verifyIdTokenGoogle(data: RequestGoogleLogin){

        const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {headers: { Authorization: `Bearer ${data.access_token}` },})
        .then(res => res.data);
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
            passwordToTelegram: user.passwordToTelegram,
            newOrderImages: user.newOrderImages
        }
        return {
            token: this.jwtService.sign(payload)
        }
    }

}