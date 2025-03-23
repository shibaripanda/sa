import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Order, OrderSchema } from './order.model'
import { rendomLetteOrder } from './tech/rendomLetteOrder'
import { rendomNumberOrder } from './tech/rendomNumberOrder'
import { BotService } from 'src/bot/bot.service'


@Injectable()
export class OrderService {

    constructor(
        @InjectModel('Order') 
        private orderMongo: Model<Order>,
        @Inject(forwardRef(() => BotService))
        private botService: BotService,
    ) {}

    async closePayOrderStatus(serviceId, subServiceId, orderId, user, service){
        const old = await this.orderMongo.findOne({_id: orderId, _serviceId_: serviceId}, {_status_: 1, _id: 0})
        if(old){
            const updated = await this.orderMongo.findOneAndUpdate(
                {_id: orderId, _serviceId_: serviceId}, 
                {_status_: service.statuses[service.statuses.length - 1] ? service.statuses[service.statuses.length - 1] : 'noStatus', $push: {
                    _history_: {
                        user: user.name ? user.name + ' (' + user.email + ')' : user.email,
                        userId: user._id,
                        edit: '_status_',
                        old: old._status_ ? old._status_ : '',
                        new: service.statuses[service.statuses.length - 1] ? service.statuses[service.statuses.length - 1] : 'noStatus',
                        date: Date.now()
                        }
                    }
                }, 
                {returnDocument: 'after'})
            const name = service.subServices.find(item => item.subServiceId === updated._subServiceId_)
            updated._subService_ = name ? name.name : '--'
            return updated
        }
        return false   
    }

