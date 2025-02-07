import * as mongoose from 'mongoose'

export const OrderSchema = new mongoose.Schema({
  _orderServiceId_: {
    type: String,
    // require: true
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
  }
}, {timestamps: true})


export interface Order {
    orderServiceId: string
    _subService_: string
  }


