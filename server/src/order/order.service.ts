import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Order, OrderSchema } from './order.model'

@Injectable()
export class OrderService {

    constructor(
        @InjectModel('Order') 
        private orderMongo: Model<Order>
    ) {}

    async createOrder(serviceId){
        const obg = {
            name: 'string',
            color: 'string',
            price: 35
        }
        OrderSchema.add({
            name: 'string',
            color: 'string',
            price: 'number'
          })
        console.log(serviceId)
        const res = await this.orderMongo.create(obg)
        console.log(res)
    }


}
