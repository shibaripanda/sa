import { Button, Text, TextInput } from '@mantine/core'
import React from 'react'
import { sendToSocket } from '../../../../../modules/socket/pipSendSocket.ts'

export function ChangeNameSubService(props, message) {

    console.log('ChangeNameSubService', props, message)

  return (
    <div>
        <Text fw={700} style={{marginBottom: 10}}>{props.text[message][props.leng]}</Text>
        <Text>{props.service.subName}</Text>
        <TextInput placeholder={props.text.newNameForSubService[props.leng]}
        value={props.props.newSubServiceName}
        onChange={(event) => {
          props.props.setSubNewSeviceName(event.target.value)
        }}/>
        <Button style={{marginTop: 10}}
        disabled={!props.props.newSubServiceName}
        onClick={() => {
          sendToSocket(message, {
            serviceId: props.user.serviceId, 
            subServiceId: props.user.subServiceId, 
            newName: props.props.newSubServiceName.toString()
          })
          props.props.setSubNewSeviceName('')
        }}
        >{props.text.save[props.leng]}
        </Button>
    </div>
  )
}