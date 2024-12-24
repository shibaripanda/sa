import React from 'react'
import { useEffect, useState } from 'react'
import { AuthClass } from '../../classes/AuthClass.ts'
import { TextClass } from '../../classes/TextClass.ts'
import { useNavigate } from 'react-router-dom'


function ServicePage() {
  
  const authClass = new AuthClass()
  const textClass = new TextClass()

  const navigate = useNavigate()
  // @ts-ignore
  const [leng] = useState<string | false>(textClass.getLeng())
  const [text] = useState<object | false>(textClass.getText())
  const [user] = useState<object | false>(authClass.getCurrentUser())


  useEffect(() => {
  }, [])


  if(text){
    return (
      <div>dddfdfdfdf</div>
    )
  }
  return (
    <div>Loading</div>
  )
  
}

export default  ServicePage
