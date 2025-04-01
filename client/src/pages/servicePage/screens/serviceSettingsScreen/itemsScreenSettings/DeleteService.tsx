import { Button, Text, TextInput } from '@mantine/core'
import React from 'react'

export function DeleteService(props, message) {


  return (
    <div>
        <Text fw={700} style={{marginBottom: 10}}>{props.text[message][props.leng]}</Text>
        <TextInput placeholder={props.text.changeNameMainService[props.leng]}
        value={props.props.deleteServiceName}
        onChange={(event) => {
          props.props.setDeleteServiceName(event.target.value)
        }}/>
        <Button style={{marginTop: 10}}
        disabled={!props.props.deleteServiceName || props.props.deleteServiceName.toLowerCase() !== props.service.name.toLowerCase()}
        color='red'
        onClick={() => {
          props.user.deleteService()
          props.props.setDeleteServiceName('')
        }}
        >{props.text.deleteServiceWarning[props.leng]}
        </Button>
    </div>
  )
}