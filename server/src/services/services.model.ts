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
      default: ['New', 'Ready'],
      require: true
    },
    roles: {
      type: Array,
      default: [{role: 'Serviceman', access: []}, {role: 'Manager', access: []}, {role: 'Supermanager', access: []}],
      require: true
    }
  }, {timestamps: true})

  interface ServiceRoles {
    role: string
    access: string[]
  }
  
  export interface Service {
    name: string
    owner: string
    devices: string[]
    statuses: string[]
    roles: ServiceRoles[]
  }
  
  
 