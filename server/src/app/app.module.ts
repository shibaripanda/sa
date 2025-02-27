import { Module } from '@nestjs/common'
import { AppService } from './app.service'
import { MongooseModule } from '@nestjs/mongoose'
import { AppSchema } from './app.model'
import { AuthModule } from 'src/auth/auth.module'
import { ServicesModule } from 'src/service/services.module'
import { UsersModule } from 'src/user/users.module'
import { AppGateway } from './app.gateway'
import { OrderModule } from 'src/order/orders.module'
import { BotModule } from 'src/bot/bot.module'

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_TOKEN),
    MongooseModule.forFeature([{ name: 'App', schema: AppSchema }]),
    AuthModule,
    ServicesModule,
    UsersModule,
    OrderModule,
    BotModule
  ],
  providers: [AppService, AppGateway],
})
export class AppModule {}
