import { Button, Grid, Text } from '@mantine/core'
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
    if(!item.variant || item.number){
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

  const createOrder = () => {
    const newOrder = []
    for(const i of activData){
      // @ts-ignore
      newOrder.push({
        data: sessionStorage.getItem(`docInput_${i.item}`) ? JSON.parse(sessionStorage.getItem(`docInput_${i.item}`)).join(', ') : '', 
        field: i.item, number: i.number,
        control: i.control
      })
    }
    return newOrder
  }


  const disabledCreateButton = () => {
    const controlData = props.service.orderData.filter(item => !item.hidden).filter(item => item.control).map(item => item.item)
    // @ts-ignore
    const fullItems = createOrder().filter(item => !item.data && item.control)
    console.log('order', controlData)
    console.log('fullorder', fullItems)
    return true
    
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
              disabled={disabledCreateButton()}
              onClick={() => {
                sendToSocket('createOrder', {
                  serviceId: props.user.serviceId, 
                  subServiceId: props.user.subServiceId,
                  newOrder: createOrder()
                })
              }}
              >
              Create order
            </Button>
          </Grid.Col>
          <Grid.Col span={props.props.screenSizeNewOrder}>
            <Button
              fullWidth
              disabled={false}
              onClick={() => {
                sendToSocket('getOrder', {
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