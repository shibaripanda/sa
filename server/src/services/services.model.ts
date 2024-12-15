import * as mongoose from 'mongoose'

export const ServiceSchema = new mongoose.Schema({
    name: {
      type: String, 
      default: 'New Service',
      require: true
    },
    owner: {
      type: String,
      require: true
    },
    devices: {
      type: Array,
      default: ['DeviceName_1', 'DeviceName_2'],
      require: true
    },
    statuses: {
      type: Array,
      default: ['new', 'ready'],
      require: true
    }
  }, {timestamps: true})
  
  export interface Service {
    name: string
    owner: string
    devices: string[]
    statuses: string[]
  }
  
  
 