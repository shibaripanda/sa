import { TextInput} from '@mantine/core'
import React, { useState } from 'react'


export function HandTextInput(props) {
  console.log(props.props.field)

  const [data, setData] = useState(sessionStorage.getItem(`docInput_${props.props.field.item}`) ? sessionStorage.getItem(`docInput_${props.props.field.item}`) : '')
    
    return (
            <TextInput
              label={props.props.field.item}
              withAsterisk={props.props.field.control}
              value={data}
              placeholder={props.props.field.item}
              data={props.props.field.variants}
              onChange={(event) => {
                setData(event.target.value)
                sessionStorage.setItem(`docInput_${props.props.field.item}`, event.target.value ? event.target.value : '')
                // props.props.setNewOrderRend(Date.now())
              }}
              // onChange={(_value, option) => sessionStorage.setItem(`docInput_${props.props.field.item}`, option)}
            />
          )
}