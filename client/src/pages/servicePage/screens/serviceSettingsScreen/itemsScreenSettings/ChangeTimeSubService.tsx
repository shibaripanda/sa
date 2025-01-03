import { Button, Text, TextInput } from '@mantine/core'
import React from 'react'
import { sendToSocket } from '../../../../../modules/socket/pipSendSocket.ts'

export function ChangeTimeSubService(props, message) {

    console.log('ChangeTimeSubService', props, message)

  return (
    <div>
        <Text fw={700} style={{marginBottom: 10}}>{props.text[message][props.leng]}</Text>
        <Text>{props.service.subWorkTime ? props.service.subWorkTime : '*' + props.text.notSet[props.leng] + '*'}</Text>
        <TextInput placeholder={props.text.workTime[props.leng]}
        value={props.props.workTime}
        onChange={(event) => {
          props.props.setWorkTime(event.target.value)
        }}/>
        <Button style={{marginTop: 10}}
        disabled={!props.props.workTime}
        onClick={() => {
          sendToSocket(message, {
            serviceId: props.user.serviceId, 
            subServiceId: props.user.subServiceId, 
            workTime: props.props.workTime.toString(),
            data: 'workTime'
          })
          props.props.setWorkTime('')
        }}
        >{props.text.save[props.leng]}
        </Button>
    </div>
  )
}