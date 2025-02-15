import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Order, OrderSchema } from './order.model'
import { rendomLetteOrder } from './tech/rendomLetteOrder'
import { rendomNumberOrder } from './tech/rendomNumberOrder'

@Injectable()
export class OrderService {

    constructor(
        @InjectModel('Order') 
        private orderMongo: Model<Order>
    ) {}

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
        console.log(service)
        const orderSh = () => {
            const res = {}
            for(const i of newOrder){
                res[i.field] = i.number ? 'number' : 'string'
            }
            return res
        }
        const orderData = () => {
            const res = {
                _status_: service.statuses[0],
                _serviceId_: serviceId, 
                _subServiceId_: subServiceId,
                _orderServiceId_: rendomNumberOrder({min: 1000, max: 9999}) + '_' + rendomLetteOrder() + rendomLetteOrder() + rendomLetteOrder(),
                _manager_: user.name ? user.name + ` (${user.email})` : user.email
            }
            for(const i of newOrder){
                res[i.field] = i.data
            }
            return res
        }
        OrderSchema.add(orderSh())
        return await this.orderMongo.create(orderData())
    }
    async getOrders(serviceId, user, service){
        
        // console.log(serviceId, user, service)
        const res = await this.orderMongo.find()
        for(const i of res){
            const name = service.subServices.find(item => item.subServiceId === i._subServiceId_)
            i._subService_ = name ? name.name : '--'
        }
        return res
    }
    async getOrder(orderId){
        return await this.orderMongo.findOne({_id: orderId})
    }

}
