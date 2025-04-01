import { Button, Text, TextInput } from '@mantine/core'
import React from 'react'
import { DragAndDrop } from './DragAndDrop/DragAndDrop.tsx'
import { editString } from '../../../../../modules/testStringSimbols.js'

export function ChangeServiceOrderDataList(props, message) {

  console.log('now1', message)


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
          props.props.setNewOrderData(editString(event.target.value))
        }}/>
        <Button style={{marginTop: 10}}
        disabled={
          !props.props.newOrderData || 
          props.service.orderData.map(item => item.item).includes(props.props.newOrderData) || 
          props.props.newOrderData.includes('.') || 
          props.props.newOrderData.includes('_')
        }
        onClick={() => {
          props.user.changeServiceOrderDataList(props.props.newOrderData.toString())
          props.props.setNewOrderData('')
          
        }}
        >{props.text.add[props.leng]}
        </Button>
    </div>
    )
}