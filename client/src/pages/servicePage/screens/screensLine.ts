import { ServiceClass } from "../../../classes/ServiceClass.ts";
import { UserClass } from "../../../classes/UserClass.ts";
import { NewOrderScreen } from "./newOrderScreen/NewOrderScreen.tsx";
import { OrderScreen } from "./ordersScreen/OrderScreen.tsx";
import { ChangeNameMainService } from "./serviceSettingsScreen/itemsScreenSettings/ChangeNameMainService.tsx";
import { ChangeNameSubService } from "./serviceSettingsScreen/itemsScreenSettings/ChangeNameSubService.tsx";
import { ChangeServiceDeviceList } from "./serviceSettingsScreen/itemsScreenSettings/ChangeServiceDeviceList.tsx";
import { ChangeServiceRole } from "./serviceSettingsScreen/itemsScreenSettings/ChangeServiceRole.tsx";
import { ChangeServiceStatusList } from "./serviceSettingsScreen/itemsScreenSettings/ChangeServiceStatusList.tsx";
import { ChangeServiceUser } from "./serviceSettingsScreen/itemsScreenSettings/ChangeServiceUser.tsx";
import { SeviceSettingsScreen } from "./serviceSettingsScreen/SeviceSettingsScreen.tsx";

export const line = [
    {
        name: 'orders',
        screen: OrderScreen,
        items: []
    },
    {
        name: 'createOrder',
        screen: NewOrderScreen,
        items: []
    },
    {
        name: 'serviceSettings',
        screen: SeviceSettingsScreen,
        items: [
            {message: 'changeNameMainService', screenItem: ChangeNameMainService}, 
            {message: 'changeNameSubService', screenItem: ChangeNameSubService},
            {message: 'changeServiceDeviceList', screenItem: ChangeServiceDeviceList, size: 12},
            {message: 'changeServiceStatusList', screenItem: ChangeServiceStatusList, size: 12},
            {message: 'changeServiceRole', screenItem: ChangeServiceRole, size: 12},
            
        ]
    },
    {
        name: 'changeServiceUser',
        screen: SeviceSettingsScreen,
        items: [
            {message: 'changeServiceUser', screenItem: ChangeServiceUser, size: 12}
        ]
    }
]

export class ScreenLine {
    line: {name: string, screen: any, items: {message: string, screenItem: any}[]}[]
    data: {text: {}, leng: string, user: UserClass, service: ServiceClass}
    service: ServiceClass
    user: UserClass
    text: any
    leng: string

    constructor(data){
        this.line = line
        this.data = data
        this.service = data.service
        this.user = data.user
        this.text = data.text
        this.leng = data.leng
    }

    getMessagesForUser(){
        const messages = this.service.roles.filter(item => this.user.userRoles.includes(item.role)).map(item => item.access)
        // console.log(messages.length ? [...new Set(messages.flat())] : [])
        return messages.length ? [...new Set(messages.flat())] : []
    }

    getMenuItems(){
        return this.line.map(item => item.name)
    }

    getScreen(activeScreen: number, props: any){
        console.log('screenLine', this.user, this.service)
        // console.log(this.service)
        const items = this.line[activeScreen].items.filter(item => this.getMessagesForUser().includes(item.message) || this.user.userRoles.includes('owner'))
        // console.log(items)
        if(items.length){
          return this.line[activeScreen].screen(
            {
                ...this.data, 
                items: items.filter(item => this.text[item.message][this.leng].toLowerCase().includes(props.settingsFilter.toLowerCase())), 
                props: props
            }
        )  
        }
        // return <>ChangeNameMainService</>
        
        
    }

}