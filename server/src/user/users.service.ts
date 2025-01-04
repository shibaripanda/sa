import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from './user.model'
import { ServicesService } from 'src/service/services.service'

@Injectable()
export class UsersService {

    constructor(
        @InjectModel('User') 
        private userMongo: Model<User>,            
        private serviceMongo: ServicesService
    ) {}


    async getServiceUsers(serviceId: string){
        const users = await this.userMongo.find({services_roles: {$elemMatch: {serviceId: serviceId}}}, {email: 1, services_roles: 1, name: 1})
        if(users){
            for(const i of users){
                i.services_roles = i.services_roles.filter(item => item.serviceId === serviceId)
            }
            return users
        }
        return []
    }

    async getUserRolesByUserId(_id: string){
        return (await this.userMongo.findOne({_id: _id}, {services_roles: 1}))
    }

    async newCodeCreate(email: string, code: number, time: number){
        await this.userMongo.updateOne({email: email}, {authCode: {code: code, time: time}})
    }

    async createUser(email: string, code: number, time: number){
        await this.userMongo.create({email: email, authCode: {code: code, time: time}})
    }

    async getUserByEmail(email: string){
        return await this.userMongo.findOne({email: email})
    }

    async getUserById(_id){
        return await this.userMongo.findOne({_id: _id})
    }

    async addRoleToUser(email: string, serviceId: string, role: string, subServiceId: string){
        const user = await this.userMongo.findOne({email: email})
        const newService = await this.serviceMongo.getServiceById(serviceId)

        if(!user) await this.createUser(email, Math.round(Math.random() * (9999 - 1000) + 1000), Date.now())
        const roles = (await this.userMongo.findOne({email: email})).services_roles.find(item => item.serviceId.toString() === newService._id.toString())
        if(roles){
            
            const subServ = roles.subServices.find(item => item.subServiceId === subServiceId)
            if(subServ){
                if(subServ.roles.includes(role)){
                    console.log('1')
                    await this.userMongo.updateOne(
                        {email: email}, 
                        {$pull: {'services_roles.$[el].subServices.$[al].roles': role}}, 
                        {arrayFilters: [{'el.serviceId': newService._id.toString()}, {'al.subServiceId': subServiceId}]}
                    )
                }
                else{
                    console.log('2')
                    await this.userMongo.updateOne(
                        {email: email}, 
                        {$addToSet: {'services_roles.$[el].subServices.$[al].roles': role}}, 
                        {arrayFilters: [{'el.serviceId': newService._id.toString()}, {'al.subServiceId': subServiceId}], new: true }
                    )
                }
            }
            else{
                await this.userMongo.updateOne(
                    {email: email}, 
                    {$addToSet: {'services_roles.$[el].subServices': {
                        roles: [role], 
                        subServiceId: subServiceId,
                        statuses: newService.statuses,
                        devices: newService.devices 
                    }}},
                    {arrayFilters: [{'el.serviceId': newService._id.toString()}]}
                )
            }
        }
        else{
            await this.userMongo.updateOne(
                {email: email}, 
                {$addToSet: 
                    {services_roles: 
                        {serviceId: newService._id.toString(), subServices: [{
                            roles: [role], 
                            subServiceId: subServiceId,
                            statuses: newService.statuses,
                            devices: newService.devices 
                        }]}}})
        }
    }

}
