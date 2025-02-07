import * as mongoose from 'mongoose'

export const OrderSchema = new mongoose.Schema({
  _orderServiceId_: {
    type: String,
  },
  _serviceId_: {
    type: String,
    require: true
  },
  _subServiceId_: {
    type: String,
    require: true
  },
  _manager_: {
    type: String,
    require: true
  },
  _status_: {
    type: String,
    require: true,
    default: 'unStatused'
  },
  _subService_: {
    type: String,
    require: true,
    default: 'x'
  }
}, {timestamps: true})


export interface Order {
    orderServiceId: string
    _serviceId_:string
    _subServiceId_: string
    _manager_: string
    _status_: string
    _subService_: string
    // createdAt: any
  }


