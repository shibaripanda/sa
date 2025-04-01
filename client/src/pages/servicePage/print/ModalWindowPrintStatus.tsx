import { Button, Center, Grid, Group, Modal, NumberFormatter, Space, Text, TextInput, Title } from '@mantine/core'
import React, { useState } from 'react'

export function ModalWindowPrintStatus(props) {

  const [deleteInput, setDeleteInput] = useState('')

  const totalCost = () => {
    if(props.data._work_ && props.data._work_.length){
      let total = props.data._work_.reduce((acc, item) => acc + item.cost, 0)
      for(const i of props.data._work_){
        total = total + i.parts.reduce((acc, item) => acc + item.cost, 0)
      }
      return total
    }
    return 0
  }
  const totalPriceView = (total) => {
        const cur = props.service.currency
            const separator = () => {
              if(cur.comma1000 === true){
                return '.'
              }
              return false
            }
            if(cur.suffixOrPrefix === 'suffix'){
              return <NumberFormatter  suffix={cur.value} thousandSeparator={separator()} decimalSeparator=',' value={total.toFixed(cur.afterNumbers)} />
            }
            return <NumberFormatter  prefix={cur.value} thousandSeparator={separator()} decimalSeparator=',' value={total.toFixed(cur.afterNumbers)} />
  }

  return (
      <>
          <Modal
          title={<Group justify='space-between'><Text fw={700}>{props.data._orderServiceId_}</Text> <Text c='green' fw={700}>{totalPriceView(totalCost())}</Text></Group>}
          // centered
          radius={'md'} 
          size="auto"
          opened={props.openedClosePrint} 
          onClose={props.openedClosePrintHandlers.close}
          withCloseButton={false}
          >
            <div>
              <Grid justify="space-between">
                <Grid.Col span={12}>
                  <Center><Title size="h1" c='green' fw={700}>{totalPriceView(totalCost())}</Title></Center>
                </Grid.Col>
                <Grid.Col span={12}>
                  
                </Grid.Col>
                {props.service.accounts.map(ac => <Grid.Col key={ac._id} span={12}>
                  <>
                  <Button fullWidth
                    disabled={!ac.activ}
                    color={ac.color}
                    onClick={() => {
                      props.user.closePayOrderStatus(props.data._id, ac._id, props.data._orderServiceId_, totalCost())
                      props.openedClosePrintHandlers.close()
                    }}  
                    >
                    {ac.name}
                 </Button>
                 <Space h='lg'/>
                 </>
                </Grid.Col>)}
                
              </Grid>

              <Space h='lg'/>
              <hr></hr>
              <Space h='lg'/>
              <Group justify="space-between">
                <TextInput 
                  style={{width: 175}}
                  onChange={event => setDeleteInput(event.target.value)}
                />
                <Button
                  disabled={deleteInput !== props.data._orderServiceId_}
                  color='red'
                  onClick={() => {
                    props.user.deleteOrderbyId(props.data._id)
                    props.openedClosePrintHandlers.close()
                    props.setOrderAcord(null)
                  }}
                  style={{width: 175}}>
                  {props.text.delete[props.leng]}
                </Button>
                <Button
                  variant='default'
                  onClick={props.openedClosePrintHandlers.close}  
                  style={{width: 175}}>
                  {props.text.cancel[props.leng]}
                </Button>
              </Group>
            </div>
          </Modal>
      </>
    )
}