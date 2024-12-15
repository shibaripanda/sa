import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from './user.model'

@Injectable()
export class UsersService {

    constructor(
        @InjectModel('User') private userMongo: Model<User>) {}


    async newCodeCreate(email: string, code: number, time: number){
        await this.userMongo.updateOne({email: email}, {authCode: {code: code, time: time}})
    }

    async createUser(email: string, code: number, time: number){
        await this.userMongo.create({email: email, authCode: {code: code, time: time}})
    }

    async getUserByEmail(email: string){
        return await this.userMongo.findOne({email: email})
    }

}
