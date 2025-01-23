import * as mongoose from 'mongoose'

export const OrderSchema = new mongoose.Schema({
  orderServiceId: {
    type: String,
    // require: true
  }
}, {timestamps: true})


export interface Order {
    orderServiceId: string
  }


