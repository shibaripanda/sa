import { Button, Text, TextInput } from '@mantine/core'
import React from 'react'
import { sendToSocket } from '../../../../../modules/socket/pipSendSocket.ts'
import { LoaderShow } from '../../../../../components/Loader/LoaderShow.tsx'

export function ChangeMyName(props, item) {

  console.log('ChangeMyName')

  // if(!props.props[item.newData]){
  //   sendToSocket(item.message, {
  //     serviceId: props.user.serviceId, 
  //     subServiceId: props.user.subServiceId
  //   })
  // }
  
  // if(props.props[item.newData]){

      return (
        <div>
            <Text fw={700} style={{marginBottom: 10}}>{props.text[item.message][props.leng]}</Text>
              <Text>{props.user[item.data] ? props.user[item.data] : props.text.notSet[props.leng]}</Text>
              <TextInput placeholder={props.text[item.title][props.leng]}
              value={props.props[item.newData]}
              onChange={(event) => {
                props.props[item.setData](event.target.value)
              }}/>
              <Button style={{marginTop: 10}}
              disabled={!props.props[item.newData]}
              onClick={() => {
                sendToSocket(item.message, {
                  serviceId: props.user.serviceId, 
                  subServiceId: props.user.subServiceId, 
                  [item.res]: props.props[item.newData].toString()
                })
                props.props[item.setData]('')
              }}
              >{props.text.save[props.leng]}
              </Button>
        </div>
      )
    // }
    // else{
    //   return (
    //     LoaderShow()
    //   )
    // }
}