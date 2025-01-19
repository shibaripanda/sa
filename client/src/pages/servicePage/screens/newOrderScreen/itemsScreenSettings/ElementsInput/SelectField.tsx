import { Select} from '@mantine/core'
import React, { useState } from 'react'


export function SelectField(props) {
  console.log(props.props.field)

  const [data, setData] = useState(sessionStorage.getItem(`docInput_${props.props.field.item}`) ? sessionStorage.getItem(`docInput_${props.props.field.item}`) : '')
    
    return (
            <Select
              label={props.props.field.item}
              withAsterisk={props.props.field.control}
              value={data}
              placeholder={props.props.field.item}
              data={props.props.field.variants}
              onChange={(option) => {
                setData(option)
                sessionStorage.setItem(`docInput_${props.props.field.item}`, option ? option : '')
                // props.props.setNewOrderRend(Date.now())
              }}
              // onChange={(_value, option) => sessionStorage.setItem(`docInput_${props.props.field.item}`, option)}
            />
          )
}