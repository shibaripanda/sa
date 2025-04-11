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

    async deleteImage(userId: string, image: string){
      const res = await this.userService.deleteImage(userId, image)
      if(res){
        const bufferArray: {buffer: string, media: string}[] = []
        for(const i of res.newOrderImages.filter(item => item.type === 'photo').map(item => item.media)){
          const url = await this.bot.telegram.getFileLink(i)
          const buffer: ArrayBuffer = await (await fetch(url.href)).arrayBuffer()
          bufferArray.push({buffer: Buffer.from(buffer).toString('base64'), media: i}) 
        }
        return bufferArray
      }
      return false
    }

    async getNewOrderImages(userId: string){
      const res = await this.userService.getNewOrderImages(userId)
      if(res){
        const bufferArray: {buffer: string, media: string}[] = []
        for(const i of res.newOrderImages.filter(item => item.type === 'photo').map(item => item.media)){
          const url = await this.bot.telegram.getFileLink(i)
          const buffer: ArrayBuffer = await (await fetch(url.href)).arrayBuffer()
          bufferArray.push({buffer: Buffer.from(buffer).toString('base64'), media: i}) 
        }
        return bufferArray
      }
      return false
    }

    async sendOrderToTelegram(orderId: string, serviceId: string, subServiceId: string, user: User, service: Service){
      const order = await this.orderService.getOrder(orderId, user, service)
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
      const exist = await this.userService.getUserByTelegramId(telegramId)
      if(exist.length){
        for(const user of exist){
          console.log(user.email)
          await this.userService.setTelegramId(user._id, 0)
        }
      }
      const user = await this.userService.getUserById(payload.split('getactivcode')[1])
      if(user.activCodeTelegram.code === payload.split('getactivcode')[0] && Date.now() - user.activCodeTelegram.time < 300000){
        await this.userService.setTelegramId(user._id, telegramId)
        return {userId: user._id.toString(), res: true}
      }
      else{
        return {userId: user._id.toString(), res: false}
      }
    }
      
    async addNewOrderImages(telegramId, photo){
      const res = await this.userService.addNewOrderImages(telegramId, {type: 'photo', media: photo})
      if(res){
        const url = await this.bot.telegram.getFileLink(photo)
        const buffer = await (await fetch(url.href)).arrayBuffer()
        return {one: Buffer.from(buffer).toString('base64'), second: await this.getNewOrderImages(res._id)}
      }
      return false
    }

    async newOrderTelegramMessage(telegramId, order){
      const obj = {...order._doc}
      const orderInfo = Object.entries(obj).filter(item => !['_status_', '_manager_', '_subService_', 'createdAt', 'updatedAt', '_DeviceBlocked_', '_media_', '_id', '__v', '_subServiceId_', '_serviceId_', '_orderServiceId_', '_history_', '_information_', '_work_'].includes(item[0])).map(item => item.join(':\n') + '\n').join('')
      // console.log(order)
      const text = obj._orderServiceId_ + ' | ' + obj._DeviceBlocked_ + ' | ' + obj._status_ + '\n' +  obj._subService_ + ' | ' + obj.createdAt.toDateString() + '\n' + obj._manager_ +  '\n--------------------\n' + orderInfo
        if(order._media_.length){
          order._media_[0] = {...order._media_[0], caption: text, parse_mode: 'HTML'}
          await this.bot.telegram.sendMediaGroup(telegramId, order._media_).catch(error => console.log(error))
        }
        else{
          await this.bot.telegram.sendMessage(telegramId, text, {parse_mode: 'HTML'}).catch(error => console.log(error))
        }

    }  
  }
