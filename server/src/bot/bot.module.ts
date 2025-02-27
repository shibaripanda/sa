import { Module } from '@nestjs/common'
import { BotService } from './bot.service'
import { TelegrafModule } from 'nestjs-telegraf'
import { UsersModule } from 'src/user/users.module'
import { OrderModule } from 'src/order/orders.module'
import { ServicesModule } from 'src/service/services.module'

@Module({
  imports: [
    TelegrafModule.forRoot({token: process.env.BOT_TOKEN}),
    UsersModule,
    ServicesModule,
    OrderModule,
  ],
  providers: [BotService],
  exports: [BotService]
})
export class BotModule {}
