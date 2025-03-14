import { Button, Text, TextInput } from '@mantine/core'
import React from 'react'
import { sendToSocket } from '../../../../../modules/socket/pipSendSocket.ts'
import { editString } from '../../../../../modules/testStringSimbols.js'

export function ChangeNameMainService(props, message) {

    // console.log('ChangeNameMainService', props, message)
    console.log('ChangeNameMainService')

  return (
    <div>
        <Text fw={700} style={{marginBottom: 10}}>{props.text[message][props.leng]}</Text>
        <Text>{props.service.name}</Text>
        <TextInput placeholder={props.text.newNameForService[props.leng]}
        value={props.props.newServiceName}
        onChange={(event) => {
          props.props.setNewSeviceName(editString(event.target.value))
        }}/>
        <Button style={{marginTop: 10}}
        disabled={!props.props.newServiceName}
        onClick={() => {
          sendToSocket(message, {
            serviceId: props.user.serviceId, 
            subServiceId: props.user.subServiceId, 
            newName: props.props.newServiceName.toString()
          })
          props.props.setNewSeviceName('')
        }}
        >{props.text.save[props.leng]}
        </Button>
    </div>
  )
}