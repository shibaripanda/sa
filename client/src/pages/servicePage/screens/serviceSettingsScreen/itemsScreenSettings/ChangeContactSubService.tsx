import { Button, Text, TextInput } from '@mantine/core'
import React from 'react'
import { sendToSocket } from '../../../../../modules/socket/pipSendSocket.ts'

export function ChangeContactSubService(props, message) {

    console.log('ChangeContactSubService', props, message)

  return (
    <div>
        <Text fw={700} style={{marginBottom: 10}}>{props.text[message][props.leng]}</Text>
        <Text>{props.service.subContact ? props.service.subContact : '*' + props.text.notSet[props.leng] + '*'}</Text>
        <TextInput placeholder={props.text.workContact[props.leng]}
        value={props.props.contact}
        onChange={(event) => {
          props.props.setContact(event.target.value)
        }}/>
        <Button style={{marginTop: 10}}
        disabled={!props.props.contact}
        onClick={() => {
          sendToSocket(message, {
            serviceId: props.user.serviceId, 
            subServiceId: props.user.subServiceId, 
            contact: props.props.contact.toString(),
            data: 'contact'
          })
          props.props.setContact('')
        }}
        >{props.text.save[props.leng]}
        </Button>
    </div>
  )
}