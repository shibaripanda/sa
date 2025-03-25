import { Button, Group, Text, TextInput } from '@mantine/core'
import React from 'react'
import { sendToSocket } from '../../../../../modules/socket/pipSendSocket.ts'
import { IconSquareX } from '@tabler/icons-react'
import { editString } from '../../../../../modules/testStringSimbols.js'

export function Businessaccounts(props, message) {

  console.log('Businessaccounts')

  return (
    <div>
        <Text fw={700} style={{marginBottom: 10}}>{props.text[message][props.leng]}</Text>
        
        <Group style={{marginBottom: 10}}>{props.service.accounts.map(item => 
            <Button variant='default' key={item._id}
            disabled={item.value !== 0}
            onClick={() => {
              sendToSocket('deleteBusinessAccount', {
                serviceId: props.user.serviceId, 
                subServiceId: props.user.subServiceId,
                accounId: item._id
              })
            }}>
              <IconSquareX color='red'/>{'\u00A0'}<Text>{item.name}</Text>
            </Button>)}
          </Group>

        {/* businessAccount setBusinessAccount */}

        <TextInput
        value={props.props.businessAccount ? props.props.businessAccount : ''}
        onChange={(event) => {
          props.props.setBusinessAccount(editString(event.target.value))
        }}/>
        <Button style={{marginTop: 10}}
        disabled={!props.props.businessAccount || props.service.accounts.map(item => item.name).includes(props.props.businessAccount)}
        onClick={() => {
          sendToSocket('addNewBusinessAccount', {
            serviceId: props.user.serviceId, 
            subServiceId: props.user.subServiceId, 
            newBusinessAccountName: props.props.businessAccount.toString()
          })
          props.props.setBusinessAccount(false)
        }}
        >{props.text.add[props.leng]}
        </Button>
    </div>
  )
}