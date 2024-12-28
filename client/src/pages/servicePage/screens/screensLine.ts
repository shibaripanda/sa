import React from "react";
import { ServiceClass } from "../../../classes/ServiceClass.ts";
import { UserClass } from "../../../classes/UserClass.ts";
import { NewOrderScreen } from "./newOrderScreen/NewOrderScreen.tsx";
import { OrderScreen } from "./ordersScreen/OrderScreen.tsx";
import { ChangeNameMainService } from "./serviceSettingsScreen/itemsScreenSettings/ChangeNameMainService.tsx";
import { SeviceSettingsScreen } from "./serviceSettingsScreen/SeviceSettingsScreen.tsx";

const line = [
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
        items: [{message: 'changeNameMainService', screenItem: ChangeNameMainService}, {message: 'changeNameMainService', screenItem: ChangeNameMainService}, {message: 'changeNameMainService', screenItem: ChangeNameMainService}]
    }
]

export class ScreenLine {
    line: {name: string, screen: any, items: {message: string, screenItem: any}[]}[]
    data: {text: {}, leng: string, user: UserClass, service: ServiceClass}
    service: ServiceClass
    user: UserClass

    constructor(data){
        this.line = line
        this.data = data
        this.service = data.service
        this.user = data.user
    }

    getMessagesForUser(){
        const messages = this.service.roles.filter(item => this.user.userRoles.includes(item.role)).map(item => item.access)
        console.log(messages.length ? [...new Set(messages.flat())] : [])
        return messages.length ? [...new Set(messages.flat())] : []
    }

    getMenuItems(){
        return this.line.map(item => item.name)
    }

    getScreen(activeScreen: number){
        console.log(this.user)
        console.log(this.service)
        const items = this.line[activeScreen].items.filter(item => this.getMessagesForUser().includes(item.message) || this.user.userRoles.includes('owner'))
        console.log(items)
        if(items.length){
          return this.line[activeScreen].screen({...this.data, items: items})  
        }
        // return <>ChangeNameMainService</>
        
        
    }

}