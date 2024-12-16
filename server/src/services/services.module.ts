import { Module } from '@nestjs/common'
import { ServicesService } from './services.service'
import { ServicesGateway } from './services.gateway'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from 'src/auth/auth.module'
import { ServiceSchema } from './services.model'
import { UsersModule } from 'src/user/users.module'

@Module({
  imports: [
      MongooseModule.forFeature([{ name: 'Service', schema: ServiceSchema }]),
      AuthModule, UsersModule
    ],
  providers: [ServicesService, ServicesGateway],
  exports: [ServicesService]
})
export class ServicesModule {}
