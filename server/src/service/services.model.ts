import * as mongoose from 'mongoose'
import { ObjectId }  from 'mongodb'

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
interface ColorStatus {
  status: string,
  color: string
}
interface OrderData {
  item: string
  control: boolean
  variants: string[]
  onlyVariants: boolean
  multiVariants: boolean
  hidden: boolean
  saveNewVariants: boolean
  variant: boolean
  number: boolean
  hold: boolean
  blocked: boolean
}
interface LocalUsers {
  name: string | undefined, 
  email: string, 
  id: string
}

interface Account {
  name: string, 
  value: number, 
  activ: boolean, 
  color: string, 
  accountHistory: {orderId: string, userId: string}[], 
  enabledSubServices: string[], 
  _id: ObjectId
}

const accountSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: Number, required: true },
  activ: { type: Boolean, required: true },
  color: { type: String, required: true },
  accountHistory: { type: Array, default: [] },
  enabledSubServices: { type: Array, default: [] }
})

// export const AccountSchema = new mongoose.Schema({
//   name: {
//     type: String, 
//     default: 'Account1',
//     require: true
//   },
//   value: {
//     type: Number, 
//     default: 0,
//     require: true
//   },
//   accountHistory: {
//     type: Array, 
//     default: [],
//     require: true
//   }
// })

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
      default: ['Laptop', 'Mobile phone'],
      require: true
    },
    statuses: {
      type: Array,
      default: ['New', 'Diagnostics', 'Coordination', 'Process', 'Ready', 'Closed'],
      require: true
    },
    colorStatuses: {
      type: [],
      default: [
        {status: 'New', color: '#f02626'}, 
        {status: 'Diagnostics', color: '#228be6'}, 
        {status: 'Coordination', color: '#e0dd09'},
        {status: 'Process', color: '#731ced'},
        {status: 'Ready', color: '#82c91e'},  
        {status: 'Closed', color: '#2e2e2e'}
      ],
      require: true
    },
    orderData: {
      type: Array,
      default: [
        {item: '_DeviceBlocked_', 
          control: true, 
          number: false, 
          variant: true, 
          variants: [], 
          saveNewVariants: true, 
          onlyVariants: true, 
          multiVariants: false, 
          hidden: false, 
          hold: true,
          blocked: true}
      ],
      require: true
    },
    roles: {
      type: Array,
      default: [{role: 'Serviceman', access: []}, {role: 'Manager', access: []}, {role: 'Supermanager', access: []}],
      require: true
    },
    subServices: {
      type: Array,
      default: [{name: 'Local Service', subServiceId: 'subServiceId' + Date.now(), options: {address: '', workTime: '', contact: ''}}],
      require: true
    },
    serviceInfo: {
      type: String,
      default: '',
      require: true
    },
    serviceDocuments: {
      type: Array,
      default: [],
      require: true
    },
    price: {
      type: Array,
      default: [{title: '', cost: 0}],
      require: true
    },
    dataService: {
      type: String, 
      default: '',
      require: true
    },
    localUsers: {
      type: Array,
      default: [],
      require: true
    },
    fee: {
      type: Number,
      default: 0,
      require: true
    },
    currency: {
      type: Object,
      default: {},
      require: true
    },
    uslugi: {
      type: Array,
      default: [],
      require: true
    },
    boxParts: {
      type: Array,
      default: [],
      require: true
    },
    accounts: {
      type: [accountSchema],
      default: [],
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
    price: Price[],
    orderData: OrderData[]
    colorStatuses: ColorStatus[]
    localUsers: LocalUsers[]
    fee: number
    accounts: Account[]
  }
  
  
 