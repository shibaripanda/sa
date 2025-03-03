import {
    Ctx,
    InjectBot,
    // Help,
    Hears,
  } from 'nestjs-telegraf'
import { forwardRef, Inject } from '@nestjs/common'
import { Telegraf } from 'telegraf'
import { UsersService } from 'src/user/users.service'
import { OrderService } from 'src/order/order.service'
import { ServicesService } from 'src/service/services.service'
  
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
  
    // @Help()
    // async help(@Ctx() ctx: TelegrafContext) {
    //   await ctx.reply('Send me a sticker');
    // }
  
    @Hears('hi')
    async hears(@Ctx() ctx: any) {
      await ctx.reply('Hey there');
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
