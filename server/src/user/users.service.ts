import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from 'mongoose'
import { User } from './user.model'
import { UpdateUserRole } from './dto/requestRoleToUser'

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

    async getUserById(_id: ObjectId){
        return await this.userMongo.findOne({_id: _id})
    }

    async addRoleToUser(payload: UpdateUserRole){
        const user = await this.userMongo.findOne({email: payload.email})
        if(!user) await this.createUser(payload.email, Math.round(Math.random() * (9999 - 1000) + 1000), Date.now())
        const roles = (await this.userMongo.findOne({email: payload.email})).services_roles.find(item => String(item.serviceId) === String(payload.serviceId))
        if(roles){
            if(roles.roles.includes(payload.role)){
                await this.userMongo.updateOne(
                    {email: payload.email}, 
                    {$pull: {'services_roles.$[el].roles': payload.role}}, 
                    {arrayFilters: [{'el.serviceId': payload.serviceId}]}
                )
            }
            else{
                await this.userMongo.updateOne(
                    {email: payload.email}, 
                    {$addToSet: {'services_roles.$[el].roles': payload.role}},
                    {arrayFilters: [{'el.serviceId': payload.serviceId}]}
                )
            }
        }
        else{
            await this.userMongo.updateOne({email: payload.email}, {$addToSet: {services_roles: {serviceId: payload.serviceId, roles: [payload.role]}}})
        }
    }

}
