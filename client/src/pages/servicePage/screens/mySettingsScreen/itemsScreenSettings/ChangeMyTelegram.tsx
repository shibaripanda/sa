import { Button, Grid, Text } from '@mantine/core'
import React from 'react'

export function ChangeMyTelegram(props, item) {

  const disconect = () => {
    if(props.user.telegramId){
      return (
        <Button style={{marginTop: 10}}
            fullWidth
            variant='default'
            disabled={!props.user.telegramId}
            onClick={() => {
              props.props.updateUserData(0 ,'telegramId')
              props.user.disconectTelegram()
              props.props.setTelegramPass('Disconnect')
            }}
          >
            Disconnect
        </Button>
      )
    }
  }
  const getTest = () => {
    if(props.user.telegramId){
      return (
        <Button style={{marginTop: 10}}
          fullWidth
          variant='default'
          disabled={!props.user.telegramId}
          onClick={() => {
            props.user.testTelegram()
          }}
          >{props.text.test[props.leng]}
        </Button>
      )
    }
  }

  return (
    <div>
        <Text fw={700} style={{marginBottom: 10}}>{props.text[item.message][props.leng]} {props.user.telegramId ? '✅' : '❌'}</Text>

        <Grid>
          <Grid.Col span={4}>
            <Button style={{marginTop: 10}}
              fullWidth
              variant='default'
              onClick={() => {
                props.user.getTelegramPass()
              }}
              >
              Connect
            </Button>
          </Grid.Col>
          <Grid.Col span={4}>
            {disconect()}
          </Grid.Col>
          <Grid.Col span={4}>
            {getTest()}
          </Grid.Col>
        </Grid>
    </div>
  )
}