import { useState } from 'react'
import { Autocomplete, CheckIcon, Combobox, Group, Pill, PillsInput, useCombobox } from '@mantine/core'
import React from 'react'


export function MultSelectCreateOne(props) {
  const fieldName = props.props.field.item
  const valueName = sessionStorage.getItem(`docInput_${fieldName}`)
  // @ts-ignore
  const [value, setValue] = useState<string[]>(valueName ? JSON.parse(valueName) : [])

  const deviceName = (name) => {
    if(name === '_DeviceBlocked_'){
      return props.props.text.device[props.props.leng]
    }
    return name
  }
  
  return (
    <Autocomplete 
    label={deviceName(fieldName)} 
    data={props.props.field.variants} 
    value={value[0]} 
    onChange={(event) => {
      setValue(JSON.parse([event]))
      sessionStorage.setItem(`docInput_${fieldName}`, JSON.stringify([event]))
    }} 
    />
  )
}