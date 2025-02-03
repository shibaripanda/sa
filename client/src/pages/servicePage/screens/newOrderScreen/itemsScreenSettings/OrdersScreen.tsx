import { Accordion, Center, Container, Grid, Text, Tooltip } from '@mantine/core'
import React from 'react'
import { LoaderShow } from '../../../../../components/Loader/LoaderShow.tsx'
// @ts-ignore
import classes from './OrderList.module.css'

export function OrdersScreen(props, message) {

  const activData = props.service.orderData.filter(item => !item.hidden)

  // console.log('activData', activData)

  console.log('OrdersScreen')
  console.log(props.orders[0])

  const colorOrder = (status) => {
    if(status === 'New'){
      return 'green'
    }
  }

  if(props.orders.length){
    // const rows = props.orders.map((element) => (
      
    //   <Table.Tr key={element._id}>
    //     {activData.map((item, index) => 
    //       <Table.Td key={element._id + index}>{element[item.item]}</Table.Td>
    //     )}
    //   </Table.Tr>
      
    // ))
    const rowss = props.orders.map((element) => (

        <Accordion.Item className={classes.item} value={element._id} 
        style={{
          border: `2px solid ${colorOrder(element.status)}`
          }}>
          <Accordion.Control>
            <Grid justify="space-between">
              {activData.map((item, index) => 
                <Grid.Col span={12 / activData.length} key={element._id + index}><Center>{element[item.item]}</Center></Grid.Col>
              )}
            </Grid>
          </Accordion.Control>
          <Accordion.Panel>
            gbbgb
          </Accordion.Panel>
        </Accordion.Item>

    ))

    const textBigToSmall = (text) => {
      if(text.length > 18){
        return <Tooltip label={text}><Text size='xs'>{text.slice(0, 18) + '...'}</Text></Tooltip>
      }
      return <Text size='xs'>{text}</Text>
    }
 
    return (
      <div>
        <Grid justify="space-between" align="center">
          {activData.map(item => 
              <Grid.Col span={12 / activData.length} key={item.item}><Center>{textBigToSmall(item.item)}</Center></Grid.Col>
            )}
        </Grid>
        <Container size="100%" className={classes.wrapper}>
          <Accordion variant="separated" chevron={false}>
            {rowss}
          </Accordion>
        </Container>
      
      {/* <Table stickyHeader stickyHeaderOffset={60}>
        <Table.Thead>
          <Table.Tr>
            {activData.map(item => 
              <Table.Th key={item.item}>{item.item}</Table.Th>
            )}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table> */}
      </div>
    )
  }

  return <LoaderShow/>

}