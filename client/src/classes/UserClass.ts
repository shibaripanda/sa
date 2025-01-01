export interface User {
    name?: string
    email: string
    exp: number
    iat: number
    roles: {subServiceId: string, statuses: string[], devices: string[], roles: string[]}
    token: string
    _id: string
    serviceId: string
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

    }

   

}