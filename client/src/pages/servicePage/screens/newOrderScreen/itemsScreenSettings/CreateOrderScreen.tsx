import { Button, Grid, Group, Text } from '@mantine/core'
import React, { useState } from 'react'
import { sendToSocket } from '../../../../../modules/socket/pipSendSocket.ts'
import { MultSelectCreate } from './ElementsInput/MultSelectCreate.tsx'
import { SelectField } from './ElementsInput/SelectField.tsx'
import { HandTextInput } from './ElementsInput/HandTextInput.tsx'
import { MultSelect } from './ElementsInput/MultSelect.tsx'

export function CreateOrderScreen(props, message) {

  console.log('CreateOrderScreen')

  const activData = props.service.orderData.filter(item => !item.hidden)

  // props.props.orderData = activData.map(item => ({[item.item]: ''}))

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
      // console.log(i.item)
      // sessionStorage.removeItem(`docInput_${i.item}`)
      console.log(i.item, sessionStorage.getItem(`docInput_${i.item}`))
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

          <Group grow style={{marginTop: '3vmax'}}>
            <Button 
              disabled={false}
              onClick={() => {
                for(const i of activData.map(item => item.item)){
                  sessionStorage.removeItem(`docInput_${i}`)
                }
                props.props.setNewOrderRend(Date.now())
              }}
              >Clear
            </Button>
            <Button
              disabled={false}
              onClick={() => {
                sendToSocket('addRoleToUser', {
                  serviceId: props.user.serviceId, 
                  subServiceId: props.user.subServiceId, 
                  email: props.props.emailForNewUser.toLowerCase(),
                  role: props.props.role
                })
                props.props.setEmailForNewUser('')
                props.props.setSettingsFilter(props.props.emailForNewUser.toLowerCase())
              }}
              >{props.text.add[props.leng]}
            </Button>
          </Group>
      </div>
    )
}