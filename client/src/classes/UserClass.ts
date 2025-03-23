import { sendToSocket } from "../modules/socket/pipSendSocket.ts"

export interface User {
    name?: string
    email: string
    exp: number
    iat: number
    roles: {
        subServiceId: string, 
        statuses: string[], 
        devices: string[], 
        roles: string[], 
        deviceFilter: string[], 
        statusFilter: string[], 
        subServiceFilter: string[],
        dateFilter: [Date | null, Date | null]
    }
    token: string
    _id: string
    serviceId: string
    orderDataShowItems: {serviceId: string, data: string[]}[]
    telegramId: number
    passwordToTelegram: boolean
    newOrderImages: []
    openSubServices: string[]
}

const upUserDataLine = (data, sid, subsId) => {
    if(data.find(item => item.serviceId === sid)){
        if(data.find(item => item.serviceId === sid).data.includes('_DeviceBlocked_')){
            return data
        }
        sendToSocket('changeMyMainOrderDataLine', {
                          serviceId: sid, 
                          subServiceId: subsId, 
                          data: '_DeviceBlocked_',
                          status: true,
                          action: 'addDelete' 
                        })
        data.find(item => item.serviceId === sid).data.splice(0, 0, {serviceId: sid, data: ['_DeviceBlocked_']})
        return data
    }
    return [{serviceId: sid, data: ['_DeviceBlocked_']}]
}

export class UserClass {

    name: string | false
    email: string
    token: string
    _id: string
    userDevices: string[]
    userStatuses: string[]
    userRoles: string[]
    subServiceId: string
    serviceId: string
    orderDataShowItems: {serviceId: string, data: string[]}[]
    telegramId: number
    passwordToTelegram: boolean
    newOrderImages: []
    deviceFilter: string[]
    statusFilter: string[]
    subServiceFilter: string[]
    dateFilter: [Date | null, Date | null]
    openSubServices: string[]
    
    constructor(data: User){

        this.name = data.name ? data.name : false
        this.email = data.email
        this.token = data.token
        this._id = data._id
        this.userDevices = data.roles.devices
        this.userStatuses = data.roles.statuses
        this.userRoles = data.roles.roles
        this.subServiceId = data.roles.subServiceId
        this.serviceId = data.serviceId
        this.orderDataShowItems = upUserDataLine(data.orderDataShowItems, data.serviceId, data.roles.subServiceId)
        this.telegramId = data.telegramId
        this.passwordToTelegram = data.passwordToTelegram
        this.newOrderImages = data.newOrderImages
        this.deviceFilter = data.roles.deviceFilter
        this.statusFilter = data.roles.statusFilter
        this.subServiceFilter = data.roles.subServiceFilter
        this.dateFilter = data.roles.dateFilter
        this.openSubServices = data.openSubServices

    }

   

}