interface Service {
    name: string
    subServices: {name: string, subServiceId: string, options: {workTime: string, contact: string, address: string}}[]
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
    subWorkTime: string
    subContact: string
    subAddress: string

    constructor(data: Service){

        this.name = data.name
        // @ts-ignore
        this.subName = data.subServices.find(item => item.subServiceId === sessionStorage.getItem('subServiceId')).name
        // @ts-ignore
        this.subWorkTime = data.subServices.find(item => item.subServiceId === sessionStorage.getItem('subServiceId')).options.workTime
        // @ts-ignore
        this.subContact = data.subServices.find(item => item.subServiceId === sessionStorage.getItem('subServiceId')).options.contact
        // @ts-ignore
        this.subAddress = data.subServices.find(item => item.subServiceId === sessionStorage.getItem('subServiceId')).options.address
        this.statuses = data.statuses
        this.devices = data.devices
        this.roles = data.roles
        this.price = data.price
        this.subServices = data.subServices

        // data.subServices = data.subServices.filter(item => item.subServiceId !== authClass.getSubServiceId())

    }

   

}