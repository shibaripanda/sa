import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from 'src/user/users.service'
import { User } from 'src/user/user.model'
import { lengs } from 'src/modules/lenguages/allText'
import { LengDataStart } from 'src/modules/lenguages/lengPackUpdate'
import { BotService } from 'src/bot/bot.service'
import axios from 'axios'
import { AuthDto } from './dto/Auth.dto'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private botService: BotService
    ){}

    async googleLogin(data: Pick<AuthDto, 'access_token'>, ip: string, local: object){
        
        const loginStatus = await this.verifyIdTokenGoogle(data)

        if(loginStatus){
            const user = await this.usersService.getUserByEmail(loginStatus.email.toLowerCase())
            if(!user){
                const newUser = await this.usersService.createUser(loginStatus.email.toLowerCase(), loginStatus.name ? loginStatus.name : '')
                return this.generateToken(newUser)
            }
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

    async upDemo(data: Pick<AuthDto, 'email' | 'demo'>){
        
        console.log(data)

        if(data.demo === 'demo'){
            const user = await this.usersService.getUserByEmail(data.email.toLowerCase())
            if(user){
                return this.generateToken(user)
            }
        }
        throw new UnauthorizedException({message: 'Error auth :-/'})
    }

    async demo(data: Pick<AuthDto, 'demo'>, ip: string, local: object){
        
        console.log(data)

        if(data.demo === 'demo'){
            // const user = await this.usersService.getUserByEmail(loginStatus.email.toLowerCase())
            // if(!user){
                const demoId = uuidv4()
                const newUser = await this.usersService.createUser(demoId + '@demo.demo', 'demouser_' + demoId.substring(0, 8))
                return this.generateToken(newUser)
            // }
            // if(user.telegramId){
            //     this.botService.sendCodeToBot(
            //         user.telegramId, 
            //         '⚠️ Login' + ' from IP: ' + ip + '\n\n' + Object.entries(local).filter(item => !['readme', 'bogon', 'ip'].includes(item[0])).map(item => item.join(': ') + '\n').join('')
            //     )
            // }
            // return this.generateToken(user)
        }

        throw new UnauthorizedException({message: 'Error auth :-/'})
    }

    async getTextPackFromServer(): Promise<{text: any ; lengPack: LengDataStart[]}>{
        return {text: global.appText, lengPack: lengs}
    }

    private async verifyIdTokenGoogle(data: Pick<AuthDto, 'access_token'>){

        const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {headers: { Authorization: `Bearer ${data.access_token}` },})
        .then(res => res.data);
        return userInfo
    }

    private async generateToken(user: User){
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