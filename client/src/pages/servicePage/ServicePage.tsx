import React, { useMemo } from 'react'
import { useEffect, useState } from 'react'
import { AuthClass } from '../../classes/AuthClass.ts'
import { TextClass } from '../../classes/TextClass.ts'
import { useNavigate } from 'react-router-dom'
import { useConnectSocket } from '../../modules/socket/hooks/useConnectSocket.ts'
import { Header1 } from './header/Header1.tsx'
import { ScreenLine } from './screens/screensLine.ts'
import { getFromSocket } from '../../modules/socket/pipGetSocket.ts'
import { sendToSocket } from '../../modules/socket/pipSendSocket.ts'
import { ServiceClass } from '../../classes/ServiceClass.ts'
import { UserClass } from '../../classes/UserClass.ts'
import { AppShell, useMatches } from '@mantine/core'
import { LoaderShow } from '../../components/Loader/LoaderShow.tsx'
import { useDisclosure, useListState } from '@mantine/hooks'
import { ModalWindowPrint } from './print/ModalWindowPrint.tsx'
import { SocketApt } from '../../modules/socket/api/socket-api.ts'
import { ModalWindowPrintStatus } from './print/ModalWindowPrintStatus.tsx'
import { ModalAlert } from '../../modules/ModalAlert.tsx'

export const emptyWork = {work: '', master: '', varanty: NaN, subCost: NaN, cost: NaN, parts: []}

interface Order {
            _id: string
   _subService_: string
      createdAt: any
   _updateTime_: number
   _orderServiceId_: string
   _mediaPhotos_?: []
} 

