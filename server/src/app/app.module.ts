import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MongooseModule } from '@nestjs/mongoose'
import { AppSchema } from './app.model'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'App', schema: AppSchema }]),
    MongooseModule.forRoot(process.env.MONGO_TOKEN)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
