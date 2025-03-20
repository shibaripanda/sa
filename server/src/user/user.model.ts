import * as mongoose from 'mongoose';

interface AuthCode {
  code: number,
  time: number
}

interface SubRoles {
  subServiceId: string,
  roles: string[],
  statuses: string[],
  devices: string[],
  deviceFilter: string[],
  statusFilter:string[],
  subServiceFilter: string[],
  dateFilter: Date | null []
}

interface ServicesRoles {
  serviceId: string,
  subServices: SubRoles[]
}

interface DataList {
  serviceId: string
  data: string[]
}

const roleShema1 = new mongoose.Schema({
  roles: {
    type: Array,
    required: true,
  },
  subServiceId: {
    type: String,
    required: true,
  },
  statuses: {
    type: Array,
    required: true,
  },
  devices: {
    type: Array,
    required: true,
  },
  deviceFilter: {
    type: Array,
    default: [],
    required: true,
  },
  statusFilter: {
    type: Array,
    default: [],
    required: true,
  },
  subServiceFilter: {
    type: Array,
    default: [],
    required: true,
  },
  dateFilter: {
    type: Array,
    default: [null, null],
    required: true,
  }
  
})

const roleShema = new mongoose.Schema({
  serviceId: {
    type: String,
    required: true,
  },
  subServices: {
    type: [roleShema1],
    required: true,
  }
})

const dataShema = new mongoose.Schema({
  serviceId: {
    type: String,
  },
  data: {
    type: Array,
    default: ['_DeviceBlocked_'],
    require: true
  }
})

interface ActCode {
  code: string
  time: number
}

export const UsersSchema = new mongoose.Schema({
  email: {
    type: String, 
    unique: true
  },
  name: {
    type: String,
    require: false, 
  },
  authCode: {
    type: Object
  },
  services_roles: {
    type: [roleShema], 
    require: true, 
    default: []
  },
  orderDataShowItems: {
    type: [dataShema],
    require: true,
    default: []
  },
  telegramId: {
    type: Number,
    require: false
  },
  activCodeTelegram: {
    type: Object 
  },
  newOrderImages: {
    type: [],
    require: true,
    default: []
  },
  passwordToTelegram: {
    type: Boolean,
    require: true,
    default: false
  }
}, {timestamps: true})

export interface User {
  _id: string
  email: string
  authCode: AuthCode
  services_roles: ServicesRoles[]
  name?: string
  orderDataShowItems: DataList[]
  activCodeTelegram: ActCode
  telegramId: number 
  passwordToTelegram: boolean
  newOrderImages: {media: string, type: string}[]
}
