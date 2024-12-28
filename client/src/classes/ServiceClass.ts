interface Service {
    name: string
    subServiсes: {name: string}[]
    statuses: string[]
    devices: string[]
    roles: {role: string, access: string[]}[]
    price: {}[] 
}

export class ServiceClass {
    
    name: string
    subName: string
    statuses: string[]
    devices: string[]
    roles: {role: string, access: string[]}[]
    price: {}[] 

    constructor(data: Service){

        this.name = data.name
        this.subName = data.subServiсes[0].name
        this.statuses = data.statuses
        this.devices = data.devices
        this.roles = data.roles
        this.price = data.price
        this.roles = data.roles

    }

   

}