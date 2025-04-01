import { Button, NumberInput, Text } from '@mantine/core'
import React from 'react'

export function ChangeFeeService(props, message) {

  return (
    <div>
        <Text fw={700} style={{marginBottom: 10}}>{props.text[message][props.leng]}</Text>
        <Text>{props.service.fee ? props.service.fee : 0} %</Text>
        <NumberInput placeholder={props.text[message][props.leng]}
        value={props.props.newFee}
        onChange={(event) => {
          props.props.setNewFee(event)
        }}/>
        <Button style={{marginTop: 10}}
        disabled={!props.props.newFee && (props.props.newFee !== 0)}
        onClick={() => {
          props.user.changeFeeService(props.props.newFee)
          props.props.setNewFee(null)
        }}
        >{props.text.save[props.leng]}
        </Button>
    </div>
  )
}