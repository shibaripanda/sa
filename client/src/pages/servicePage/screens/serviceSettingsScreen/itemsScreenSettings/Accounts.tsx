import { Button, Divider, Grid, Group, Space, Text, TextInput } from '@mantine/core'
import React from 'react'
import { sendToSocket } from '../../../../../modules/socket/pipSendSocket.ts'

export function Accounts(props, message) {

  console.log('Accounts')
  console.log(props.service.accounts)

  const multiOrder = (order) => {
    console.log(props.service.accounts.map(ac => ac.accountHistory).flat().filter(item => item.orderId === order).length)
    const countOrders = props.service.accounts.map(ac => ac.accountHistory).flat().filter(item => item.orderId === order).length
    if(countOrders === 1){
      return {color: 'green', count: ''}
    }
    return {color: 'red', count: `(${countOrders})`}
  } 

  return (
    <div>
        <Text fw={700} style={{marginBottom: 10}}>{props.text[message][props.leng]}</Text>
        <Space h='lg'/>
        
        <Grid style={{marginBottom: 10}}>{props.service.accounts.map(item =>
        <>
          <Grid.Col span={12}><Group justify="space-between"><Text fw={700}>{item.name}</Text> <Text c='green' fs="italic">{item.value}</Text></Group><hr></hr></Grid.Col> 
          <Grid.Col span={12}>
            <Grid>
              {item.accountHistory.map(ac => 
                <Grid.Col span={12}>
                  <Group justify='space-between'>
                    <Text c={multiOrder(ac.orderId).color} size="sm">{ac.order} {multiOrder(ac.orderId).count}</Text>
                    <Text c={multiOrder(ac.orderId).color} size="sm">{ac.value}</Text>
                  </Group>
                  <Divider my="xs" />
                </Grid.Col>
              )}
            </Grid>
          </Grid.Col>
        </>
        )}
        </Grid>
    </div>
  )
}