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

    async createOrder(serviceId, subServiceId, newOrder, user){

        const orderSh = () => {
            const res = {}
            for(const i of newOrder){
                res[i.field] = i.number ? 'number' : 'string'
            }
            return res
        }
        const orderData = () => {
            const res = {
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
        const res = await this.orderMongo.create(orderData())
        console.log(res)
    }

    async getOrder(serviceId){
        // const obg = {
        //     name: 'string',
        //     color: 'string',
        //     price: 35
        // }
        // OrderSchema.add({
        //     name: 'string',
        //     color: 'string',
        //     price: 'number'
        //   })
        console.log(serviceId)
        const res = await this.orderMongo.find()
        console.log(res)
    }


}
