import { Button, Text, TextInput } from '@mantine/core'
import React from 'react'

export function ChangeInfoMainService(props, message) {

  console.log(message)
  return (
    <div>
        <Text fw={700} style={{marginBottom: 10}}>{props.text[message][props.leng]}</Text>
        <Text>{props.service.dataService ? props.service.dataService : props.text.notSet[props.leng]}</Text>
        <TextInput placeholder={props.text.newNameForService[props.leng]}
        value={props.props.newDataService}
        onChange={(event) => {
          props.props.setNewDataService(event.target.value)
        }}/>
        <Button style={{marginTop: 10}}
        disabled={!props.props.newDataService}
        onClick={() => {
          props.user.changeInfoMainService(props.props.newDataService.toString())
          props.props.setNewDataService('')
        }}
        >{props.text.save[props.leng]}
        </Button>
    </div>
  )
}