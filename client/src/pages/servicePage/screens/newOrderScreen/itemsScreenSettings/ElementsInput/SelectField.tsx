import { Select} from '@mantine/core'
import React from 'react'


export function SelectField(props) {
  console.log(props.props.field)
  
    return (
            <Select
              label={props.props.field.item}
              withAsterisk={props.props.field.control}
              // @ts-ignore
              value={sessionStorage.getItem(`docInput_${props.props.field.item}`) ? JSON.parse(sessionStorage.getItem(`docInput_${props.props.field.item}`))[0] : null}
              placeholder={props.props.field.item}
              data={props.props.field.variants}
              onChange={(option) => {
                sessionStorage.setItem(`docInput_${props.props.field.item}`, option ? JSON.stringify([option]) : JSON.stringify(['']))
                props.props.props.setNewOrderRend(Date.now())
              }}
            />
          )
}