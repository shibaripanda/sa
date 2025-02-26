import { NumberInput, TextInput} from '@mantine/core'
import React from 'react'


export function HandTextInput(props) {
  console.log('HandTextInput')

  const deviceName = (name) => {
    if(name === '_DeviceBlocked_'){
      return props.props.text.device[props.props.leng]
    }
    return name
  }
    
  if(props.props.field.number){
    return (
      <NumberInput
        step={10}
        label={deviceName(props.props.field.item)}
        withAsterisk={props.props.field.control}
        // @ts-ignore
        value={sessionStorage.getItem(`docInput_${props.props.field.item}`) ? JSON.parse(sessionStorage.getItem(`docInput_${props.props.field.item}`))[0] : ''}
        placeholder={deviceName(props.props.field.item)}
        onChange={(event) => {
          sessionStorage.setItem(`docInput_${props.props.field.item}`, event ? JSON.stringify([event]) : JSON.stringify(['']))
          props.props.props.setNewOrderRend(Date.now())
        }}
      />
    )
  }
  return (
        <TextInput
          label={deviceName(props.props.field.item)}
          withAsterisk={props.props.field.control}
          // @ts-ignore
          value={sessionStorage.getItem(`docInput_${props.props.field.item}`) ? JSON.parse(sessionStorage.getItem(`docInput_${props.props.field.item}`))[0] : ''}
          placeholder={deviceName(props.props.field.item)}
          onChange={(event) => {
            sessionStorage.setItem(`docInput_${props.props.field.item}`, event.target.value ? JSON.stringify([event.target.value]) : JSON.stringify(['']))
            props.props.props.setNewOrderRend(Date.now())
          }}
        />
      )
}