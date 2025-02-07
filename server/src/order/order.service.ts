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

    // async getOrder(serviceId){
    //     console.log(serviceId)
    //     const res = await this.orderMongo.find()
    //     console.log(res)
    // }


}
