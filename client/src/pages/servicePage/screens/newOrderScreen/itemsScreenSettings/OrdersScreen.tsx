import { Accordion, Button, Center, Container, Grid, Space, Table, Tabs, Text, TextInput, Tooltip } from '@mantine/core'
import React, { useState } from 'react'
import { LoaderShow } from '../../../../../components/Loader/LoaderShow.tsx'
// @ts-ignore
import classes from './OrderList.module.css'
import { IconSquareCheck } from '@tabler/icons-react'
import { sendToSocket } from '../../../../../modules/socket/pipSendSocket.ts'

export function OrdersScreen(props, message) {

  // const [textInput, setTextInput] = useState('') 

  console.log('OrdersScreen')
  console.log(props.orders[0])

  const line = props.service.orderData.map(item => ({name: item.item, data: item.item})).concat([
    {name: props.text.created[props.leng], data: 'createdAt'},
    {name: props.text.edited[props.leng], data: 'updatedAt'},
    {name: props.text.manager[props.leng], data: '_manager_'},
    {name: 'Id', data: '_orderServiceId_'},
    {name: props.text.status[props.leng], data: '_status_'},
    {name: props.text.localService[props.leng], data: '_subService_'},
    {name: props.text.information[props.leng], data: '_information_'}
  ])
  const lineActiv = props.user.orderDataShowItems.find(item => item.serviceId === props.user.serviceId) ? props.user.orderDataShowItems.find(item => item.serviceId === props.user.serviceId).data : []
  const activData = lineActiv.map(e => ({item: e}))
  
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
  const arrayFields = (data) => {
    return !['_history_', '_information_'].includes(data)
  }
  const dataForTable = (data) => {
    const res: any  = []
    if(props.props.screenSizeOrderButLine < 12){
       for(const i in data){
        const field = line.find(item => item.data === i)
        if(field && arrayFields(field)){
          res.push(
            <Table.Tr key={i}>
              <Table.Th w={350}>{field.name}</Table.Th>
              <Table.Td>{specData(data[i], i)}</Table.Td>
            </Table.Tr>
          )
        }
        else if(arrayFields(field)){
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
      return (
        <Table withTableBorder withColumnBorders verticalSpacing="0.01vmax" variant="vertical">
          <Table.Tbody>
            {res}
          </Table.Tbody>
        </Table>
      )
    }
    else{
      for(const i in data){
        const field = line.find(item => item.data === i)
        if(field && arrayFields(field)){
          res.push(
            <div key={i}>
              <Table.Tr>
                <Table.Th>{field.name}</Table.Th>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>{specData(data[i], i)}</Table.Td>
              </Table.Tr>
              <hr></hr>
            </div>
          )
        }
        else if(arrayFields(field)){
          if(i[0] !== '_' && data[i]){
            res.push(
              <div key={i}>
              <Table.Tr>
                <Table.Th>{i}</Table.Th>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>{specData(data[i], i)}</Table.Td>
              </Table.Tr>
              <hr></hr>
            </div>
            )
          }
        } 
      }
      return (
        <Table withTableBorder verticalSpacing="0.01vmax">
          <Table.Tbody>
            {res}
          </Table.Tbody>
        </Table>
       )
    }
  }
  const history = (data) => {
    const res: any = []
    if(props.props.screenSizeOrderButLine < 12){
      for(const i of data.sort((a, b) => b.date - a.date)){
          res.push(
            <Table.Tr key={i.date}>
              <Table.Th w={350}>
                {new Date(i.date).toLocaleDateString([`${props.leng}`, "en"])}
                {' / '} 
                {new Date(i.date).toLocaleTimeString([`${props.leng}`, "en"]).slice(0, 5)}
                {' / '} 
                {i.user}
              </Table.Th>
              <Table.Td>
                {line.find(item => item.data === i.edit) ? line.find(item => item.data === i.edit).name : i.edit}
                {': '}
                {i.old}
                {' >>> '}
                {i.new}
              </Table.Td>
            </Table.Tr>
          )
      }
      return (
        <Table withTableBorder withColumnBorders verticalSpacing="0.01vmax" variant="vertical">
          <Table.Tbody>
            {res}
          </Table.Tbody>
        </Table>
      )
    }
    else{
      for(const i of data.sort((a, b) => b.date - a.date)){
        res.push(
          <div key={i}>
            <Table.Tr>
              <Table.Th>
                {new Date(i.date).toLocaleDateString([`${props.leng}`, "en"])}
                {' / '} 
                {new Date(i.date).toLocaleTimeString([`${props.leng}`, "en"]).slice(0, 5)}
                {' / '} 
                {i.user}
              </Table.Th>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>
                {line.find(item => item.data === i.edit) ? line.find(item => item.data === i.edit).name : i.edit}
                {': '}
                {i.old}
                {' >>> '}
                {i.new}
              </Table.Td>
            </Table.Tr>
            <hr></hr>
          </div>
        )
      }
      return (
        <Table withTableBorder withColumnBorders verticalSpacing="0.01vmax">
          <Table.Tbody>
            {res}
          </Table.Tbody>
        </Table>
      )
    }
  }
  const textBigToSmall = (text) => {
    if(text.length > 15){
      return <Tooltip label={text}><Text size='sm'>{text.slice(0, 15) + '...'}</Text></Tooltip>
    }
    return <Text size='sm'>{text}</Text>
  }
  const bottomSideData = (order) => {
    return (
      <Tabs defaultValue={props.text.information[props.leng]} color={colorOrder(order._status_)}>

        <Tabs.List>
          <Tabs.Tab value={props.text.information[props.leng]}>{props.text.information[props.leng]}</Tabs.Tab>
          <Tabs.Tab value={props.text.history[props.leng]}>{props.text.history[props.leng]}</Tabs.Tab>
          <Tabs.Tab value={props.text.works[props.leng]}>{props.text.works[props.leng]}</Tabs.Tab>
          <Tabs.Tab value={props.text.close[props.leng]} ml="auto">{props.text.close[props.leng]}</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value={props.text.close[props.leng]} pt="xs">
          <Grid justify="center" grow>
            {[
              <Button fullWidth variant='default'>Закрыть с оплатой</Button>,
              <Button fullWidth variant='default'>Закрыть по гарантии</Button>,
              <Button fullWidth variant='default'>Закрыть по отказу</Button>
            ]
            .map(item => <Grid.Col span={props.props.screenSizeOrderButLine}>{item}</Grid.Col>)}
          </Grid>
          
        </Tabs.Panel>

        <Tabs.Panel value={props.text.information[props.leng]} pt="xs">
          <Grid>
            <Grid.Col span={props.props.screenSizeOrderButLine < 12 ? 10 : 12}>
              <TextInput value={props.props.dataInformation} 
                onChange={(event) => {
                  props.props.setDataInformation(event.target.value)
                }}/>
            </Grid.Col>
            <Grid.Col span={props.props.screenSizeOrderButLine < 12 ? 2 : 12}>
              <Button fullWidth variant='default'
                onClick={() => {
                  if(props.props.dataInformation){
                    sendToSocket('addInformationOrder', {
                      serviceId: props.user.serviceId, 
                      subServiceId: props.user.subServiceId,
                      orderId: order._id,
                      data: props.props.dataInformation
                    })
                    props.props.setDataInformation('')
                  }
                }}>
              {props.text.add[props.leng]}
              </Button>
            </Grid.Col>
          </Grid>
          <Space h={10}/>
          {[...order._information_].reverse().join(', ')}
        </Tabs.Panel>

        <Tabs.Panel value={props.text.works[props.leng]} pt="xs">
          <Grid>
            <Grid.Col span={10}>
              <TextInput/>
            </Grid.Col>
            <Grid.Col span={2}>
              <Button fullWidth variant='default'>
              {props.text.add[props.leng]}
              </Button>
            </Grid.Col>
          </Grid>
        </Tabs.Panel>

        <Tabs.Panel value={props.text.history[props.leng]} pt="xs">
          {history(order._history_)}
        </Tabs.Panel>

      </Tabs>
    )
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
          {bottomSideData(element)}
          <hr color={colorOrder(element._status_)}></hr>
          {dataForTable(element)}
          <hr color={colorOrder(element._status_)}></hr>
          
        </Accordion.Panel>
      </Accordion.Item>
    ))
    
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