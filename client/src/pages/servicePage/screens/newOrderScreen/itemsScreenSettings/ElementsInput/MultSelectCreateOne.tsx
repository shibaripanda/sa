import { Autocomplete } from '@mantine/core'
import React from 'react'
import { deviceName } from '../../../../../../modules/deviceName.ts'


export function MultSelectCreateOne(props) {
  console.log('update', 'MultSelectCreateOne')
  const fieldName = props.props.field.item

  return (
    <Autocomplete
    withAsterisk={props.props.field.control}
    placeholder={deviceName(fieldName, props.props.text.device[props.props.leng])} 
    label={deviceName(fieldName, props.props.text.device[props.props.leng])} 
    data={props.props.field.variants}
    // @ts-ignore 
    value={sessionStorage.getItem(`docInput_${fieldName}`) ? JSON.parse(sessionStorage.getItem(`docInput_${fieldName}`))[0] : ''} 
    onChange={(event) => {
      sessionStorage.setItem(`docInput_${fieldName}`, event ? JSON.stringify([event]) : JSON.stringify(['']))
      props.props.props.setNewOrderRend(Date.now())
    }} 
    />
  )
}