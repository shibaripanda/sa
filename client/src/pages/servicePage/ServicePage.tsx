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

function ServicePage() {

  const navigate = useNavigate()
  // @ts-ignore
  useConnectSocket(sessionStorage.getItem('currentUser') ? JSON.parse(sessionStorage.getItem('currentUser')).token : navigate('/'))

  const [leng, setLeng] = useState<string | false>(false)
  const [text, setText] = useState<any | false>(false)
  const [user, setUser] = useState<object | false>(false)
  const [serviceId, setServiceId] = useState<string | false>(false)
  const [activeScreen, setActiveScreen] = useState(0)
  const [service, setService] = useState<object | false>(false)

  useEffect(() => {
    getTexLengUserService()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getTexLengUserService = async () => {
    const authClass = new AuthClass()
    const textClass = new TextClass()
    const t1 = authClass.getServiceId()
    const t2 = await textClass.getLeng()
    const t3 = await textClass.getText()
    const t4 = await authClass.getCurrentUser()
    if(t1 && t2 && t3 && t4){
      setServiceId(t1)
      setLeng(t2)
      setText(t3)
      setUser(t4)
      getFromSocket([
                  {message: `getServiceById${authClass.getServiceId()}`, handler: setService}
              ])
      sendToSocket('getServiceById', {serviceId: authClass.getServiceId()})
    }
    else{
      navigate('/')
    }
  }


  if(text && leng && user && serviceId && service){
    const screen = new ScreenLine({text, leng, user, serviceId, service})
    return (
      <div>
        <Header1 menu={screen.getMenuItems()} text={text} leng={leng} user={user} activeScreen={activeScreen} setActiveScreen={setActiveScreen}/>
        {screen.getScreen(activeScreen)}
      </div>
    )
  }
  return (
    <div>Loading</div>
  )
  
}

export default  ServicePage
