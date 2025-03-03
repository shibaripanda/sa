import * as mongoose from 'mongoose'

export const Work = new mongoose.Schema({
  work: {
    type: String,
    default: 'work',
    require: true
  },
  master: {
    type: String,
    default: 'noname',
    require: true
  },
  subCost: {
    type: Number,
    default: 0,
    require: true
  },
  cost: {
    type: Number,
    default: 0,
    require: true
  },
  parts: {
    type: Array,
    default: [],
    require: true
  },
  varanty: {
    type: Number,
    default: 0,
    require: true
  }
}, {timestamps: true})

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
  },
  _history_: {
    type: Array,
    require: true,
    default: []
  },
  _information_: {
    type: Array,
    require: true,
    default: []
  },
  _work_: {
    type: [Work],
    require: true,
    default: []
  },
  _media_: {
    type: Array,
    require: true,
    default: []
  }
}, {timestamps: true})


export interface Order {
    _orderServiceId_: string
    _serviceId_:string
    _subServiceId_: string
    _manager_: string
    _status_: string
    _subService_: string
    _history_: []
    _work_: []
  }


