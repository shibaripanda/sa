import React from 'react'
import { useEffect, useState } from 'react'
import { AuthClass } from '../../classes/AuthClass.ts'
import { AuthForm } from './authForm/AuthForm.tsx'
import { TextClass } from '../../classes/TextClass.ts'
import { useNavigate } from 'react-router-dom'

function AuthPage() {

  const navigate = useNavigate()
  const [email, setEmail] = useState<string>('')
  const [leng, setLeng] = useState<string>(window.navigator.language.substring(0,2) ? window.navigator.language.substring(0,2) : 'en')
  const [authCode, setAuthCode] = useState<number>()
  const [text, setText] = useState<object | false>(false)
  const [avLeng, setAvLeng] = useState<[] | false>(false)

  const authClass = new AuthClass()
  const textClass = new TextClass()

  useEffect(() => {
    getLeguagePack()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getLeguagePack = async () => {
    const res = await textClass.getTextPackFromServer()
    if(res){
      setAvLeng(res.lengPack)
      setLeng(res.lengPack.map((item: { index: string }) => item.index).includes(leng) ? leng : 'en')
      setText(res.text)
    }
    else{
      navigate('/')
    }
  }

  if(text){
    return (
      <AuthForm
      setLeng={setLeng} 
      email={email} 
      setEmail={setEmail} 
      authCode={authCode} 
      setAuthCode={setAuthCode}
      text={text}
      leng={leng}
      authClass={authClass}
      avLeng={avLeng}
      />
    )
  }
  return (
    <div>Loading</div>
  )
  
}

export default  AuthPage
