import { Accordion, Button, Center, Container, Grid, Space, Table, Text, Tooltip } from '@mantine/core'
import React from 'react'
import { LoaderShow } from '../../../../../components/Loader/LoaderShow.tsx'
// @ts-ignore
import classes from './OrderList.module.css'
import { IconSquareCheck } from '@tabler/icons-react'
import { sendToSocket } from '../../../../../modules/socket/pipSendSocket.ts'

export function OrdersScreen(props, message) {

  const line = props.service.orderData
  .map(item => ({name: item.item, data: item.item}))
  .concat([
    {name: props.text.created[props.leng], data: 'createdAt'},
    {name: props.text.edited[props.leng], data: 'updatedAt'},
    {name: props.text.manager[props.leng], data: '_manager_'},
    {name: 'Id', data: '_orderServiceId_'},
    {name: props.text.status[props.leng], data: '_status_'},
    {name: props.text.localService[props.leng], data: '_subService_'},
  ])

  const lineActiv = props.user.orderDataShowItems.find(item => item.serviceId === props.user.serviceId) ? props.user.orderDataShowItems.find(item => item.serviceId === props.user.serviceId).data : []

  // const activData = props.service.orderData

  const activData = lineActiv.map(e => ({item: e}))
  

  // console.log('activData', activData)

  console.log('OrdersScreen')
  console.log(props.orders[0])
  // console.log('props.screenSize', props.props.screenSize)

  const colorOrder = (status) => {
    return props.service.colorStatuses.find(item => item.status === status) ? props.service.colorStatuses.find(item => item.status === status).color : 'yellow'
  }

  const specData = (data, type) => {
    if(['createdAt', 'updatedAt'].includes(type)){
        if(new Date(data).toLocaleDateString([`${props.leng}`, "en"]) === new Date(Date.now()).toLocaleDateString([`${props.leng}`, "en"])){
          return new Date(data).toLocaleTimeString([`${props.leng}`, "en"]).slice(0, 5)
        }
        return new Date(data).toLocaleDateString([`${props.leng}`, "en"])
    }
    return data ? data : '--'
  }

  const checkStatus = (x, y) => {
    if(x === y){
      return <IconSquareCheck/>
    }
  }

  const dataForTable = (data) => {
    const res = []
    for(const i in data){
      const field = line.find(item => item.data === i)
      if(field){
        res.push(
          <Table.Tr key={i}>
            <Table.Th w={350}>{field.name}</Table.Th>
            <Table.Td>{specData(data[i], i)}</Table.Td>
          </Table.Tr>
        )
      }
      else{
        if(i[0] !== '_' && data[i]){
          res.push(
            <Table.Tr key={i}>
              <Table.Th w={350}>{i}</Table.Th>
              <Table.Td>{specData(data[i], i)}</Table.Td>
            </Table.Tr>
          )
        }
      } 
    }
    return res
  }

  if(props.orders.length){
    const rowss = props.orders.map((element) => (

        <Accordion.Item key={element._id} className={classes.item} value={element._id} 
        style={{
          border: `2px solid ${colorOrder(element._status_)}`
          }}>
          <Accordion.Control>
            <Grid justify="center" align="center" visibleFrom="sm">
              {activData.map((item, index) => 
                <Grid.Col span={12 / activData.length} key={element._id + index}><Center>{specData(element[item.item], item.item)}</Center></Grid.Col>
              )}
            </Grid>
            <Grid justify="center" align="center" hiddenFrom="sm">
              {activData.slice(0, 3).map((item, index) => 
                <Grid.Col span={4} key={element._id + index}><Center>{specData(element[item.item], item.item)}</Center></Grid.Col>
              )}
            </Grid>
          </Accordion.Control>
          <Accordion.Panel>
            <Grid justify="center" grow>
              {props.service.statuses.map(item => <Grid.Col span={props.props.screenSizeOrderButLine}>
                <Button 
                  color={colorOrder(item)} 
                  fullWidth
                  onClick={() => {
                    sendToSocket('editOrderStatus', {
                      serviceId: props.user.serviceId, 
                      subServiceId: props.user.subServiceId,
                      orderId: element._id,
                      newStatus: item
                    })
                    console.log(element._id, item)
                  }}
                >
                  {checkStatus(element._status_, item)}{'\u00A0'}{item}
                </Button>
              </Grid.Col>)}
            </Grid>
            
            {/* <Space h='md'/> */}
            <hr color={colorOrder(element._status_)}></hr>
            <Table withTableBorder withColumnBorders verticalSpacing="0.01vmax" variant="vertical">
              <Table.Tbody>
                {dataForTable(element)}
              </Table.Tbody>
            </Table>
            {/* <Space h='md'/> */}
            <hr color={colorOrder(element._status_)}></hr>
            
          </Accordion.Panel>
        </Accordion.Item>

    ))
    const textBigToSmall = (text) => {
      if(text.length > 15){
        return <Tooltip label={text}><Text size='sm'>{text.slice(0, 15) + '...'}</Text></Tooltip>
      }
      return <Text size='sm'>{text}</Text>
    }
 
    return (
      <div>
        <Grid justify="space-between" align="center" visibleFrom="sm" style={{marginBottom: '1vmax'}}>
          {activData.map(item => 
              <Grid.Col span={12 / activData.length} key={item.item}><Center>{textBigToSmall(line.find(w => w.data === item.item).name)}</Center></Grid.Col>
            )}
        </Grid>
        <Container size="100%" className={classes.wrapper}>
          <Accordion variant="separated" chevron={false}>
            {rowss}
          </Accordion>
        </Container>
      </div>
    )
  }

  return <LoaderShow/>

}