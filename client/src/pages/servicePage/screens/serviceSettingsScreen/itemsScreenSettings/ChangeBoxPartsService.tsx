import { Autocomplete, Button, Center, Grid, NumberInput, Space, Text } from '@mantine/core'
import React from 'react'
import { sendToSocket } from '../../../../../modules/socket/pipSendSocket.ts'

export function ChangeBoxPartsService(props, message) {

  console.log('ChangeBoxPartsService')

  return (
    <div>
        <Text fw={700} style={{marginBottom: 10}}>{props.text[message][props.leng]}</Text>

        <Grid justify="flex-start" align="center" grow>

          <Grid.Col span={6}>
            <Autocomplete
              value={props.props.boxPart.value}
              placeholder={props.text.part[props.leng]}
              data={props.service.boxParts.map(item => item.value)}
              onChange={(event) => {
                console.log(event)
                props.props.setBoxPart({...props.props.boxPart, value: event})
              }}
            />
          </Grid.Col>

          <Grid.Col span={1.5}>
            <NumberInput 
            placeholder={props.text.varanty[props.leng]}
            value={props.props.boxPart.varanty}
            onChange={(event) => {
              props.props.setBoxPart({...props.props.boxPart, varanty: event})
            }}/>
          </Grid.Col>

          <Grid.Col span={1.5}>
            <NumberInput 
            placeholder={props.text.subCost[props.leng]}
            value={props.props.boxPart.subPrice}
            onChange={(event) => {
              props.props.setBoxPart({...props.props.boxPart, subPrice: event})
            }}/>
          </Grid.Col>

          <Grid.Col span={1.5}>
            <NumberInput placeholder={props.text.cost[props.leng]}
            value={props.props.boxPart.price}
            onChange={(event) => {
              props.props.setBoxPart({...props.props.boxPart, price: event})
            }}/>
          </Grid.Col>
        
          <Grid.Col span={1.5}>
            <Button
              fullWidth
              disabled={!props.props.boxPart.value || !props.props.boxPart.price || !props.props.boxPart.subPrice || !props.props.boxPart.varanty}
              onClick={() => {
                sendToSocket(message, {
                  serviceId: props.user.serviceId, 
                  subServiceId: props.user.subServiceId, 
                  newPart: props.props.boxPart
                })
                props.props.setBoxPart({value: '', varanty: '', subPrice: '', price: ''})
              }}
              >{props.text.add[props.leng]}
            </Button>
          </Grid.Col>

        </Grid>

        <Space h='lg'/>

        <Grid grow>
        {props.service.boxParts.filter(item => item.value.includes(props.props.boxPart.value)).map(item =>
        <>
          <Grid.Col span={6}>
            {item.value}
          </Grid.Col>
          <Grid.Col span={1.5}>
            <Center>{item.varanty}</Center>
          </Grid.Col>
          <Grid.Col span={1.5}>
            <Center>{item.subPrice}</Center>
          </Grid.Col>
          <Grid.Col span={1.5}>
            <Center>{item.price}</Center>
          </Grid.Col>
          <Grid.Col span={1.5}>
            <Button
              color={'red'}
              fullWidth
              onClick={() => {
                sendToSocket('deletePart', {
                  serviceId: props.user.serviceId, 
                  subServiceId: props.user.subServiceId, 
                  deletePart: {value: item.value, price: item.price, subPrice: item.subPrice, varanty: item.varanty}
                })
              }}
              >{props.text.delete[props.leng]}
            </Button>
          </Grid.Col>
        </>
        )}
        </Grid>
    </div>
  )
}