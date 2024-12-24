import React from 'react'
import { useEffect, useState } from 'react'
import { AuthClass } from '../../classes/AuthClass.ts'
import { TextClass } from '../../classes/TextClass.ts'
import { useNavigate } from 'react-router-dom'
import { useConnectSocket } from '../../modules/socket/hooks/useConnectSocket.ts'


function ServicePage() {

  const navigate = useNavigate()
  // @ts-ignore
  useConnectSocket(sessionStorage.getItem('currentUser') ? JSON.parse(sessionStorage.getItem('currentUser')).token : navigate('/'))

  const [leng, setLeng] = useState<string | false>(false)
  const [text, setText] = useState<any | false>(false)
  const [user, setUser] = useState<object | false>(false)
  const [serviceId, setServiceId] = useState<string | false>(false)

  useEffect(() => {
    getTexLengUserService()
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
    }
    else{
      navigate('/')
    }
  }


  if(text && leng && user && serviceId){
    return (
      <div>{text.hello[leng]} {serviceId}</div>
    )
  }
  return (
    <div>Loading</div>
  )
  
}

export default  ServicePage
