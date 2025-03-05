import { InjectBot } from 'nestjs-telegraf'
import { forwardRef, Inject } from '@nestjs/common'
import { Telegraf } from 'telegraf'
import { UsersService } from 'src/user/users.service'
import { OrderService } from 'src/order/order.service'
import { ServicesService } from 'src/service/services.service'
import { Service } from 'src/service/services.model'
import { User } from 'src/user/user.model'
  
  // @Update()
  // @Injectable()
  export class BotService {

    constructor(
        @InjectBot() private bot: Telegraf,
        private userService: UsersService,
        @Inject(forwardRef(() => OrderService))
        private orderService: OrderService,
        private serviceService: ServicesService
    ) {}

    async sendOrderToTelegram(orderId: string, serviceId: string, subServiceId: string, user: User, service: Service){
      const order = await this.orderService.getOrder(orderId, serviceId, subServiceId, user, service)
      if(order){
        this.newOrderTelegramMessage(user.telegramId, order)
        return true
      }
      return false
    }
    
    async getOrderPhotos(orderId: string, serviceId: string, subServiceId: string, user: object){
      const res = await this.orderService.getOrderPhotos(orderId, serviceId, subServiceId, user)
      if(res){
        const bufferArray: string[] = []
        for(const i of res._media_.filter(item => item.type === 'photo').map(item => item.media)){
          const url = await this.bot.telegram.getFileLink(i)
          const buffer: ArrayBuffer = await (await fetch(url.href)).arrayBuffer()
          bufferArray.push(Buffer.from(buffer).toString('base64')) 
        }
        return bufferArray
      }
      return false
    }

    async sendCodeToBot(telegramId: number, code: string){
      await this.bot.telegram.sendMessage(telegramId, code, {parse_mode: 'HTML'}).catch(error => console.log(error))
    }

    async testTelegram(telegramId: number){
      await this.bot.telegram.sendMessage(telegramId, 'Connected! ✅', {parse_mode: 'HTML'}).catch(error => console.log(error))
    }

    async start(telegramId, payload){
      const user = await this.userService.getUserById(payload.split('getactivcode')[1])
      if(user.activCodeTelegram.code === payload.split('getactivcode')[0] && Date.now() - user.activCodeTelegram.time < 300000){
        await this.userService.setTelegramId(user._id, telegramId)
        return true
      }
      else{
        return false
      }
    }
      
    async addNewOrderImages(telegramId, photo){
      const res = await this.userService.addNewOrderImages(telegramId, {type: 'photo', media: photo})
      if(res){
        const url = await this.bot.telegram.getFileLink(photo)
        const buffer = await (await fetch(url.href)).arrayBuffer()
        return Buffer.from(buffer).toString('base64')
      }
      return false
    }

    async newOrderTelegramMessage(telegramId, order){
        const text =
          order._orderServiceId_ + '\n'  
        // + order.title + ' ' 
        // + order.firm + ' ' 
        // + order.model + '\n' 
        // + order.problem + '\n' 
        // + order.info + '\n' 
        // + order.clientTel + '\n'
        // + order.manager + '\n' 
        // + new Date(order.date).toLocaleDateString()
        
        if(order._media_.length){
          order._media_[0] = {...order._media_[0], caption: text, parse_mode: 'HTML'}
          await this.bot.telegram.sendMediaGroup(telegramId, order._media_).catch(error => console.log(error))
        }
        else{
          await this.bot.telegram.sendMessage(telegramId, text, {parse_mode: 'HTML'}).catch(error => console.log(error))
        }

    }  
  }
