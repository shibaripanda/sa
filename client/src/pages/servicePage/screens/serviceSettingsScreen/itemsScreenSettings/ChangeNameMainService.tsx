import { Button, Text, TextInput } from '@mantine/core'
import React from 'react'
import { editString } from '../../../../../modules/testStringSimbols.js'

export function ChangeNameMainService(props, message) {


  return (
    <div>
        <Text fw={700} style={{marginBottom: 10}}>{props.text[message][props.leng]}</Text>
        <Text>{props.service.name}</Text>
        <TextInput placeholder={props.text.newNameForService[props.leng]}
        value={props.props.newServiceName}
        onChange={(event) => {
          props.props.setNewSeviceName(editString(event.target.value))
        }}/>
        <Button style={{marginTop: 10}}
        disabled={!props.props.newServiceName}
        onClick={() => {
          props.user.changeNameMainService(props.props.newServiceName.toString())
          props.props.setNewSeviceName('')
        }}
        >{props.text.save[props.leng]}
        </Button>
    </div>
  )
}