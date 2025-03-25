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
import { ChangeFeeService } from "./serviceSettingsScreen/itemsScreenSettings/ChangeFeeService.tsx";
import { ChangeMyTelegram } from "./mySettingsScreen/itemsScreenSettings/ChangeMyTelegram.tsx";
import { ChangeNewOrderPrint } from "./serviceSettingsScreen/itemsScreenSettings/ChangeNewOrderPrint.tsx";
import { ChangeWarrantyOrderPrint } from "./serviceSettingsScreen/itemsScreenSettings/ChangeWarrantyOrderPrint.tsx";
import { ChangeCurrencyService } from "./serviceSettingsScreen/itemsScreenSettings/ChangeCurrencyService.tsx";
import { ChangeWorksService } from "./serviceSettingsScreen/itemsScreenSettings/ChangeWorksService.tsx";
import { ChangeBoxPartsService } from "./serviceSettingsScreen/itemsScreenSettings/ChangeBoxPartsService.tsx";
import { Businessaccounts } from "./serviceSettingsScreen/itemsScreenSettings/Businessaccounts.tsx";


interface ItemData {
    message: string
    screenItem: Function
    canUse?: string[]
    setData?: string 
    newData?: string 
    data?: string 
    title?: string 
    res?: string
    size?: number
}
interface Line {
    name: string
    screen: Function
    items: ItemData[]
    getDataMessage?: string 
}

export const line: Line[] = [
    {
        name: 'orders',
        screen: NewOrderScreen,
        items: [
            {message: 'createOrder', screenItem: CreateOrderScreen,
                canUse: ['sendOrderToTelegram']
            },
            {message: 'getOrdersCount', screenItem: OrdersScreen, 
                canUse: ['addNewWork', 'deleteOrderbyId', 'deleteWork', 'deleteAllWork', 'updateOrderWork', 'editOrderStatus']},  
        ]
    },
    {
        name: 'uslugi',
        screen: SeviceSettingsScreen,
        items: [
            {message: 'changeWorksService', screenItem: ChangeWorksService, canUse: ['deleteUsluga']}, 
        ]
    },
    {
        name: 'partsBox',
        screen: SeviceSettingsScreen,
        items: [
            {message: 'changeBoxPartsService', screenItem: ChangeBoxPartsService, 
                canUse: ['deletePart']}, 
        ]
    },
    {
        name: 'serviceSettings',
        screen: SeviceSettingsScreen,
        items: [
            {message: 'changeNameMainService', screenItem: ChangeNameMainService},
            {message: 'changeInfoMainService', screenItem: ChangeInfoMainService},
            {message: 'changeFeeService', screenItem: ChangeFeeService}, 
            {message: 'changeCurrencyService', screenItem: ChangeCurrencyService, size: 12}, 
            {message: 'changeServiceDeviceList', screenItem: ChangeServiceDeviceList, size: 12, canUse: ['replaceDevicePosition']},
            {message: 'changeServiceStatusList', screenItem: ChangeServiceStatusList, size: 12, canUse: ['changeColorStatus', 'replaceStatusPosition']},
            {message: 'changeServiceOrderDataList', screenItem: ChangeServiceOrderDataList, size: 12, canUse: ['orderDataEdit', 'replaceOrderDataItems']},
            {message: 'changeServiceRole', screenItem: ChangeServiceRole, size: 12, canUse: ['addNewServiceRole']},
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
            {message: 'changeServiceUser', screenItem: ChangeServiceUser, size: 12, canUse: ['addRoleToUser', 'addStatusToUser', 'addDeviceToUser', 'deleteUserFromService']},
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
        name: 'documents',
        screen: SeviceSettingsScreen,
        items: [
            {message: 'NewOrderPrint', screenItem: ChangeNewOrderPrint, size: 12, canUse: ['updateDocument']},
            {message: 'changeWarrantyOrderPrint', screenItem: ChangeWarrantyOrderPrint, size: 12},
        ]
    },
    {
        name: 'business',
        screen: SeviceSettingsScreen,
        items: [
            {message: 'businessAccounts', screenItem: Businessaccounts, size: 12, canUse: ['deleteBusinessAccount', 'addNewBusinessAccount']},
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
            {
                message: 'сhangeMyTelegram', 
                screenItem: ChangeMyTelegram, 
                setData: 'setUserName', 
                newData: 'userName', 
                data: 'name', 
                title: 'name', 
                res: 'newUserName'
            }
        ]
    }
]

export class ScreenLine {
    line: {name: string, screen: any, items: {message: string, screenItem: any, canUse?: string[] | undefined}[], getDataMessage?: string | undefined}[]
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
        this.orders = data.filterOrders
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
            return this.user.userRoles.includes('owner')
        }
        // console.log('this.getMessagesForUser()', this.getMessagesForUser().join())
        // console.log(this.line.filter(lin => filterLine(lin.items.map(m => m.message), this.getMessagesForUser())).map(item => item.name))
        return this.line.filter(lin => filterLine(lin.items.map(m => m.message), this.getMessagesForUser())).map(item => item.name)
    }

    getScreen(activeScreen: string, props: any){
        // @ts-ignore
        if(process.env.REACT_APP_MODE === 'dev'){
            console.log('-----------------------')
            console.log('ScreenLine',activeScreen)
            console.log(this.user, this.service)
        }
        const res = this.line.find(it => it.name === activeScreen)
        const items = res ? res.items.filter(item => this.getMessagesForUser().includes(item.message) || this.user.userRoles.includes('owner')) : []
        if(items.length){
            return res ? res.screen(
                {
                    ...{...this.data, orders: this.orders},
                    getDataMessage: res.getDataMessage,
                    items: items.filter(item => this.text[item.message][this.leng].toLowerCase().includes(props.settingsFilter.toLowerCase())), 
                    props: props
                }
            ): [] 
        }
    }

}