import { forwardRef, Module } from '@nestjs/common'
import { BotService } from './bot.service'
import { TelegrafModule } from 'nestjs-telegraf'
import { UsersModule } from 'src/user/users.module'
import { OrderModule } from 'src/order/orders.module'
import { ServicesModule } from 'src/service/services.module'
import { BotGateway } from './bot.gateway'
import { AuthModule } from 'src/auth/auth.module'
import { AppModule } from 'src/app/app.module'

@Module({
  imports: [
    TelegrafModule.forRoot({token: process.env.BOT_TOKEN}),
    forwardRef(() => AuthModule),
    UsersModule,
    ServicesModule,
    forwardRef(() => OrderModule),
    forwardRef(() => AppModule)
  ],
  providers: [BotService, BotGateway],
  exports: [BotService]
})
export class BotModule {}
