import { sendToSocket } from "../modules/socket/pipSendSocket.ts"

export interface User {
    name?: string
    email: string
    exp: number
    iat: number
    roles: {
        subServiceId: string, 
        statuses: string[], 
        devices: string[], 
        roles: string[], 
        deviceFilter: string[], 
        statusFilter: string[], 
        subServiceFilter: string[],
        dateFilter: [Date | null, Date | null]
    }
    token: string
    _id: string
    serviceId: string
    orderDataShowItems: {serviceId: string, data: string[]}[]
    telegramId: number
    passwordToTelegram: boolean
    newOrderImages: []
    openSubServices: string[]
}

const upUserDataLine = (data, sid, subsId) => {
    if(data.find(item => item.serviceId === sid)){
        if(data.find(item => item.serviceId === sid).data.includes('_DeviceBlocked_')){
            return data
        }
        sendToSocket('changeMyMainOrderDataLine', {
                          serviceId: sid, 
                          subServiceId: subsId, 
                          data: '_DeviceBlocked_',
                          status: true,
                          action: 'addDelete' 
                        })
        data.find(item => item.serviceId === sid).data.splice(0, 0, {serviceId: sid, data: ['_DeviceBlocked_']})
        return data
    }
    return [{serviceId: sid, data: ['_DeviceBlocked_']}]
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
    orderDataShowItems: {serviceId: string, data: string[]}[]
    telegramId: number
    passwordToTelegram: boolean
    newOrderImages: []
    deviceFilter: string[]
    statusFilter: string[]
    subServiceFilter: string[]
    dateFilter: [Date | null, Date | null]
    openSubServices: string[]
    
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
        this.orderDataShowItems = upUserDataLine(data.orderDataShowItems, data.serviceId, data.roles.subServiceId)
        this.telegramId = data.telegramId
        this.passwordToTelegram = data.passwordToTelegram
        this.newOrderImages = data.newOrderImages
        this.deviceFilter = data.roles.deviceFilter
        this.statusFilter = data.roles.statusFilter
        this.subServiceFilter = data.roles.subServiceFilter
        this.dateFilter = data.roles.dateFilter
        this.openSubServices = data.openSubServices

    }

    callServer(call, data){
        sendToSocket(call, {serviceId: this.serviceId, subServiceId: this.subServiceId, ...data})
    }
    closePayOrderStatus(orderId, accounId, order, value){
        this.callServer('closePayOrderStatus', {orderId, accounId, order, value})
    }
    deleteOrderbyId(orderId){
        this.callServer('deleteOrderbyId', {orderId})
    }
    changeMyMainOrderDataLine(index1, index2, action, data, status){
        if(action === 'replace'){
            this.callServer('changeMyMainOrderDataLine', {index1, index2, action})  
        }
        else if(action === 'addDelete'){
            this.callServer('changeMyMainOrderDataLine', {data, status, action})
        }
        
    }
    changeMyName(newUserName){
        this.callServer('changeMyName', {newUserName})
    }
    disconectTelegram(){
        this.callServer('disconectTelegram', {})
    }
    testTelegram(){
        this.callServer('testTelegram', {})
    }
    getTelegramPass(){
        this.callServer('getTelegramPass', {})
    }
    deleteImage(image){
        this.callServer('deleteImage', {image})
    }
    deleteAllImage(){
        this.callServer('deleteAllImage', {})
    }
    createOrder(newOrder){
        this.callServer('createOrder', {newOrder})
    }
    editUserFilter(filter, item){
        this.callServer('editUserFilter', {filter, item})
    }
    addNewWork(orderId, work){
        this.callServer('addNewWork', {orderId, work})
    }
    deleteWork(orderId, work){
        this.callServer('deleteWork', {orderId, work})
    }
    deleteAllWork(orderId){
        this.callServer('deleteAllWork', {orderId})
    }
    updateOrderWork(orderId, work){
        this.callServer('updateOrderWork', {orderId, work})
    }
    addInformationOrder(orderId, data){
        this.callServer('addInformationOrder', {orderId, data})
    }
    editOrderStatus(orderId, newStatus){
        this.callServer('editOrderStatus', {orderId, newStatus})
    }
    getOrderPhotos(orderId){
        this.callServer('getOrderPhotos', {orderId})
    }
    sendOrderToTelegram(orderId){
        this.callServer('sendOrderToTelegram', {orderId})
    }
    getOrder(orderId){
        this.callServer('getOrder', {orderId})
    }
    addOrDelListVariant(item, variant){
        this.callServer('addOrDelListVariant', {item, variant})
    }
    deleteBusinessAccount(accounId){
        this.callServer('deleteBusinessAccount', {accounId})
    }
    addNewBusinessAccount(newBusinessAccountName){
        this.callServer('newBusinessAccountName', {newBusinessAccountName})
    }
    changeAddressSubService(address, data){
        this.callServer('changeAddressSubService', {address, data})
    }
    changeBoxPartsService(newPart){
        this.callServer('changeBoxPartsService', {newPart})
    }
    deletePart(deletePart){
        this.callServer('deletePart', {deletePart})
    }
    addRoleToUser(email, role){
        this.callServer('addRoleToUser', {email, role})
    }
    addStatusToUser(email, status){
        this.callServer('addStatusToUser', {email, status})
    }
    addDeviceToUser(email, device){
        this.callServer('addDeviceToUser', {email, device})
    }
    deleteUserFromLocalService(email){
        this.callServer('deleteUserFromLocalService', {email})
    }
    deleteUserFromService(email){
        this.callServer('deleteUserFromService', {email})
    }
    getServiceUsers(){
        this.callServer('getServiceUsers', {})
    }
    getServiceLocalUsers(){
        this.callServer('getServiceLocalUsers', {})
    }
    replaceOrderDataItems(index1, index2){
        this.callServer('replaceOrderDataItems', {index1, index2})
    }
    changeServiceOrderDataList(newOrderData){
        this.callServer('changeServiceOrderDataList', {newOrderData})
    }
    orderDataEdit(item, data, newValue){
        this.callServer('orderDataEdit', {item, data, newValue})
    }
    deleteService(){
        this.callServer('deleteService', {})
    }
    changeWorksService(newUsluga){
        this.callServer('changeWorksService', {newUsluga})
    }
    deleteUsluga(deleteUsluga){
        this.callServer('deleteUsluga', {deleteUsluga})
    }
    updateDocument(docName, newDoc){
        this.callServer('updateDocument', {docName, newDoc})
    }
    changeTimeSubService(workTime, data){
        this.callServer('changeTimeSubService', {workTime, data})
    }
    changeContactSubService(contact, data){
        this.callServer('changeContactSubService', {contact, data})
    }
    updateCurrency(newCurrency){
        this.callServer('updateCurrency', {newCurrency})
    }
    changeFeeService(fee){
        this.callServer('changeFeeService', {fee})
    }
    changeInfoMainService(newData){
        this.callServer('changeInfoMainService', {newData})
    }
    changeLocalService(subServiceIdDeleteOrNew){
        this.callServer('changeLocalService', {subServiceIdDeleteOrNew})
    }
    changeNameMainService(newName){
        this.callServer('changeNameMainService', {newName})
    }
    changeNameSubService(newName){
        this.callServer('changeNameSubService', {newName})
    }
    replaceDevicePosition(index1, index2){
        this.callServer('replaceDevicePosition' , {index1, index2})
    }
    changeServiceDeviceList(device){
        this.callServer('changeServiceDeviceList', {device})
    }
    addNewServiceRole(newRole){
        this.callServer('addNewServiceRole', {newRole})
    }
    changeServiceRole(role, access){
        this.callServer('changeServiceRole', {role, access})
    }
    changeColorStatus(status, color){
        this.callServer('changeColorStatus', {status, color})
    }
    replaceStatusPosition(index1, index2){
        this.callServer('replaceStatusPosition', {index1, index2})
    }
    changeServiceStatusList(status){
        this.callServer('changeServiceStatusList', {status})
    }

}