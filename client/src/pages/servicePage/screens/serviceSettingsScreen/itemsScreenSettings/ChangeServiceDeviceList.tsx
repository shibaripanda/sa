import { Button, Group, Text, TextInput } from '@mantine/core'
import React from 'react'
import { sendToSocket } from '../../../../../modules/socket/pipSendSocket.ts'
import { IconSquareX } from '@tabler/icons-react'
import { upFirstString } from '../../../../../modules/upFirstString.ts'

export function ChangeServiceDeviceList(props, message) {

    // console.log('ChangeServiceDeviceList', props, message)
    console.log('ChangeServiceDeviceList')

  return (
    <div>
        <Text fw={700} style={{marginBottom: 10}}>{props.text[message][props.leng]}</Text>
        {/* <Text> */}
          <Group style={{marginBottom: 10}}>{props.service.devices.map(item => 
            <Button variant='default' key={item}
            onClick={() => {
              sendToSocket(message, {
                serviceId: props.user.serviceId, 
                subServiceId: props.user.subServiceId, 
                device: item
              })
            }}>
              <IconSquareX color='red'/>{'\u00A0'}<Text>{item}</Text>
            </Button>)}
          </Group>
        {/* </Text> */}
        <TextInput placeholder={props.text.deviceName[props.leng]}
        value={props.props.device}
        onChange={(event) => {
          props.props.setDevice(upFirstString(event.target.value))
        }}/>
        <Button style={{marginTop: 10}}
        disabled={!props.props.device || props.service.devices.includes(props.props.device)}
        onClick={() => {
          sendToSocket(message, {
            serviceId: props.user.serviceId, 
            subServiceId: props.user.subServiceId, 
            device: props.props.device.toString()
          })
          props.props.setDevice('')
        }}
        >{props.text.add[props.leng]}
        </Button>
    </div>
  )
}