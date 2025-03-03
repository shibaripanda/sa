import { Anchor, Button, Group, Text, TextInput } from '@mantine/core'
import React from 'react'
import { sendToSocket } from '../../../../../modules/socket/pipSendSocket.ts'

export function ChangeMyTelegram(props, item) {

  console.log('ChangeMyTelegram')
// @ts-ignore
  const link = process.env.REACT_APP_BOTLINK

  const getLink = () => {
    if(props.props.telegramPass && props.props.telegramPass.length && props.props.telegramPass.length > 8 && props.props.telegramPass.length < 10){
      return (
        <Anchor href={link + props.props.telegramPass} target="_blank">Connect</Anchor>
      )
    }
  }
  const getTest = () => {
    if(props.user.telegramConnect){
      return (
        <Button style={{marginTop: 10}}
            disabled={!props.user.telegramConnect}
            onClick={() => {
              sendToSocket('testTelegram', {
                serviceId: props.user.serviceId, 
                subServiceId: props.user.subServiceId
              })
            }}
          >{props.text.test[props.leng]}
        </Button>
      )
    }
  }

  return (
    <div>
        <Text fw={700} style={{marginBottom: 10}}>{props.text[item.message][props.leng]} {props.user.telegramConnect ? '✅' : '❌'}</Text>
        <TextInput
          label={props.text.activCode[props.leng]}
          onChange={(event) => props.props.setTelegramPass(event.target.value)}
        />

        <Group justify="space-between">
          <Button style={{marginTop: 10}}
              color='green'
              onClick={() => {
                sendToSocket('getTelegramPass', {
                  serviceId: props.user.serviceId, 
                  subServiceId: props.user.subServiceId
                })
              }}
            >{props.text.getActivCode[props.leng]}
          </Button>
          {getTest()}
          {getLink()}
        </Group>
    </div>
  )
}