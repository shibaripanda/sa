import { forwardRef, Module } from '@nestjs/common'
import { ServicesService } from './services.service'
import { ServicesGateway } from './services.gateway'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from 'src/auth/auth.module'
import { ServiceSchema } from './services.model'
import { UsersModule } from 'src/user/users.module'
import { AppModule } from 'src/app/app.module'

@Module({
  imports: [
      MongooseModule.forFeature([{ name: 'Service', schema: ServiceSchema }]),
      forwardRef(() => UsersModule),
      forwardRef(() => AuthModule),
      forwardRef(() => AppModule)
    ],
  providers: [ServicesService, ServicesGateway],
  exports: [ServicesService]
})
export class ServicesModule {}