function ServicePage() {
  
  const navigate = useNavigate()
  // @ts-ignore
  useConnectSocket(sessionStorage.getItem('currentUser') ? JSON.parse(sessionStorage.getItem('currentUser')).token : navigate('/'))

  const [leng, setLeng] = useState<string | false>(false)
  const [text, setText] = useState<any | false>(false)
  const [user, setUser] = useState<object | false>(false)
  const [activeScreen, setActiveScreen] = useState(sessionStorage.getItem('activescreen') ? sessionStorage.getItem('activescreen') : 'orders')
  const [service, setService] = useState<object | false>(false)
  const screenSizeOrderButLine = useMatches({base: 12, sm: 12, md: 2, lg: 2})
  const screenSize = useMatches({base: 12, sm: 12, md: 4, lg: 3})
  const screenSizeNewOrder = useMatches({base: 12, sm: 12, md: 4, lg: 4})
  const [opened, { close, open }] = useDisclosure(false)
  const [listVariantName, setListVariantName] = useState(false)
  const [newServiceName, setNewSeviceName] = useState('')
  const [newSubServiceName, setSubNewSeviceName] = useState('')
  const [newSubService, setSubNewSevice] = useState('')
  const [newDataService, setNewDataService] = useState('')
  const [device, setDevice] = useState('')
  const [newRole, setNewRole] = useState('')
  const [status, setStatus] = useState('')
  const [users, setUsers] = useState(false)
  const [currency, serCurrency] = useState(false)
  const [usersLocal, setUsersLocal] = useState(false)
  const [workTime, setWorkTime] = useState('')
  const [contact, setContact] = useState('')
  const [address, setAddress] = useState('')
  const [role, setRole] = useState('')
  const [subService, setSubService] = useState('')
  const [emailForNewUser, setEmailForNewUser] = useState('')
  const [checkedAccess, setCheckedAccess] = useState<any>({})
  const [settingsFilter, setSettingsFilter] = useState('')
  const [userName, setUserName] = useState('')
  const [deleteServiceName, setDeleteServiceName] = useState('')
  const [dragDrop, setDragDrop] = useListState([])
  const [newOrderData, setNewOrderData] = useState('')
  const [newVariant, setNewVariant] = useState('')
  const [newFee, setNewFee] = useState(null)
  const [newOrderRend, setNewOrderRend] = useState(Date.now())
  const [orderData, setOrderData] = useState([])
  const [dataForPrint, setDataForPrint] = useState(false)
  const [orders, setOrders] = useState<Order[]>([])
  const [countLoadOrders, setCountLoadOrders] = useState([0, 100])
  const [openedNewOrder, openedNewOrderHandler] = useDisclosure(false)
  const [openedFilter, openedFilterHandler] = useDisclosure(false)
  const [openedClosePrint, openedClosePrintHandlers] = useDisclosure(false)
  const [openedPrint, openedPrintHandlers] = useDisclosure(false)
  const [colorStatus, setColorStatus] = useState<object | false>(false)
  const [dataInformation, setDataInformation] = useState('')
  const [newWork, setNewWork] = useState(structuredClone(emptyWork))
  const [filterOrdersString, setFilterOrdersString] = useState('')
  const [printDocs, setPrinDocs] = useState(false)
  const [stateColorList, setStateColorListhandlers] = useListState([])
  const [stateDataOrderLine, setDataOrderLine] = useListState([false])
  const [orderAcord, setOrderAcord] = useState<string | null>(null)
  const [viewWork, setViewWork] = useState('Manager view')
  const [editedWork, setEditedWork] = useState<any[] | false>(false)
  // const [scroll, scrollTo] = useWindowScroll()
  const [usluga, setUsluga] = useState({value: '', price: ''})
  const [boxPart, setBoxPart] = useState({value: '', varanty: '', subPrice: '', price: ''})
  const [telegramPass, setTelegramPass] = useState(false)
  const [alertModal, handlerAlertModal] = useDisclosure(false)
  const [alertData, setAlertData] = useState(false)
  const [passwordToTelegram, setPasswordToTelegram] = useState(false)
  const [newOrderImages, setNewOrderImages] = useState(false)

  const authClass = new AuthClass()
  const textClass = new TextClass()

  useEffect(() => {
    getTexLengUserService()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const showAlertMessage = (data: any) => {
    setAlertData(data)
    handlerAlertModal.open()
  }

  const addNewOrder = (data: any) => {
    setOrders([{...data, _updateTime_: Date.now()}, ...orders ? orders : []])
    setOrderAcord(data._id)
    setDataForPrint({...data, _printDocument_: 'NewOderPrint'})
    openedPrintHandlers.open()
  }
  const printDocument = (order, doc) => {
    setDataForPrint({...order, _printDocument_: doc})
    if(['WarrantyOrderPrint'].includes(doc)){
      openedClosePrintHandlers.open()
    }
    setTimeout(() => openedPrintHandlers.open(), 0)
  }
  const addNewOrderNoPrint = (data: any) => {
    setOrders((ex) => {
      return [{...data, _updateTime_: Date.now()}, ...ex ? ex : []]
    })
  }
  const getAndPrintNewOrder = async () => {
    SocketApt.socket?.once(`createOrder`, (data) => addNewOrder(data))
  }
  const getOneOrder = async (data: any) => {
    setOrders((ex) => {
      const time = Date.now()
      if(!ex) ex = []
      const res = ex.findIndex(item => item._id === data._id)
      if(res > -1){
        let mp: [] = []
        if(ex[res]._mediaPhotos_){
          mp = [...ex[res]._mediaPhotos_]
          ex[res] = {...data, _updateTime_: time, _mediaPhotos_: mp}
        }
        else{
          ex[res] = {...data, _updateTime_: time}
        }
      }
      else{
        ex.push({...data, _updateTime_: time})
      }
      setOrderAcord((current) => {
        if(current === data._id){
          setEditedWork(structuredClone(data._work_))
        }
        return current
      })
      
      return [...ex]
    })
    SocketApt.socket?.once('getOrders', (data) => getOneOrder(data))
  }
  const modalPrinNewWarranty = () => {
    if(dataForPrint){
      return (
        <>
        <ModalWindowPrintStatus 
          openedClosePrint={openedClosePrint} 
          openedClosePrintHandlers={openedClosePrintHandlers}
          data={dataForPrint}
          service={service}
          user={user}
          text={text}
          leng={leng}
          />
          <ModalWindowPrint 
          openedPrint={openedPrint} 
          openedPrintHandlers={openedPrintHandlers}
          openedClosePrintHandlers={openedClosePrintHandlers}
          data={dataForPrint}
          service={service}
          user={user}
          text={text}
          leng={leng}
          />
        </>
      )
    }
  }
  const getOrderPhotos = (data) => {
    setOrders((ex) => {
      const or = ex.find(item => item._id === data.orderId)
      if(or){
        or._mediaPhotos_ = data.media
      }
      return [...ex]
    })
  }
  const updateUserData = async (data, field) => {
    authClass.updateServiceAppUsers(data, field)
    setUser(new UserClass({...authClass.getCurrentUserForCurrentService(), [field]: data}))
  }
  const askNewOrderImages = () => {
    sendToSocket('getNewOrderImages', {serviceId: authClass.getServiceId(), subServiceId: authClass.getSubServiceId()})
  }
  const filterOrders = useMemo(() => {
    if(filterOrdersString){
      if(filterOrdersString[filterOrdersString.length - 1] === '='){
        console.log(filterOrdersString)
        sendToSocket('getOrdersFilter', {
          serviceId: authClass.getServiceId(), 
          subServiceId: authClass.getSubServiceId(), 
          orderId: filterOrdersString.toString().slice(0, -1),
          exist: orders.map(item => item._id)
        })
        setFilterOrdersString((exist) => {
          return exist.slice(0, -1)
        })
      }
      const minusSimbol = (text) => {
        if(text[text.length - 1] === '='){
          return text.slice(0, -1)
        }
        return text
      }
      const res = orders.filter(item => JSON.stringify(item).toString().toLowerCase().includes(minusSimbol(filterOrdersString).toString().toLowerCase()))
      return res
    }
    // console.log(orders)
    return orders
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[filterOrdersString, orders])

  const getTexLengUserService = async () => {
    
    const t2 = await textClass.getLeng()
    const t3 = await textClass.getText()
    const t4 = await authClass.getCurrentUser()

    if(t2 && t3 && t4){
      setLeng(t2)
      setText(t3)
      setUser(new UserClass(authClass.getCurrentUserForCurrentService()))

      const filterService = (data: any) => {
        setService(new ServiceClass(data))
      }
      const upUserName = (data: any) => {
        authClass.updateServiceAppUsers(data, 'name')
        setUser(new UserClass({...authClass.getCurrentUserForCurrentService(), name: data}))
      }
      const upUserOrderList = (data: any) => {
        authClass.updateServiceAppUsers(data, 'orderDataShowItems')
        setUser(new UserClass({...authClass.getCurrentUserForCurrentService(), orderDataShowItems: data}))
      }
      const deleteServiceRedirect = () => {
        navigate('/')
      }
      const getNewOrderImages = (data: any) => {
        setNewOrderImages(data)
      }
      
      getFromSocket([
        {message: `getServiceById${authClass.getServiceId()}`, handler: filterService},
        {message: `getServiceUsers${authClass.getServiceId()}`, handler: setUsers},
        {message: `getServiceLocalUsers${authClass.getServiceId()}`, handler: setUsersLocal},
        {message: `changeMyName${authClass.getServiceId()}`, handler: upUserName},
        {message: `changeMyMainOrderDataLine${authClass.getServiceId()}`, handler: upUserOrderList},
        {message: `deleteService${authClass.getServiceId()}`, handler: deleteServiceRedirect},
        {message: `getNewOrder${authClass.getServiceId()}`, handler: addNewOrderNoPrint},
        {message: `alert`, handler: showAlertMessage},
        {message: 'getOrderPhotos', handler: getOrderPhotos},
        {message: 'getNewOrderImages', handler: getNewOrderImages},
      ])
      SocketApt.socket?.once(`getOrders`, (data) => getOneOrder(data))

      sendToSocket('getServiceById', {serviceId: authClass.getServiceId(), subServiceId: authClass.getSubServiceId()})
      sendToSocket('getOrdersCount', {serviceId: authClass.getServiceId(), subServiceId: authClass.getSubServiceId(), start: countLoadOrders[0], end: countLoadOrders[1]})
      // sendToSocket('getOrders', {serviceId: authClass.getServiceId(), subServiceId: authClass.getSubServiceId()})
    }
    else{
      navigate('/')
    }
  }

  if(text && leng && user && service && orders){
    const screen = new ScreenLine({text, leng, user, service, filterOrders})
    return (
        <AppShell header={{ height: 77 }}>
          <AppShell.Header>
            <Header1 navigate={navigate} service={service} menu={screen.getMenuItems()} text={text} leng={leng} user={user} activeScreen={activeScreen} setActiveScreen={setActiveScreen}/>
          </AppShell.Header>
        
          <AppShell.Main>
            {screen.getScreen(
              activeScreen ? activeScreen : 'orders',
              {
              newServiceName: newServiceName,
              setNewSeviceName: setNewSeviceName,
              newSubServiceName:newSubServiceName, 
              setSubNewSeviceName: setSubNewSeviceName,
              settingsFilter: settingsFilter,
              setSettingsFilter: setSettingsFilter,
              screenSize: screenSize,
              device: device, 
              setDevice: setDevice,
              status: status, 
              setStatus: setStatus,
              checkedAccess: checkedAccess, 
              setCheckedAccess: setCheckedAccess,
              newRole: newRole, 
              setNewRole: setNewRole,
              users: users, 
              setUsers: setUsers,
              emailForNewUser: emailForNewUser, 
              setEmailForNewUser: setEmailForNewUser,
              newSubService: newSubService,
              setSubNewSevice: setSubNewSevice,
              workTime: workTime,
              setWorkTime: setWorkTime,
              contact: contact,
              setContact: setContact,
              address: address,
              setAddress: setAddress,
              role: role,
              setRole: setRole,
              subService: subService,
              setSubService: setSubService,
              usersLocal: usersLocal, 
              setUsersLocal: setUsersLocal,
              userName: userName,
              setUserName: setUserName,
              deleteServiceName: deleteServiceName,
              setDeleteServiceName: setDeleteServiceName,
              dragDrop: dragDrop,
              setDragDrop: setDragDrop,
              newOrderData: newOrderData,
              setNewOrderData: setNewOrderData,
              opened: opened,
              close: close,
              open: open,
              listVariantName: listVariantName,
              setListVariantName: setListVariantName,
              newVariant: newVariant,
              setNewVariant: setNewVariant,
              screenSizeNewOrder,
              screenSizeOrderButLine,
              newOrderRend: newOrderRend,
              setNewOrderRend: setNewOrderRend,
              orderData: orderData,
              setOrderData: setOrderData,
              newDataService: newDataService,
              setNewDataService: setNewDataService,
              openedNewOrder: openedNewOrder,
              openedNewOrderHandler: openedNewOrderHandler,
              getAndPrintNewOrder: getAndPrintNewOrder,
              // getCountOfOrders: getCountOfOrders,
              countLoadOrders: countLoadOrders,
              setCountLoadOrders: setCountLoadOrders,
              openedFilter: openedFilter,
              openedFilterHandler: openedFilterHandler,
              colorStatus: colorStatus,
              setColorStatus: setColorStatus,
              stateColorList: stateColorList,
              setStateColorListhandlers: setStateColorListhandlers,
              stateDataOrderLine: stateDataOrderLine,
              setDataOrderLine: setDataOrderLine,
              dataInformation: dataInformation,
              setDataInformation: setDataInformation,
              newWork: newWork,
              setNewWork: setNewWork,
              viewWork: viewWork,
              setViewWork: setViewWork,
              orderAcord: orderAcord,
              setOrderAcord: setOrderAcord,
              editedWork: editedWork,
              setEditedWork: setEditedWork,
              newFee: newFee,
              setNewFee: setNewFee,
              filterOrdersString: filterOrdersString,
              setFilterOrdersString: setFilterOrdersString,
              printDocs: printDocs,
              setPrinDocs: setPrinDocs,
              printDocument: printDocument,
              currency: currency,
              serCurrency: serCurrency,
              // scroll: scroll,
              // scrollTo: scrollTo,
              usluga: usluga,
              setUsluga: setUsluga,
              boxPart: boxPart,
              setBoxPart: setBoxPart,
              telegramPass: telegramPass,
              setTelegramPass: setTelegramPass,
              updateUserData: updateUserData,
              passwordToTelegram: passwordToTelegram,
              setPasswordToTelegram: setPasswordToTelegram,
              askNewOrderImages: askNewOrderImages,
              newOrderImages: newOrderImages
              }
            )}
          </AppShell.Main>
          {modalPrinNewWarranty()}
          <ModalAlert alertModal={alertModal} user={user} handlerAlertModal={handlerAlertModal} data={alertData}/>
        </AppShell>
        // alertModal handlerAlertModal
    )
  }
  return (
    <LoaderShow/>
  )
  
}

export default  ServicePage
