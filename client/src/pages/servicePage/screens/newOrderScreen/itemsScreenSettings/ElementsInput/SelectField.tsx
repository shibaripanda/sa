import { Select} from '@mantine/core'
import React from 'react'
import { deviceName } from '../../../../../../modules/deviceName.ts'


export function SelectField(props) {
  const fieldName = props.props.field.item

  const dataData = (name) => {
    if(name === '_DeviceBlocked_'){
      return props.props.service.devices
    }
    return props.props.field.variants
  }
  
    return (
            <Select
              label={deviceName(fieldName, props.props.text.device[props.props.leng])}
              withAsterisk={props.props.field.control}
              // @ts-ignore
              value={sessionStorage.getItem(`docInput_${fieldName}`) ? JSON.parse(sessionStorage.getItem(`docInput_${fieldName}`))[0] : null}
              placeholder={deviceName(fieldName, props.props.text.device[props.props.leng])}
              data={dataData(fieldName)}
              onChange={(option) => {
                sessionStorage.setItem(`docInput_${fieldName}`, option ? JSON.stringify([option]) : JSON.stringify(['']))
                props.props.props.setNewOrderRend(Date.now())
              }}
            />
          )
}