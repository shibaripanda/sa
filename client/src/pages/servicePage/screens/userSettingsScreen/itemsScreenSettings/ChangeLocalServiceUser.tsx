import { Button, Group, Select, Text, TextInput } from '@mantine/core'
import React from 'react'

export function ChangeLocalServiceUser(props, message) {


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
          <Select placeholder={'role'}
          value={props.props.role}
          onChange={props.props.setRole}
          data={props.service.roles.map(item => item.role)}
          />
          </Group>
          <Button style={{marginTop: 10}}
          disabled={
            !props.props.emailForNewUser ||
            props.props.usersLocal.map(item => item.email.toLowerCase()).includes(props.props.emailForNewUser.toLowerCase()) || 
            !props.props.role
          }
          onClick={() => {
            props.user.addRoleToUser(props.props.emailForNewUser.toLowerCase(), props.props.role)
            props.props.setEmailForNewUser('')
            props.props.setSettingsFilter(props.props.emailForNewUser.toLowerCase())
          }}
          >{props.text.add[props.leng]}
          </Button>
      </div>
    )
}