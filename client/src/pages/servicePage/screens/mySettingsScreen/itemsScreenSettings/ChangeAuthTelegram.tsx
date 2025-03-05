import { Anchor, Button, Checkbox, Group, SegmentedControl, Text, TextInput } from '@mantine/core'
import React from 'react'
import { sendToSocket } from '../../../../../modules/socket/pipSendSocket.ts'

export function ChangeAuthTelegram(props, item) {

  console.log('ChangeAuthTelegram', props.props.newOrderRend)

  console.log(props.user.passwordToTelegram)

  if(!props.props.passwordToTelegram){
    props.props.setPasswordToTelegram(props.user.passwordToTelegram ? 'telegram' : 'email')
  }

  // passwordToTelegram, setPasswordToTelegram
  if(props.props.passwordToTelegram){
      return (
      <div>
          <Text fw={700} style={{marginBottom: 10}}>{props.text[item.message][props.leng]} {props.user.telegramId ? '✅' : '❌'}</Text>

          <Group justify="space-between">
            <SegmentedControl
              disabled={!props.user.telegramId}
              value={props.props.passwordToTelegram}
              onChange={(event) => {
                props.props.updateUserData(event === 'telegram' ? true : false ,'passwordToTelegram')
                sendToSocket(item.message, {
                  serviceId: props.user.serviceId, 
                  subServiceId: props.user.subServiceId,
                  passwordToTelegram: event === 'telegram' ? true : false,
                  time: props.props.newOrderRend
                })
                props.props.setPasswordToTelegram(event)
              }}
              data={['email','telegram']}
            />
          </Group>
      </div>
    )
  }

  
}