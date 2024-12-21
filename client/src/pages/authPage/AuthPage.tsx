import React from 'react'
import { useEffect, useState } from 'react'
import { AuthClass } from '../../classes/AuthClass.ts'

function AuthPage() {
  
  const [res, setRes] = useState('')
  const auth = new AuthClass()

  const getRes = async () => {
    setRes(await auth.startRequest("test@xf.xf", 'ru', 5555))
  }

  getRes()

  // useEffect(() => {
  //     getRes()
  // }, [])

  

  


  return (
    <div>Hello App {res}</div>
  )

}

export default  AuthPage
