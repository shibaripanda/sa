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


    async changeSubServiceData(serviceId: string, subServiceId: string, data: string, field: string){
        const link = `subServices.$[el].options.${field}`
        return await this.serviceMongo.findOneAndUpdate({_id: serviceId}, {[link]: data}, {arrayFilters: [{'el.subServiceId': subServiceId}], returnDocument: 'after'})
    }

    async changeLocalService(serviceId: string, subServiceIdDeleteOrNew: string){
            const subServices = (await this.serviceMongo.findOne({_id: serviceId}, {subServices: 1, _id: 0})).subServices
            if(subServices.find(item => item.subServiceId === subServiceIdDeleteOrNew)){
                return await this.serviceMongo.findOneAndUpdate({_id: serviceId}, {$pull: {subServices: subServices.find(item => item.subServiceId === subServiceIdDeleteOrNew)}}, {returnDocument: 'after'})
            }
            const sId = 'subServiceId' + Date.now()
            const owner = (await this.serviceMongo.findOne({_id: serviceId}, {owner: 1, _id: 0})).owner
            const ownerEmail = await this.userService.getUserById(owner)
            await this.userService.addRoleToUser(ownerEmail.email, serviceId, 'owner', sId)
            return await this.serviceMongo.findOneAndUpdate({_id: serviceId}, {$addToSet: {subServices: {name: subServiceIdDeleteOrNew, subServiceId: sId, options: {address: '', workTime: '', contact: ''}}}}, {returnDocument: 'after'})
    }

    async addNewServiceRole(serviceId: string, newRole: string){
        if(!['Owner', 'owner'].includes(newRole)){
            const roles = (await this.serviceMongo.findOne({_id: serviceId}, {roles: 1, _id: 0})).roles
            if(roles.find(item => item.role === newRole)){
                return await this.serviceMongo.findOneAndUpdate({_id: serviceId}, {$pull: {roles: roles.find(item => item.role === newRole)}}, {returnDocument: 'after'})
            }
            return await this.serviceMongo.findOneAndUpdate({_id: serviceId}, {$addToSet: {roles: {role: newRole, access: []}}}, {returnDocument: 'after'})
        }
    }
   
    async changeServiceRole(serviceId: string, role: string, access: string){
        const roles = (await this.serviceMongo.findOne({_id: serviceId}, {roles: 1, _id: 0})).roles
        if(roles.find(item => item.role === role).access.includes(access)){
            return await this.serviceMongo.findOneAndUpdate({_id: serviceId}, {$pull: {'roles.$[el].access': access}}, {arrayFilters: [{'el.role': role}], returnDocument: 'after'})
        }
        return await this.serviceMongo.findOneAndUpdate({_id: serviceId}, {$addToSet: {'roles.$[el].access': access}}, {arrayFilters: [{'el.role': role}], returnDocument: 'after'})
    }

    async changeServiceStatusList(serviceId: string, status: string){
        if(!['New', 'Ready'].includes(status)){
            const statuses = (await this.serviceMongo.findOne({_id: serviceId}, {statuses: 1, _id: 0})).statuses
            if(statuses.includes(status)){
                return await this.serviceMongo.findOneAndUpdate({_id: serviceId}, {$pull: {statuses: status}}, {returnDocument: 'after'})
            }
            return await this.serviceMongo.findOneAndUpdate({_id: serviceId}, {$addToSet: {statuses: status}}, {returnDocument: 'after'})
        }
    }

    async changeServiceDeviceList(serviceId: string, device: string){
        const devices = (await this.serviceMongo.findOne({_id: serviceId}, {devices: 1, _id: 0})).devices
        if(devices.includes(device)){
            return await this.serviceMongo.findOneAndUpdate({_id: serviceId}, {$pull: {devices: device}}, {returnDocument: 'after'})
        }
        return await this.serviceMongo.findOneAndUpdate({_id: serviceId}, {$addToSet: {devices: device}}, {returnDocument: 'after'})
    }

    async changeNameSubService(serviceId: string, subServiceId: string, newName: string){
        return await this.serviceMongo.findOneAndUpdate({_id: serviceId}, {'subServices.$[el].name': newName}, {arrayFilters: [{'el.subServiceId': subServiceId}], returnDocument: 'after'})
    }
    async changeNameMainService(serviceId: string, newName: string){
        return await this.serviceMongo.findOneAndUpdate({_id: serviceId}, {name: newName}, {returnDocument: 'after'})
    }

    async createNewService(name: string, ownerId: string, email: string){
        const newService = await this.serviceMongo.create({owner: ownerId, name: name})
        // await this.userService.addRoleToUser(email, newService._id.toHexString(), 'owner')
        await this.userService.addRoleToUser(email, newService._id.toString(), 'owner', newService.subServices[0].subServiceId)
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
