import { Button, Group, Text, TextInput } from '@mantine/core'
import React from 'react'
import { IconSquareX } from '@tabler/icons-react'
import { editString } from '../../../../../modules/testStringSimbols.js'

export function ChangeLocalService(props, message) {

  return (
    <div>
        <Text fw={700} style={{marginBottom: 10}}>{props.text[message][props.leng]}</Text>
        
        <Group style={{marginBottom: 10}}>{props.service.subServices.map(item => 
            <Button variant='default' key={item.subServiceId}
            disabled={item.subServiceId === props.user.subServiceId}
            onClick={() => {
              props.user.changeLocalService(item.subServiceId)
            }}>
              <IconSquareX color='red'/>{'\u00A0'}<Text>{item.name}</Text>
            </Button>)}
          </Group>
        


        {/* <Text>{props.service.name}</Text> */}

        <TextInput placeholder={props.text.newNameForLocalService[props.leng]}
        value={props.props.newSubService}
        onChange={(event) => {
          props.props.setSubNewSevice(editString(event.target.value))
        }}/>
        <Button style={{marginTop: 10}}
        disabled={!props.props.newSubService || props.service.subServices.map(item => item.name).includes(props.props.newSubService)}
        onClick={() => {
          props.user.changeLocalService(props.props.newSubService.toString())
          props.props.setSubNewSevice('')
        }}
        >{props.text.add[props.leng]}
        </Button>
    </div>
  )
}