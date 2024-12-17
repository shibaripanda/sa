import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from 'mongoose'
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

    async getUserById(_id: ObjectId){
        return await this.userMongo.findOne({_id: _id})
    }

    async addRoleToUser(email: string, serviceId: ObjectId, role: string){
        const user = await this.userMongo.findOne({email: email})
        if(!user) await this.createUser(email, Math.round(Math.random() * (9999 - 1000) + 1000), Date.now())
        const roles = (await this.userMongo.findOne({email: email})).services_roles.find(item => String(item.serviceId) === String(serviceId))
        if(roles){
            if(roles.roles.includes(role)){
                await this.userMongo.updateOne(
                    {email: email}, 
                    {$pull: {'services_roles.$[el].roles': role}}, 
                    {arrayFilters: [{'el.serviceId': serviceId}]}
                )
            }
            else{
                await this.userMongo.updateOne(
                    {email: email}, 
                    {$addToSet: {'services_roles.$[el].roles': role}},
                    {arrayFilters: [{'el.serviceId': serviceId}]}
                )
            }
        }
        else{
            await this.userMongo.updateOne({email: email}, {$addToSet: {services_roles: {serviceId: serviceId, roles: [role]}}})
        }
    }

}
