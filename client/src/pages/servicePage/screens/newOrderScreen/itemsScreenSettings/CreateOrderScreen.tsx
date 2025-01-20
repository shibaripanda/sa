import { Button, Grid, Group, Text } from '@mantine/core'
import React from 'react'
import { sendToSocket } from '../../../../../modules/socket/pipSendSocket.ts'
import { MultSelectCreate } from './ElementsInput/MultSelectCreate.tsx'
import { SelectField } from './ElementsInput/SelectField.tsx'
import { HandTextInput } from './ElementsInput/HandTextInput.tsx'

export function CreateOrderScreen(props, message) {

  console.log('CreateOrderScreen')

  const activData = props.service.orderData.filter(item => !item.hidden)


    const fieldCheck = (item) => {
      if(!item.variant){
        return  <HandTextInput props={{...props, field: item}}/>
      }
      else if(item.variant){
        if(item.onlyVariants){
          return <SelectField props={{...props, field: item}}/>
        }

      }
      // else if(item){
      //   return <MultSelectCreate props={{...props, field: item}}/>
      // }
      // else{
      //   return <SelectField props={{...props, field: item}}/> 
      // }
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
                  props.props.setNewOrderRend(Date.now())
                }
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