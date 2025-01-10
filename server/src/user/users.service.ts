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

    async getServiceLocalUsers(serviceId: string, subServiceId: string){
        const users = await this.userMongo.find({services_roles: {$elemMatch: {serviceId: serviceId}}}, {email: 1, services_roles: 1, name: 1})
        if(users){
            for(const i of users){
                i.services_roles = i.services_roles.filter(item => item.serviceId === serviceId)
                for(const a of i.services_roles){
                    a.subServices = a.subServices.filter(item => item.subServiceId === subServiceId)
                }
            }
            const res = users
            .filter(s => !s.services_roles.map(s1 => s1.subServices).flat().map(s3 => s3.roles).flat().includes('owner'))
            .filter(s => s.services_roles[0].subServices.length)
            .filter(s => s.services_roles[0].subServices[0].roles.length)


            return res 
        }
        return []
    }

    async addStatusToUser(email: string, serviceId: string, subServiceId: string, status: string){
        const roles = (await this.userMongo.findOne({email: email})).services_roles.find(item => item.serviceId.toString() === serviceId)
        if(roles){
            const subServ = roles.subServices.find(item => item.subServiceId === subServiceId)
            if(subServ){
                if(subServ.statuses.includes(status)){
                    console.log('1')
                    await this.userMongo.updateOne(
                        {email: email}, 
                        {$pull: {"services_roles.$[el].subServices.$[al].statuses": status}}, 
                        {arrayFilters: [{"el.serviceId": serviceId}, {"al.subServiceId": subServiceId}]}
                    )
                }
                else{
                    console.log('2')
                    await this.userMongo.updateOne(
                        {email: email}, 
                        {$addToSet: {"services_roles.$[el].subServices.$[elem].statuses": status}}, 
                        {arrayFilters: [{"el.serviceId": serviceId}, {"elem.subServiceId": subServiceId}]}
                    )
                }
            }
        }
    }

    async addDeviceToUser(email: string, serviceId: string, subServiceId: string, device: string){
        const roles = (await this.userMongo.findOne({email: email})).services_roles.find(item => item.serviceId.toString() === serviceId)
        if(roles){
            const subServ = roles.subServices.find(item => item.subServiceId === subServiceId)
            if(subServ){
                if(subServ.devices.includes(device)){
                    console.log('1')
                    await this.userMongo.updateOne(
                        {email: email}, 
                        {$pull: {"services_roles.$[el].subServices.$[al].devices": device}}, 
                        {arrayFilters: [{"el.serviceId": serviceId}, {"al.subServiceId": subServiceId}]}
                    )
                }
                else{
                    console.log('2')
                    await this.userMongo.updateOne(
                        {email: email}, 
                        {$addToSet: {"services_roles.$[el].subServices.$[elem].devices": device}}, 
                        {arrayFilters: [{"el.serviceId": serviceId}, {"elem.subServiceId": subServiceId}]}
                    )
                }
            }
        }
    }

    async deleteUserFromService(email: string, serviceId: string){
        await this.userMongo.updateOne({email: email}, {$pull: {services_roles: {serviceId: serviceId}}})
    }

    async getServiceUsers(serviceId: string){
        const users = await this.userMongo.find({services_roles: {$elemMatch: {serviceId: serviceId}}}, {email: 1, services_roles: 1, name: 1})
        if(users){
            for(const i of users){
                i.services_roles = i.services_roles.filter(item => item.serviceId === serviceId)
            }
            return users.filter(s => !s.services_roles.map(s1 => s1.subServices).flat().map(s3 => s3.roles).flat().includes('owner'))
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
        // const newService = await this.serviceMongo.getServiceById(serviceId)

        if(!user) await this.createUser(email, Math.round(Math.random() * (9999 - 1000) + 1000), Date.now())
        const roles = (await this.userMongo.findOne({email: email})).services_roles.find(item => item.serviceId.toString() === serviceId)
        if(roles){
            
            const subServ = roles.subServices.find(item => item.subServiceId === subServiceId)
            if(subServ){
                if(subServ.roles.includes(role)){
                    await this.userMongo.updateOne(
                        {email: email}, 
                        {$pull: {"services_roles.$[el].subServices.$[al].roles": role}}, 
                        {arrayFilters: [{"el.serviceId": serviceId}, {"al.subServiceId": subServiceId}]}
                    )
                }
                else{
                    await this.userMongo.updateOne(
                        {email: email}, 
                        {$addToSet: {"services_roles.$[el].subServices.$[elem].roles": role}}, 
                        {arrayFilters: [{"el.serviceId": serviceId}, {"elem.subServiceId": subServiceId}]}
                    )
                }
            }
            else{
                await this.userMongo.updateOne(
                    {email: email}, 
                    {$addToSet: {'services_roles.$[el].subServices': {
                        roles: [role], 
                        subServiceId: subServiceId,
                        statuses: [],
                        devices: [] 
                    }}},
                    {arrayFilters: [{'el.serviceId': serviceId}]}
                )
            }
        }
        else{
            await this.userMongo.updateOne(
                {email: email}, 
                {$addToSet: 
                    {services_roles: 
                        {serviceId: serviceId, subServices: [{
                            roles: [role], 
                            subServiceId: subServiceId,
                            statuses: [],
                            devices: [] 
                        }]}}})
        }
    }

}
