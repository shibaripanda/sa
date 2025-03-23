import * as mongoose from 'mongoose'

interface LengResult {
  [key: string]: string
}
export interface NewLengPack {
  [key: string]: LengResult
}

export interface AppErrors {
  error: string,
  time: Date,
  serviceId: string,
  userId: string,
  indexError: string
}

export const AppSchema = new mongoose.Schema({
    text: {
      type: Object, 
      default: {text: 'text'}
    },
    mainServerAppSettings: {
      type: String, 
      default: 'mainServerAppSettings',
      unique: true
    },
    restartCount: {
      type: Number, 
      default: 0
    },
    errors: {
      type: Array,
      default: [],
      require: true
    }
  }, {timestamps: true})
  
  export interface App {
    text: NewLengPack,
    errors: AppErrors[]
  }
  
  
 