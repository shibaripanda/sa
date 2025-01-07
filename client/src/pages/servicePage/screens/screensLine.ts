import { ServiceClass } from "../../../classes/ServiceClass.ts";
import { UserClass } from "../../../classes/UserClass.ts";
import { NewOrderScreen } from "./newOrderScreen/NewOrderScreen.tsx";
import { OrderScreen } from "./ordersScreen/OrderScreen.tsx";
import { ChangeAddressSubService } from "./serviceSettingsScreen/itemsScreenSettings/ChangeAddressSubService.tsx";
import { ChangeContactSubService } from "./serviceSettingsScreen/itemsScreenSettings/ChangeContactSubService.tsx";
import { ChangeLocalService } from "./serviceSettingsScreen/itemsScreenSettings/ChangeLocalService.tsx";
import { ChangeNameMainService } from "./serviceSettingsScreen/itemsScreenSettings/ChangeNameMainService.tsx";
import { ChangeNameSubService } from "./serviceSettingsScreen/itemsScreenSettings/ChangeNameSubService.tsx";
import { ChangeServiceDeviceList } from "./serviceSettingsScreen/itemsScreenSettings/ChangeServiceDeviceList.tsx";
import { ChangeServiceRole } from "./serviceSettingsScreen/itemsScreenSettings/ChangeServiceRole.tsx";
import { ChangeServiceStatusList } from "./serviceSettingsScreen/itemsScreenSettings/ChangeServiceStatusList.tsx";
import { ChangeServiceUser } from "./userSettingsScreen/itemsScreenSettings/ChangeServiceUser.tsx";
import { ChangeTimeSubService } from "./serviceSettingsScreen/itemsScreenSettings/ChangeTimeSubService.tsx";
import { SeviceSettingsScreen } from "./serviceSettingsScreen/SeviceSettingsScreen.tsx";
import { UserSettingsScreen } from "./userSettingsScreen/UserSettingsScreen.tsx";
import { ChangeLocalServiceUser } from "./userSettingsScreen/itemsScreenSettings/ChangeLocalServiceUser.tsx";

export const line = [
    // {
    //     name: 'orders',
    //     screen: OrderScreen,
    //     items: []
    // },
    // {
    //     name: 'createOrder',
    //     screen: NewOrderScreen,
    //     items: []
    // },
    {
        name: 'serviceSettings',
        screen: SeviceSettingsScreen,
        items: [
            {message: 'changeNameMainService', screenItem: ChangeNameMainService}, 
            {message: 'changeServiceDeviceList', screenItem: ChangeServiceDeviceList, size: 12},
            {message: 'changeServiceStatusList', screenItem: ChangeServiceStatusList, size: 12},
            {message: 'changeServiceRole', screenItem: ChangeServiceRole, size: 12},
            {message: 'changeLocalService', screenItem: ChangeLocalService, size: 12}
        ]
    },
    {
        name: 'serviceLocalSettings',
        screen: SeviceSettingsScreen,
        items: [
            {message: 'changeNameSubService', screenItem: ChangeNameSubService},
            {message: 'changeTimeSubService', screenItem: ChangeTimeSubService},
            {message: 'changeContactSubService', screenItem: ChangeContactSubService},
            {message: 'changeAddressSubService', screenItem: ChangeAddressSubService},
        ]
    },
    {
        name: 'changeServiceUser',
        screen: UserSettingsScreen,
        getDataMessage: 'getServiceUsers',
        items: [
            {message: 'changeServiceUser', screenItem: ChangeServiceUser, size: 12},
        ]
    },
    {
        name: 'changeLocalServiceUser',
        screen: UserSettingsScreen,
        getDataMessage: 'getServiceLocalUsers',
        items: [
            {message: 'changeLocalServiceUser', screenItem: ChangeLocalServiceUser, size: 12},
        ]
    }
]

export class ScreenLine {
    line: {name: string, screen: any, items: {message: string, screenItem: any}[], getDataMessage?: string | undefined}[]
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
        return messages.length ? [...new Set(messages.flat())] : []
    }

    getMenuItems(){
        return this.line.map(item => item.name)
    }

    getScreen(activeScreen: number, props: any){
        console.log('screenLine', this.user, this.service)
        const items = this.line[activeScreen].items.filter(item => this.getMessagesForUser().includes(item.message) || this.user.userRoles.includes('owner'))
        if(items.length){
            return this.line[activeScreen].screen(
                {
                    ...this.data,
                    getDataMessage: this.line[activeScreen].getDataMessage,
                    items: items.filter(item => this.text[item.message][this.leng].toLowerCase().includes(props.settingsFilter.toLowerCase())), 
                    props: props
                }
            )  
        }
        // return (<div>)
    }

}