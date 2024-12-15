import * as mongoose from 'mongoose';

interface AuthCode {
  code: number,
  time: number
}

export const UsersSchema = new mongoose.Schema({
  email: {type: String, unique: true},
  authCode: {type: Object}
}, {timestamps: true})

export interface User {
  email: string
  authCode: AuthCode
}