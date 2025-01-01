interface Service {
    name: string
    subServices: {name: string, subServiceId: string}[]
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
    subServices: {}[]

    constructor(data: Service){

        this.name = data.name
        // this.subName = data.subServices[0].name
        // @ts-ignore
        this.subName = data.subServices.find(item => item.subServiceId === sessionStorage.getItem('subServiceId')).name
        this.statuses = data.statuses
        this.devices = data.devices
        this.roles = data.roles
        this.price = data.price
        this.subServices = data.subServices

        // data.subServices = data.subServices.filter(item => item.subServiceId !== authClass.getSubServiceId())

    }

   

}