import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from './user.model'
import { rendomNumberOrder } from 'src/order/tech/rendomNumberOrder'
import { rendomLetteOrder } from 'src/order/tech/rendomLetteOrder'
// import { sendEmail } from 'src/modules/sendMail'
import { Server } from 'socket.io'
import { WebSocketServer } from '@nestjs/websockets'

@Injectable()
export class UsersService {

    constructor(
        @InjectModel('User') 
        private userMongo: Model<User>
    ) {}

    @WebSocketServer() server: Server

    async deleteImage(_id: string, image: string){
        return await this.userMongo.findOneAndUpdate({_id: _id}, {$pull: {newOrderImages: {media: image, type: 'photo'}}}, {returnDocument: 'after'})
    }

    async deleteAllImage(_id: string){
        return await this.userMongo.updateOne({_id: _id}, {newOrderImages: []})
    }
    
    async disconectTelegram(_id: string){
        return await this.userMongo.updateOne({_id: _id}, {telegramId: 0, passwordToTelegram: false})
    }

    async changeAuthTelegram(userId: string, passwordToTelegram: boolean){
        return await this.userMongo.updateOne({_id: userId}, {passwordToTelegram: passwordToTelegram})
    }

    async getNewOrderImages(_id: string){
        return await this.userMongo.findOne({_id: _id}, {newOrderImages: 1, _id: 0})
    }

    async addNewOrderImages(telegramId: number, photo: object){
        return await this.userMongo.findOneAndUpdate({telegramId: telegramId}, {$push: {newOrderImages: {$each: [photo], $position: 0, $slice: 10}}}, {returnDocument: 'after'})
    }
    async setTelegramId(_id: string, telegramId: string){
        await this.userMongo.updateOne({_id: _id}, {telegramId: telegramId})
    }
    async getTelegramPass(_id: string){
        const activCode = rendomNumberOrder({min: 1000, max: 9999}) + rendomLetteOrder() + rendomNumberOrder({min: 1000, max: 9999})
        const user = await this.userMongo.findOneAndUpdate({_id: _id}, {activCodeTelegram: {code: activCode.toLowerCase(), time: Date.now()}}, {returnDocument: 'after'})
        return user.activCodeTelegram.code
    }
    async changeDataOrderList(serviceId: string, data: string, status: boolean, user: any, index1: number, index2: number, action: string){
        const res = await this.userMongo.findOne({_id: user._id}, {orderDataShowItems: 1, _id: 0})
        if(!res.orderDataShowItems.find(item => item.serviceId === serviceId)){
            await this.userMongo.updateOne({_id: user._id}, {$addToSet: {orderDataShowItems: {serviceId: serviceId, data: []}}})
        }
        if(action === 'addDelete'){
            if(status){
            return await this.userMongo.findOneAndUpdate({_id: user._id}, {$addToSet: {'orderDataShowItems.$[el].data': data}}, {arrayFilters: [{'el.serviceId': serviceId}] ,returnDocument: 'after'}) 
            }
            return await this.userMongo.findOneAndUpdate({_id: user._id}, {$pull: {'orderDataShowItems.$[el].data': data}}, {arrayFilters: [{'el.serviceId': serviceId}] ,returnDocument: 'after'})
        }
        else if(action === 'replace'){
            const item = (await this.userMongo.findOne({_id: user._id}, {orderDataShowItems: 1, _id: 0})).orderDataShowItems.find(item => item.serviceId === serviceId).data[index1]
            console.log(item)
            if(item){
                // await this.userMongo.updateOne({_id: user._id}, {$pull: {orderDataShowItems: item}})
                await this.userMongo.findOneAndUpdate({_id: user._id}, {$pull: {'orderDataShowItems.$[el].data': item}}, {arrayFilters: [{'el.serviceId': serviceId}] ,returnDocument: 'after'})
                // return await this.userMongo.findOneAndUpdate({_id: user._id}, {$push: {orderDataShowItems: {$each: [item], $position: index2}}}, {returnDocument: 'after'})
                return await this.userMongo.findOneAndUpdate({_id: user._id}, {$push: {'orderDataShowItems.$[el].data': {$each: [item], $position: index2}}}, {arrayFilters: [{'el.serviceId': serviceId}] ,returnDocument: 'after'})
            }
            return await this.userMongo.findOne({_id: user._id})
        }
    }
    async deleteServiceFromUsers(serviceId: string){
        return await this.userMongo.updateMany({services_roles: {$elemMatch: {serviceId: serviceId}}}, 
            {$pull: {services_roles: {serviceId: serviceId}}}
        )
    }
    async changeMyName(_id: string, newUserName: string){
        if(newUserName){
           return await this.userMongo.findOneAndUpdate({_id: _id}, {name: newUserName}, {returnDocument: 'after'}) 
        }
        return await this.userMongo.findOne({_id: _id})
    }
    async getLocalUsers(serviceId: string, subServiceId: string){
        const users = await this.userMongo.find({services_roles: {$elemMatch: {serviceId: serviceId}}}, {email: 1, services_roles: 1, name: 1})
        if(users){
            for(const i of users){
                i.services_roles = i.services_roles.filter(item => item.serviceId === serviceId)
                for(const a of i.services_roles){
                    a.subServices = a.subServices.filter(item => item.subServiceId === subServiceId)
                }
            }
            const res = users.map(item => ({ name: item.name, email: item.email, id: item._id.toString()}))
            return res 
        }
        return []
    }
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
    async createUser(email: string, name: string){
        return await this.userMongo.create({email: email, name: name})
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

        if(!user) await this.createUser(email, '')
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
