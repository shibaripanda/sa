import { Module, forwardRef } from '@nestjs/common'
import { AuthModule } from 'src/auth/auth.module'
import { MongooseModule } from '@nestjs/mongoose'
import { OrderSchema } from './order.model'
import { OrderService } from './order.service'
import { OrdersGateway } from './order.gateway'
import { UsersModule } from 'src/user/users.module'
import { ServicesModule } from 'src/service/services.module'
import { BotModule } from 'src/bot/bot.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
    ServicesModule,
    forwardRef(() => BotModule),
    forwardRef(() => UsersModule), 
    forwardRef(() => AuthModule),
    // forwardRef(() => BotModule)
  ],
  providers: [OrderService, OrdersGateway],
  exports: [OrderService]
})
export class OrderModule {}
