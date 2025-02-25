import { Button, NumberInput, Text } from '@mantine/core'
import React from 'react'
import { sendToSocket } from '../../../../../modules/socket/pipSendSocket.ts'

export function ChangeFeeService(props, message) {

    console.log('ChangeFeeService')
    console.log('props.service', props.service.fee)

  return (
    <div>
        <Text fw={700} style={{marginBottom: 10}}>{props.text[message][props.leng]}</Text>
        <Text>{props.service.fee ? props.service.fee : 0} %</Text>
        <NumberInput placeholder={props.text[message][props.leng]}
        value={props.props.newFee}
        onChange={(event) => {
          props.props.setNewFee(event)
        }}/>
        <Button style={{marginTop: 10}}
        disabled={!props.props.newFee && (props.props.newFee !== 0)}
        onClick={() => {
          sendToSocket(message, {
            serviceId: props.user.serviceId, 
            subServiceId: props.user.subServiceId, 
            fee: props.props.newFee
          })
          props.props.setNewFee(null)
        }}
        >{props.text.save[props.leng]}
        </Button>
    </div>
  )
}