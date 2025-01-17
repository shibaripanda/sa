import { Button, Grid, Group, Select, Text, TextInput } from '@mantine/core'
import React from 'react'
import { sendToSocket } from '../../../../../modules/socket/pipSendSocket.ts'

export function CreateOrderScreen(props, message) {

  console.log('CreateOrderScreen')

  const activData = props.service.orderData.filter(item => !item.hidden)

    return (
      <div>
          <Text fw={700} style={{marginBottom: 10}}>{props.text[message][props.leng]}</Text>

          <Grid>
            {activData.map(item => 
            <Grid.Col key={item.item} span={props.props.screenSizeNewOrder}>
              <TextInput placeholder={item.item}
                withAsterisk={item.control}
                label={item.item}
                // @ts-ignore
                value={sessionStorage.getItem(`docInput_${item.item}`) ? sessionStorage.getItem(`docInput_${item.item}`) : ''}
                onChange={(event) => {
                  sessionStorage.setItem(`docInput_${item.item}`, event.target.value)
                  props.props.setNewOrderRend(Date.now())
                }}
                />
            </Grid.Col>)}
          </Grid>

          {/* <Group grow>
            <TextInput placeholder={'email'}
          value={props.props.emailForNewUser}
          onChange={(event) => {
            props.props.setEmailForNewUser(event.target.value.toLowerCase())
          }}
          />
          <Select placeholder={'role'}
          value={props.props.role}
          onChange={props.props.setRole}
          data={props.service.roles.map(item => item.role)}
          />
          </Group> */}
          <Group grow style={{marginTop: '3vmax'}}>
            <Button 
              disabled={false}
              onClick={() => {
                for(const i of activData.map(item => item.item)){
                  sessionStorage.removeItem(`docInput_${i}`)
                  props.props.setNewOrderRend(Date.now())
                }
              }}
              >Clear
            </Button>
            <Button
              disabled={false}
              onClick={() => {
                sendToSocket('addRoleToUser', {
                  serviceId: props.user.serviceId, 
                  subServiceId: props.user.subServiceId, 
                  email: props.props.emailForNewUser.toLowerCase(),
                  role: props.props.role
                })
                props.props.setEmailForNewUser('')
                props.props.setSettingsFilter(props.props.emailForNewUser.toLowerCase())
              }}
              >{props.text.add[props.leng]}
            </Button>
          </Group>
      </div>
    )
}