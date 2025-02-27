import { Anchor, Button, Group, Text, TextInput } from '@mantine/core'
import React from 'react'
import { sendToSocket } from '../../../../../modules/socket/pipSendSocket.ts'

export function ChangeMyTelegram(props, item) {

  console.log('ChangeMyTelegram')
// @ts-ignore
  const link = process.env.REACT_APP_BOTLINK

  return (
    <div>
        <Text fw={700} style={{marginBottom: 10}}>{props.text[item.message][props.leng]}</Text>
          <Text>{props.user.telegramConnect ? '✅' : '❌'}</Text>
          <Group>
            <Anchor href={link + `?start=${props.user._id}`} target="_blank">Connect</Anchor>
            <Anchor href="https://mantine.dev/" target="_blank">Disconnect</Anchor>
          </Group>
          <Group>
            <Button style={{marginTop: 10}}
            color='green'
            // disabled={!props.user.telegramConnect}
            onClick={() => {
              sendToSocket('connectTelegram', {
                serviceId: props.user.serviceId, 
                subServiceId: props.user.subServiceId
              })
            }}
            >Connect
            </Button>
            <Button style={{marginTop: 10}}
            disabled={!props.user.telegramConnect}
            onClick={() => {
              sendToSocket('testTelegram', {
                serviceId: props.user.serviceId, 
                subServiceId: props.user.subServiceId
              })
            }}
            >Тест
            </Button>
          </Group>
    </div>
  )
}
