import { Button, Group, Text, TextInput } from '@mantine/core'
import React from 'react'
import { sendToSocket } from '../../../../../modules/socket/pipSendSocket.ts'
import { IconLockSquare, IconSquareX } from '@tabler/icons-react'
import { upFirstString } from '../../../../../modules/upFirstString.ts'

export function ChangeServiceStatusList(props, message) {

    console.log('ChangeServiceStatusList', props, message)

    const iconStatus = (item) => {
      if(!['New', 'Ready'].includes(item)){
        return <IconSquareX color='red'/>
      }
      return <IconLockSquare/>
    }
    // payload.device[0].toUpperCase() + payload.device.slice(1, payload.device.length).toLowerCase()
  return (
    <div>
        <Text fw={700} style={{marginBottom: 10}}>{props.text[message][props.leng]}</Text>
          <Group style={{marginBottom: 10}}>{props.service.statuses.map(item => 
            <Button variant='default' key={item}
            onClick={() => {
              if(!['New', 'Ready'].includes(item)){
                sendToSocket(message, {
                  serviceId: props.user.serviceId, 
                  subServiceId: props.user.subServiceId, 
                  status: item
                })
              }
            }}>
              {iconStatus(item)}{'\u00A0'}<Text>{item}</Text>
            </Button>)}
          </Group>
        <TextInput placeholder={props.text.statusName[props.leng]}
        value={props.props.status}
        onChange={(event) => {
          props.props.setStatus(upFirstString(event.target.value))
        }}/>
        <Button style={{marginTop: 10}}
        disabled={!props.props.status || props.service.statuses.includes(props.props.status)}
        onClick={() => {
          sendToSocket(message, {
            serviceId: props.user.serviceId, 
            subServiceId: props.user.subServiceId, 
            status: props.props.status.toString()
          })
          props.props.setStatus('')
        }}
        >{props.text.add[props.leng]}
        </Button>
    </div>
  )
}