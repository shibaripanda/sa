import * as mongoose from 'mongoose';

interface AuthCode {
  code: number,
  time: number
}

interface ServicesRoles {
  serviceId: mongoose.ObjectId,
  roles: string[]
}

export const UsersSchema = new mongoose.Schema({
  email: {
    type: String, 
    unique: true
  },
  authCode: {
    type: Object
  },
  services_roles: {
    type: Array, 
    require: true, 
    default: []
  },
}, {timestamps: true})

export interface User {
  _id: mongoose.ObjectId
  email: string
  authCode: AuthCode
  services_roles: ServicesRoles[]
}
