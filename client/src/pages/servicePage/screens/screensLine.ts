import { ServiceClass } from "../../../classes/ServiceClass.ts";
import { UserClass } from "../../../classes/UserClass.ts";
import { NewOrderScreen } from "./newOrderScreen/NewOrderScreen.tsx";
// import { OrderScreen } from "./ordersScreen/OrderScreen.tsx";
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
import { MySettingsScreen } from "./mySettingsScreen/MySettingsScreen.tsx";
import { ChangeMyName } from "./mySettingsScreen/itemsScreenSettings/ChangeMyName.tsx";
import { DeleteService } from "./serviceSettingsScreen/itemsScreenSettings/DeleteService.tsx";
import { ChangeServiceOrderDataList } from "./serviceSettingsScreen/itemsScreenSettings/ChangeServiceOrderDataList.tsx";
import { CreateOrderScreen } from "./newOrderScreen/itemsScreenSettings/CreateOrderScreen.tsx";
import { ChangeInfoMainService } from "./serviceSettingsScreen/itemsScreenSettings/ChangeInfoMainService.tsx";
import { OrdersScreen } from "./newOrderScreen/itemsScreenSettings/OrdersScreen.tsx";
import { ChangeMyMainOrderDataLine } from "./mySettingsScreen/itemsScreenSettings/ChangeMyMainOrderDataLine.tsx";

export const line = [
    {
        // name: 'createOrder',
        // screen: NewOrderScreen,
        // items: [
        //     {message: 'createOrder', screenItem: CreateOrderScreen},
        //     {message: 'orders', screenItem: OrdersScreen},  
        // ]
        name: 'orders',
        screen: NewOrderScreen,
        items: [
            {message: 'createOrder', screenItem: CreateOrderScreen},
            {message: 'orders', screenItem: OrdersScreen},  
        ]
    },
    {
        name: 'serviceSettings',
        screen: SeviceSettingsScreen,
        items: [
            {message: 'changeNameMainService', screenItem: ChangeNameMainService},
            {message: 'changeInfoMainService', screenItem: ChangeInfoMainService}, 
            {message: 'changeServiceDeviceList', screenItem: ChangeServiceDeviceList, size: 12},
            {message: 'changeServiceStatusList', screenItem: ChangeServiceStatusList, size: 12},
            {message: 'changeServiceOrderDataList', screenItem: ChangeServiceOrderDataList, size: 12},
            {message: 'changeServiceRole', screenItem: ChangeServiceRole, size: 12},
            {message: 'changeLocalService', screenItem: ChangeLocalService, size: 12},
            {message: 'deleteService', screenItem: DeleteService}
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
    },
    {
        name: 'changeMyUser',
        screen: MySettingsScreen,
        items: [
            {
                message: 'changeMyMainOrderDataLine', 
                screenItem: ChangeMyMainOrderDataLine, 
                setData: 'setUserName', 
                newData: 'userName', 
                data: 'name', 
                title: 'name', 
                res: 'newUserName',
                size: 12
            },
            {
                message: 'changeMyName', 
                screenItem: ChangeMyName, 
                setData: 'setUserName', 
                newData: 'userName', 
                data: 'name', 
                title: 'name', 
                res: 'newUserName'
            },
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
    orders: []

    constructor(data){
        this.line = line
        this.data = data
        this.service = data.service
        this.user = data.user
        this.text = data.text
        this.leng = data.leng
        this.orders = data.orders
    }

    getMessagesForUser(){
        const messages = this.service.roles.filter(item => this.user.userRoles.includes(item.role)).map(item => item.access)
        return messages.length ? [...new Set(messages.flat())] : []
    }

    getMenuItems(){
        const filterLine = (ar1, ar2) => {
            for(const i of ar2){
                if(ar1.includes(i)){
                    return true
                }
            }
            return false
        }
        // console.log('this.getMessagesForUser()', this.getMessagesForUser().join())
        // console.log(this.line.filter(lin => filterLine(lin.items.map(m => m.message), this.getMessagesForUser())).map(item => item.name))
        return this.line.filter(lin => filterLine(lin.items.map(m => m.message), this.getMessagesForUser())).map(item => item.name)
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
    }

}