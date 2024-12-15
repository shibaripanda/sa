import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { App, NewLengPack } from './app.model'
import { getLenguagesFromAI } from 'src/lenguages/lengPackUpdate'
import { lengs, textArray } from 'src/lenguages/allText'

@Injectable()

export class AppService {

  constructor(
    @InjectModel('App') private appMongo: Model<App>) {}

  async onApplicationBootstrap() {
    global.appText = await this.updateAppText()
  }

  async getText(): Promise<NewLengPack>{
    const app = await this.appMongo.findOne({mainServerAppSettings: 'mainServerAppSettings'}, {text: 1, _id: 0})
    return app.text
  }
  async getMainServerAppSettings(){
    return await this.appMongo.findOneAndUpdate({mainServerAppSettings: 'mainServerAppSettings'}, {$inc: {restartCount: 1}}, {upsert: true, returnDocument: 'after'})
  }
  async updateAppText(){
    const app = await this.getMainServerAppSettings()
    const newAppText = await getLenguagesFromAI(false, textArray, lengs, app.text)
    if(JSON.stringify(app.text) !== JSON.stringify(newAppText)){
      await this.appMongo.findOneAndUpdate({mainServerAppSettings: 'mainServerAppSettings'}, {text: newAppText})
      console.log('Текс обновлен')
    }
    else{
      console.log('Текст не требует обновления')
    }
    return this.getText()
  }
  
}