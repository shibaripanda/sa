import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MongooseModule } from '@nestjs/mongoose'
import { AppSchema } from './app.model'
import { AuthModule } from 'src/auth/auth.module'
import { ServicesModule } from 'src/services/services.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'App', schema: AppSchema }]),
    MongooseModule.forRoot(process.env.MONGO_TOKEN),
    AuthModule,
    ServicesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
