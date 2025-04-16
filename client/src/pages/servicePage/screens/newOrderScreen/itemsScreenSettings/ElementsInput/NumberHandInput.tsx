import { NumberInput } from '@mantine/core'
import React from 'react'
import { deviceName } from '../../../../../../modules/deviceName.ts'


export function NumberHandInput(props) {
  const fieldName = props.props.field.item

  return (
    <NumberInput
      step={10}
      label={deviceName(fieldName, props.props.text.device[props.props.leng])}
      withAsterisk={props.props.field.control}
      // @ts-ignore
      value={sessionStorage.getItem(`docInput_${fieldName}`) ? JSON.parse(sessionStorage.getItem(`docInput_${fieldName}`))[0] : ''}
      placeholder={deviceName(fieldName, props.props.text.device[props.props.leng])}
      onChange={(event) => {
        sessionStorage.setItem(`docInput_${fieldName}`, event ? JSON.stringify([event]) : JSON.stringify(['']))
        props.props.props.setNewOrderRend(Date.now())
      }}
    />
  )
}