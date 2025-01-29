import React from 'react'
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


function ServicePage() {

  const navigate = useNavigate()
  // @ts-ignore
  useConnectSocket(sessionStorage.getItem('currentUser') ? JSON.parse(sessionStorage.getItem('currentUser')).token : navigate('/'))

  const [leng, setLeng] = useState<string | false>(false)
  const [text, setText] = useState<any | false>(false)
  const [user, setUser] = useState<object | false>(false)
  const [activeScreen, setActiveScreen] = useState(sessionStorage.getItem('activescreen') ? Number(sessionStorage.getItem('activescreen')) : 0)
  const [service, setService] = useState<object | false>(false)
  const screenSize = useMatches({base: 12, sm: 12, md: 4, lg: 3})
  const screenSizeNewOrder = useMatches({base: 12, sm: 12, md: 4, lg: 4})
  const [opened, { close, open }] = useDisclosure(false)
  const [listVariantName, setListVariantName] = useState('')
  const [newServiceName, setNewSeviceName] = useState('')
  const [newSubServiceName, setSubNewSeviceName] = useState('')
  const [newSubService, setSubNewSevice] = useState('')
  const [device, setDevice] = useState('')
  const [newRole, setNewRole] = useState('')
  const [status, setStatus] = useState('')
  const [users, setUsers] = useState(false)
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
  const [newOrderRend, setNewOrderRend] = useState(Date.now())
  const [orderData, setOrderData] = useState([])
  const [dataForPrint, setDataForPrint] = useState(false)

  const [openedPrint, openedPrintHandlers] = useDisclosure(false)

  useEffect(() => {
    getTexLengUserService()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getTexLengUserService = async () => {
    const authClass = new AuthClass()
    const textClass = new TextClass()
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
      const deleteServiceRedirect = () => {
        navigate('/')
      }
      const printOrder = (data: any) => {
        console.log('mODAL', data)
        setDataForPrint({...data, _printDocument_: 'newOrderDocument'})
        openedPrintHandlers.open()
      }
      getFromSocket([
                  {message: `getServiceById${authClass.getServiceId()}`, handler: filterService},
                  {message: `getServiceUsers${authClass.getServiceId()}`, handler: setUsers},
                  {message: `getServiceLocalUsers${authClass.getServiceId()}`, handler: setUsersLocal},
                  {message: `changeMyName${authClass.getServiceId()}`, handler: upUserName},
                  {message: `deleteService${authClass.getServiceId()}`, handler: deleteServiceRedirect},
                  {message: `createOrder`, handler: printOrder},
                ])
      sendToSocket('getServiceById', {serviceId: authClass.getServiceId()})
      
    }
    else{
      navigate('/')
    }
  }
 
  if(text && leng && user && service){
    const screen = new ScreenLine({text, leng, user, service})
    return (
        <AppShell header={{ height: 77 }}>
          <AppShell.Header>
            <Header1 navigate={navigate} service={service} menu={screen.getMenuItems()} text={text} leng={leng} user={user} activeScreen={activeScreen} setActiveScreen={setActiveScreen}/>
          </AppShell.Header>
        
          <AppShell.Main>
            {screen.getScreen(
              activeScreen,
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
              newOrderRend: newOrderRend,
              setNewOrderRend: setNewOrderRend,
              orderData: orderData,
              setOrderData: setOrderData
              }
            )}
          </AppShell.Main>
          <ModalWindowPrint 
          openedPrint={openedPrint} 
          openedPrintHandlers={openedPrintHandlers}
          data={dataForPrint}
          service={service}
          user={user}
          text={text}
          leng={leng}
          />
        </AppShell>
    )
  }
  return (
    <LoaderShow/>
  )
  
}

export default  ServicePage
