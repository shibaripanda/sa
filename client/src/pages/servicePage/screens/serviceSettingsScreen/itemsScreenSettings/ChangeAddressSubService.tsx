import { Button, Text, TextInput } from '@mantine/core'
import React from 'react'

export function ChangeAddressSubService(props, message) {

  return (
    <div>
        <Text fw={700} style={{marginBottom: 10}}>{props.text[message][props.leng]}</Text>
        <Text>{props.service.subAddress ? props.service.subAddress : '*' + props.text.notSet[props.leng] + '*'}</Text>
        <TextInput placeholder={props.text.workAddress[props.leng]}
        value={props.props.address}
        onChange={(event) => {
          props.props.setAddress(event.target.value)
        }}/>
        <Button style={{marginTop: 10}}
        disabled={!props.props.address}
        onClick={() => {
          props.user.changeAddressSubService(props.props.address.toString(), 'address')
          props.props.setAddress('')
        }}
        >{props.text.save[props.leng]}
        </Button>
    </div>
  )
}