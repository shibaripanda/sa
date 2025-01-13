interface Service {
    name: string
    subServices: {name: string, subServiceId: string, options: {workTime: string, contact: string, address: string}}[]
    statuses: string[]
    devices: string[]
    roles: {role: string, access: string[]}[]
    price: {}[]
    orderData: OrderData[] 
}

interface OrderData {
    item: string
    control: boolean
    variants: string[]
    onlyVariants: boolean
    multiVariants: boolean
    hidden: boolean
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
    orderData: OrderData[]

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
        this.orderData = data.orderData

        // data.subServices = data.subServices.filter(item => item.subServiceId !== authClass.getSubServiceId())

    }

   

}