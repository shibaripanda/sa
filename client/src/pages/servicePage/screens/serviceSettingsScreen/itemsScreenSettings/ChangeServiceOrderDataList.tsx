import { Button, Text, TextInput } from '@mantine/core'
import React from 'react'
import { sendToSocket } from '../../../../../modules/socket/pipSendSocket.ts'
import { DragAndDrop } from './DragAndDrop/DragAndDrop.tsx'

export function ChangeServiceOrderDataList(props, message) {

  console.log('ChangeServiceOrderDataList')

  if(props.props.dragDrop.length !== props.service.orderData.length){
    props.props.setDragDrop.setState(props.service.orderData)
  }

  return (
    <div>
        <Text fw={700} style={{marginBottom: 10}}>{props.text[message][props.leng]}</Text>

        {DragAndDrop(props, message)}
        
        <TextInput placeholder={props.text.statusName[props.leng]}
        value={props.props.newOrderData}
        onChange={(event) => {
          props.props.setNewOrderData(event.target.value)
        }}/>
        <Button style={{marginTop: 10}}
        disabled={!props.props.newOrderData || props.service.orderData.map(item => item.item).includes(props.props.newOrderData)}
        onClick={() => {
          sendToSocket(message, {
            serviceId: props.user.serviceId, 
            subServiceId: props.user.subServiceId, 
            newOrderData: props.props.newOrderData.toString()
          })
          props.props.setNewOrderData('')
          
        }}
        >{props.text.add[props.leng]}
        </Button>
    </div>
    )
}