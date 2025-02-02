import { Table } from '@mantine/core'
import React from 'react'

export function OrdersScreen(props, message) {

  const activData = props.service.orderData.filter(item => !item.hidden)

  // console.log('activData', activData)

  console.log('OrdersScreen')
  console.log('ffffffffffff', props.orders[props.orders.length - 1])
  // console.log(props.props.orders.length)

  if(props.orders.length){
    // @ts-ignore
    const rows = props.orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((element) => (
      <Table.Tr key={element._id}>
        {activData.map((item, index) => 
          <Table.Td key={element._id + index}>{element[item.item]}</Table.Td>
        )}
      </Table.Tr>
    ))
  
    return (
      <Table stickyHeader stickyHeaderOffset={60}>
        <Table.Thead>
          <Table.Tr>
            {activData.map(item => 
              <Table.Th key={item.item}>{item.item}</Table.Th>
            )}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
        <Table.Caption>Scroll page to see sticky thead</Table.Caption>
      </Table>
      // <div>fvfv</div>
    )
  }

  return <div>dfdfdf</div>

}