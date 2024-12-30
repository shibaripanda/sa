import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from 'mongoose'
import { Service } from './services.model'
import { UsersService } from 'src/user/users.service'

@Injectable()
export class ServicesService {

constructor(
    @InjectModel('Service') 
    private serviceMongo: Model<Service>,
    @Inject(forwardRef(() => UsersService))
    private userService: UsersService
) {}

    async changeServiceRole(serviceId: string, role: string, activeScreen: string[]){
        return await this.serviceMongo.findOneAndUpdate({_id: serviceId}, {'roles.$[el].access': activeScreen}, {arrayFilters: [{'el.role': role}], returnDocument: 'after'})
    }

    async changeServiceStatusList(serviceId: string, status: string){
        if(!['New', 'Ready'].includes(status)){
            console.log(serviceId)
            const statuses = (await this.serviceMongo.findOne({_id: serviceId}, {statuses: 1, _id: 0})).statuses
            console.log(statuses)
            if(statuses.includes(status)){
                return await this.serviceMongo.findOneAndUpdate({_id: serviceId}, {$pull: {statuses: status}}, {returnDocument: 'after'})
            }
            return await this.serviceMongo.findOneAndUpdate({_id: serviceId}, {$addToSet: {statuses: status}}, {returnDocument: 'after'})
        }
    }

    async changeServiceDeviceList(serviceId: string, device: string){
        console.log(serviceId)
        const devices = (await this.serviceMongo.findOne({_id: serviceId}, {devices: 1, _id: 0})).devices
        console.log(devices)
        if(devices.includes(device)){
            return await this.serviceMongo.findOneAndUpdate({_id: serviceId}, {$pull: {devices: device}}, {returnDocument: 'after'})
        }
        return await this.serviceMongo.findOneAndUpdate({_id: serviceId}, {$addToSet: {devices: device}}, {returnDocument: 'after'})
    }

    async changeNameSubService(serviceId: string, subServiceId: string, newName: string){
        return await this.serviceMongo.findOneAndUpdate({_id: serviceId}, {'subServiсes.$[el].name': newName}, {arrayFilters: [{'el.subServiсeId': subServiceId}], returnDocument: 'after'})
    }
    async changeNameMainService(serviceId: string, newName: string){
        return await this.serviceMongo.findOneAndUpdate({_id: serviceId}, {name: newName}, {returnDocument: 'after'})
    }

    async createNewService(name: string, ownerId: ObjectId, email: string){
        const newService = await this.serviceMongo.create({owner: ownerId, name: name})
        // await this.userService.addRoleToUser(email, newService._id.toHexString(), 'owner')
        await this.userService.addRoleToUser(email, newService._id.toHexString(), 'owner', newService.subServiсes[0].subServiсeId)
    }

    async getServicesByOwnerId(userId: ObjectId){
        return await this.serviceMongo.find({owner: userId})
    }

    async getServiceById(serviceId: string){
        return await this.serviceMongo.findOne({_id: serviceId})
    }

    async editDevicesList(serviceId: string, device: string){
        const devices = (await this.serviceMongo.findOne({_id: serviceId}, {devices: 1, _id: 0})).devices
        if(devices.includes(device)){
            await this.serviceMongo.updateOne({_id: serviceId}, {$pull: {devices: device}})
        }
        else{
            await this.serviceMongo.updateOne({_id: serviceId}, {$addToSet: {devices: device}})
        }
    }

    async editStatusList(serviceId: string, status: string){
        if(!['new', 'ready'].includes(status)){
            const devices = (await this.serviceMongo.findOne({_id: serviceId}, {statuses: 1, _id: 0})).statuses
            if(devices.includes(status)){
                await this.serviceMongo.updateOne({_id: serviceId}, {$pull: {statuses: status}})
            }
            else{
                await this.serviceMongo.updateOne({_id: serviceId}, {$addToSet: {statuses: status}})
            }
        }
    }


}
