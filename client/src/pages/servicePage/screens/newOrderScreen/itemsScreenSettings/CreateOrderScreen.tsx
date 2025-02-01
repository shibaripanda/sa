import { Box, Button, Collapse, Grid, Group, Text, TextInput } from '@mantine/core'
import React from 'react'
import { sendToSocket } from '../../../../../modules/socket/pipSendSocket.ts'
import { MultSelectCreate } from './ElementsInput/MultSelectCreate.tsx'
import { SelectField } from './ElementsInput/SelectField.tsx'
import { HandTextInput } from './ElementsInput/HandTextInput.tsx'
import { MultSelect } from './ElementsInput/MultSelect.tsx'
import { useDisclosure } from '@mantine/hooks'

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
      newOrder.push({data: sessionStorage.getItem(`docInput_${i.item}`) ? JSON.parse(sessionStorage.getItem(`docInput_${i.item}`)).join(', ') : '', 
        field: i.item, number: i.number,
        control: i.control
      })
    }
    return newOrder
  }


  const disabledCreateButton = () => {
    // @ts-ignore
    const fullItems = createOrder().filter(item => !item.data && item.control)
    return fullItems.length ? true : false
  }

  const disabledClearButton = () => {
    // @ts-ignore
    const fullItems = createOrder().filter(item => !item.data)
    return fullItems.length === createOrder().length
  }

  for(const i of activData){
    console.log('control', i.item, sessionStorage.getItem(`docInput_${i.item}`))
  }

  return (
    <div>
      <Group>
        <Button color='green' onClick={props.props.openedNewOrderHandler.toggle}>{props.text[message][props.leng]}</Button>
        <TextInput/>
      </Group>

      <Collapse in={props.props.openedNewOrder}>
        <div>
          <hr style={{marginTop: '1vmax', marginBottom: '1vmax'}}></hr>

          <Grid grow>
            {activData.map(item => 
            <Grid.Col key={item.item} span={props.props.screenSizeNewOrder}>
              {fieldCheck(item)}
            </Grid.Col>)}
          </Grid>

          <Grid style={{marginTop: '1.5vmax'}} grow>
            <Grid.Col span={props.props.screenSizeNewOrder}>
              <Button
                color='green'
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
                {props.text.createNewOrder[props.leng]}
              </Button>
            </Grid.Col>
            <Grid.Col span={props.props.screenSizeNewOrder}>
              <Button
                color='red'
                fullWidth 
                disabled={disabledClearButton()}
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
      </Collapse>
      <hr style={{marginTop: '1vmax', marginBottom: '0.5vmax'}}></hr>
    </div>
    
  )
}