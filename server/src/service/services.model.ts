import * as mongoose from 'mongoose'

interface ServiceRoles {
  role: string
  access: string[]
}

interface SubService {
  name: string,
  options: {address: string, workTime: string, contact: string}
  subServiceId: string
}

interface Price {
  title: string,
  cost: number
}

interface ServiceDocuments {
  name: string,
  info: {name: string, text: string}[]
  image: {name: string, image: string}[]
}

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
    },
    subServices: {
      type: Array,
      default: [{name: 'Main Service', subServiceId: 'subServiceId' + Date.now(), options: {address: '', workTime: '', contact: ''}}],
      require: true
    },
    serviceInfo: {
      type: String,
      default: '',
      require: true
    },
    serviceDocuments: {
      type: Array,
      default: [{name: 'startDoc', info: [{name: '', text: ''}], image: [{name: '', image: ''}]}],
      require: true
    },
    price: {
      type: Array,
      default: [{title: '', cost: 0}],
      require: true
    }
  }, {timestamps: true})

  

  
  export interface Service {
    // _id: string
    name: string
    owner: string
    devices: string[]
    statuses: string[]
    roles: ServiceRoles[]
    subServices: SubService[]
    serviceInfo: string
    serviceDocuments: ServiceDocuments[]
    price: Price[]
  }
  
  
 