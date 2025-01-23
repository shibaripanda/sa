import { Button, Grid, Group, Text } from '@mantine/core'
import React from 'react'
import { sendToSocket } from '../../../../../modules/socket/pipSendSocket.ts'
import { MultSelectCreate } from './ElementsInput/MultSelectCreate.tsx'
import { SelectField } from './ElementsInput/SelectField.tsx'
import { HandTextInput } from './ElementsInput/HandTextInput.tsx'
import { MultSelect } from './ElementsInput/MultSelect.tsx'

export function CreateOrderScreen(props, message) {

  console.log('CreateOrderScreen')

  const activData = props.service.orderData.filter(item => !item.hidden)

  const fieldCheck = (item) => {
    if(!item.variant){
      return  <HandTextInput props={{...props, field: item}}/>
    }

    if(item.onlyVariants){
      if(item.multiVariants){
        return <MultSelect props={{...props, field: item}}/>
      }
      return <SelectField props={{...props, field: item}}/>
    }

    return <MultSelectCreate props={{...props, field: item}}/>
  }

  for(const i of activData){
    console.log('control', i.item, sessionStorage.getItem(`docInput_${i.item}`))
  }

  return (
    <div>
        <Text fw={700} style={{marginBottom: 10}}>{props.text[message][props.leng]}</Text>

        <Grid>
          {activData.map(item => 
          <Grid.Col key={item.item} span={props.props.screenSizeNewOrder}>
            {fieldCheck(item)}
          </Grid.Col>)}
        </Grid>

        <Grid style={{marginTop: '3vmax'}}>
          <Grid.Col span={props.props.screenSizeNewOrder}>
            <Button
              fullWidth
              disabled={false}
              onClick={() => {
                sendToSocket('createOrder', {
                  serviceId: props.user.serviceId, 
                  subServiceId: props.user.subServiceId
                })
              }}
              >
              {props.text.add[props.leng]}
            </Button>
          </Grid.Col>
          <Grid.Col span={props.props.screenSizeNewOrder}>
            <Button
              fullWidth 
              disabled={false}
              onClick={() => {
                for(const i of activData.map(item => item.item)){
                  sessionStorage.removeItem(`docInput_${i}`)
                }
                props.props.setNewOrderRend(Date.now())
              }}
              >
              {props.text.clearForm[props.leng]}
            </Button>
          </Grid.Col>
        </Grid>

    </div>
  )
}