    async deleteOrderbyId(serviceId, subServiceId, orderId, user, service){
        return await this.orderMongo.deleteOne({_id: orderId})
    }
    async getOrderPhotos(orderId, serviceId, subServiceId, user){
        // console.log(serviceId)
        // console.log(user.services_roles.find(item => item.serviceId === serviceId))
        const userFilter = user.services_roles.find(item => item.serviceId === serviceId).subServices.find(item => item.subServiceId === subServiceId)
        return await this.orderMongo.findOne({_id: orderId, _status_: {$nin : userFilter.statuses}}, {_media_: 1, _id: 0})
    }
    async updateOrderWork(serviceId, subServiceId, orderId, work, user, service){
        const old = await this.orderMongo.findOne({_id: orderId, _serviceId_: serviceId})
        if(old){
            const updated = await this.orderMongo.findOneAndUpdate(
                {_id: orderId, _serviceId_: serviceId}, 
                {$push: {
                    _history_: {
                        user: user.name ? user.name + ' (' + user.email + ')' : user.email,
                        userId: user._id,
                        edit: '_work_',
                        old: '',
                        new: 'Delete all works',
                        date: Date.now()
                        }
                    },
                    _work_: work
                }, 
                {returnDocument: 'after'})
            const name = service.subServices.find(item => item.subServiceId === updated._subServiceId_)
            updated._subService_ = name ? name.name : '--'
            return updated
        }
        return false   
    }
    async deleteAllWork(serviceId, subServiceId, orderId, work, user, service){
        const old = await this.orderMongo.findOne({_id: orderId, _serviceId_: serviceId})
        if(old){
            const updated = await this.orderMongo.findOneAndUpdate(
                {_id: orderId, _serviceId_: serviceId}, 
                {$push: {
                    _history_: {
                        user: user.name ? user.name + ' (' + user.email + ')' : user.email,
                        userId: user._id,
                        edit: '_work_',
                        old: '',
                        new: 'Delete all works',
                        date: Date.now()
                        }
                    },
                    _work_: []
                }, 
                {returnDocument: 'after'})
            const name = service.subServices.find(item => item.subServiceId === updated._subServiceId_)
            updated._subService_ = name ? name.name : '--'
            return updated
        }
        return false   
    }
    async deleteWork(serviceId, subServiceId, orderId, work, user, service){
        const old = await this.orderMongo.findOne({_id: orderId, _serviceId_: serviceId})
        if(old){
            const updated = await this.orderMongo.findOneAndUpdate(
                {_id: orderId, _serviceId_: serviceId}, 
                {$push: {
                    _history_: {
                        user: user.name ? user.name + ' (' + user.email + ')' : user.email,
                        userId: user._id,
                        edit: '_work_',
                        old: '',
                        new: work.work + ' ' + work.total + ' ' + service.localUsers.find(item => item.id === work.master).email,
                        date: Date.now()
                        }
                    },
                    $pull: {_work_: {_id: work._id}}
                }, 
                {returnDocument: 'after'})
            const name = service.subServices.find(item => item.subServiceId === updated._subServiceId_)
            updated._subService_ = name ? name.name : '--'
            return updated
        }
        return false   
    }
    async addNewWork(serviceId, subServiceId, orderId, work, user, service){
        const old = await this.orderMongo.findOne({_id: orderId, _serviceId_: serviceId})
        if(old){
            const updated = await this.orderMongo.findOneAndUpdate(
                {_id: orderId, _serviceId_: serviceId}, 
                {$push: {
                    _history_: {
                        user: user.name ? user.name + ' (' + user.email + ')' : user.email,
                        userId: user._id,
                        edit: '_work_',
                        old: '',
                        new: work.work + ' ' + work.total + ' ' + service.localUsers.find(item => item.id === work.master).email,
                        date: Date.now()
                        },
                    _work_: work
                    }
                }, 
                {returnDocument: 'after'})
            const name = service.subServices.find(item => item.subServiceId === updated._subServiceId_)
            updated._subService_ = name ? name.name : '--'
            return updated
        }
        return false   
    }
    async addInformationOrder(serviceId, subServiceId, orderId, data, user, service){
        const old = await this.orderMongo.findOne({_id: orderId, _serviceId_: serviceId})
        if(old){
            const updated = await this.orderMongo.findOneAndUpdate(
                {_id: orderId, _serviceId_: serviceId}, 
                {$push: {
                    _history_: {
                        user: user.name ? user.name + ' (' + user.email + ')' : user.email,
                        userId: user._id,
                        edit: '_information_',
                        old: '',
                        new: data,
                        date: Date.now()
                        },
                    _information_: data
                    }
                }, 
                {returnDocument: 'after'})
            const name = service.subServices.find(item => item.subServiceId === updated._subServiceId_)
            updated._subService_ = name ? name.name : '--'
            return updated
        }
        return false   
    }
    async editOrderStatus(serviceId, subServiceId, orderId, newStatus, user, service){
        const old = await this.orderMongo.findOne({_id: orderId, _serviceId_: serviceId}, {_status_: 1, _id: 0})
        if(old){
            const updated = await this.orderMongo.findOneAndUpdate(
                {_id: orderId, _serviceId_: serviceId}, 
                {_status_: newStatus, $push: {
                    _history_: {
                        user: user.name ? user.name + ' (' + user.email + ')' : user.email,
                        userId: user._id,
                        edit: '_status_',
                        old: old._status_ ? old._status_ : '',
                        new: newStatus,
                        date: Date.now()
                        }
                    }
                }, 
                {returnDocument: 'after'})
            const name = service.subServices.find(item => item.subServiceId === updated._subServiceId_)
            updated._subService_ = name ? name.name : '--'
            return updated
        }
        return false   
    }
    async createOrder(serviceId, subServiceId, newOrder, user, service){
        const orderSh = async () => {
            const res = {}
            for(const i of newOrder){
                res[i.field] = i.number ? 'number' : 'string'
            }
            return res
        }
        const orderData = async () => {
            const res = {
                _status_: service.statuses[0] ? service.statuses[0] : 'New',
                _serviceId_: serviceId, 
                _subServiceId_: subServiceId,
                _orderServiceId_: rendomNumberOrder({min: 1000, max: 9999}) + '_' + rendomLetteOrder() + rendomLetteOrder() + rendomLetteOrder(),
                _manager_: user.name ? user.name + ` (${user.email})` : user.email,
                _media_: user.newOrderImages
            }
            for(const i of newOrder){
                res[i.field] = i.data
            }
            return res
        }
        OrderSchema.add(await orderSh())
        const ord = await this.orderMongo.create(await orderData())
        console.log(ord._id)
        if(ord){
            const name = await service.subServices.find(item => item.subServiceId === ord._subServiceId_)
            ord._subService_ = name ? name.name : '--'
            if(user.telegramId){
              await user.updateOne({newOrderImages: []})
              await this.botService.newOrderTelegramMessage(user.telegramId, ord)  
            }
            return ord 
        }
    }
    async getOrdersFilter(serviceId, subServiceId, orderId, exist, user, service){
        console.log(service.orderData.map(item => item.item))
        const line = service.orderData.filter(item => !item.number).map(item => ({[item.item]: {$regex: orderId, $options: "i"}}))
        
        line.push({'_orderServiceId_': {$regex: orderId, $options: "i"}})
        line.push({'_status_': {$regex: orderId, $options: "i"}})
        line.push({'_manager_': {$regex: orderId, $options: "i"}})
        console.log(line)
        const userFilter = user.services_roles.find(item => item.serviceId === serviceId).subServices.find(item => item.subServiceId === subServiceId)
        // const res = await this.orderMongo.find({_orderServiceId_: {$regex: orderId}, _subServiceId_: subServiceId, _status_: {$nin : userFilter.statuses}}).limit(100).sort({createdAt: -1})
        const res = await this.orderMongo.find({$or: line, _id: {$nin : exist}, _subServiceId_: subServiceId, _status_: {$nin : userFilter.statuses}}).limit(100).sort({createdAt: -1})
        console.log(res.length)
        for(const i of res){
            const name = service.subServices.find(item => item.subServiceId === i._subServiceId_)
            i._subService_ = name ? name.name : '--'
        }
        return res 
    }
    async getOrders(serviceId, subServiceId, start, end, user, service){

        // console.log(user.services_roles.find(item => item.serviceId === serviceId).subServices.find(item => item.subServiceId === subServiceId))
        
        const userFilter = user.services_roles.find(item => item.serviceId === serviceId).subServices.find(item => item.subServiceId === subServiceId)
        // console.log(service)
        const res = await this.orderMongo.find({
            _serviceId_: serviceId, 
            _status_: {$nin : [... new Set([...userFilter.statuses, ...userFilter.statusFilter])]},
            _DeviceBlocked_: {$nin : [... new Set([...userFilter.devices, ...userFilter.deviceFilter])]},
            _subServiceId_: {$nin : [... new Set([...userFilter.subServiceFilter])]},
            createdAt: {$gte: userFilter.dateFilter[0] ? new Date(userFilter.dateFilter[0]) : service.createdAt, $lt: userFilter.dateFilter[1] ? new Date(userFilter.dateFilter[1]) : new Date(Date.now())}
        
        }).skip(start).limit(end).sort({createdAt: -1})
        for(const i of res){
            const name = service.subServices.find(item => item.subServiceId === i._subServiceId_)
            i._subService_ = name ? name.name : '--'
        }
        return res
    }
    async getOrder(orderId, serviceId, subServiceId, user, service){

        const userFilter = user.services_roles.find(item => item.serviceId === serviceId).subServices.find(item => item.subServiceId === subServiceId)
        const res = await this.orderMongo.findOne({
            _id: orderId, 
            _status_: {$nin : userFilter.statuses},
            _DeviceBlocked_: {$nin : userFilter.devices}
        })
        if(res){
            const name = service.subServices.find(item => item.subServiceId === res._subServiceId_)
            res._subService_ = name ? name.name : '--'
            return res 
        }
    }

}
