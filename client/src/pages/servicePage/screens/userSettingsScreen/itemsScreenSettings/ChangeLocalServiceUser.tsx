import { Button, Group, Select, Text, TextInput } from '@mantine/core'
import React from 'react'
import { sendToSocket } from '../../../../../modules/socket/pipSendSocket.ts'

export function ChangeLocalServiceUser(props, message) {

  console.log('ChangeServiceUser')
  

    return (
      <div>
          <Text fw={700} style={{marginBottom: 10}}>{props.text[message][props.leng]}</Text>
          <Group grow>
            <TextInput placeholder={'email'}
          value={props.props.emailForNewUser}
          onChange={(event) => {
            props.props.setEmailForNewUser(event.target.value.toLowerCase())
          }}
          />
          <Select placeholder={'local service'}
          value={props.props.subService}
          onChange={props.props.setSubService}
          data={props.service.subServices.map(item => item.name)}
          />
          <Select placeholder={'role'}
          value={props.props.role}
          onChange={props.props.setRole}
          data={props.service.roles.map(item => item.role)}
          />
          </Group>
          <Button style={{marginTop: 10}}
          disabled={
            !props.props.emailForNewUser || 
            !props.props.subService ||
            props.props.users.map(item => item.email.toLowerCase()).includes(props.props.emailForNewUser.toLowerCase()) || 
            !props.props.role
          }
          onClick={() => {
            sendToSocket('addRoleToUser', {
              serviceId: props.user.serviceId, 
              subServiceId: props.service.subServices.find(item => item.name === props.props.subService).subServiceId, 
              email: props.props.emailForNewUser.toLowerCase(),
              role: props.props.role
            })
            props.props.setSubService('')
            props.props.setEmailForNewUser('')
            props.props.setSettingsFilter(props.props.emailForNewUser.toLowerCase())
          }}
          >{props.text.add[props.leng]}
          </Button>
      </div>
    )
}