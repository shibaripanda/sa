import { TextInput} from '@mantine/core'
import React from 'react'


export function HandTextInput(props) {
  console.log(props.props.field)
    
    return (
            <TextInput
              label={props.props.field.item}
              withAsterisk={props.props.field.control}
              // @ts-ignore
              value={sessionStorage.getItem(`docInput_${props.props.field.item}`) ? JSON.parse(sessionStorage.getItem(`docInput_${props.props.field.item}`))[0] : ''}
              placeholder={props.props.field.item}
              onChange={(event) => {
                sessionStorage.setItem(`docInput_${props.props.field.item}`, event.target.value ? JSON.stringify([event.target.value]) : JSON.stringify(['']))
                props.props.props.setNewOrderRend(Date.now())
              }}
            />
          )
}