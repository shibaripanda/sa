import * as mongoose from 'mongoose';

interface AuthCode {
  code: number,
  time: number
}

interface SubRoles {
  subServiceId: string,
  roles: string[],
  statuses: string[],
  devices: string[]
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
    type: Array
  }
})

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
  }
}, {timestamps: true})

export interface User {
  _id: mongoose.ObjectId
  email: string
  authCode: AuthCode
  services_roles: ServicesRoles[]
  name?: string
  orderDataShowItems: DataList[] 
}
