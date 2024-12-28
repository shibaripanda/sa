import { Button, Text, TextInput } from '@mantine/core'
import React from 'react'
import { sendToSocket } from '../../../../../modules/socket/pipSendSocket.ts'

export function ChangeNameSubService(props) {

    console.log('ChangeNameMainService')

  return (
    <div>
        <Text fw={700} style={{marginBottom: 10}}>{props.text.editingNameService[props.leng]}</Text>
        <Text>{props.service.name}</Text>
        <TextInput placeholder={props.text.newNameForService[props.leng]}/>
        <Button style={{marginTop: 10}}
        onClick={() => {
          sendToSocket('changeNameSubService', {
            serviceId: sessionStorage.getItem('serviceId'), 
            subServiceId: sessionStorage.getItem('subServiceId'), 
            newName: 'Супер сервис 9'
          })
        }}
        >{props.text.save[props.leng]}
        </Button>
    </div>
  )
}