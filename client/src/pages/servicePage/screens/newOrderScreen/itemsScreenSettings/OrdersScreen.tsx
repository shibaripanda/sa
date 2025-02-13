import { Accordion, Badge, Button, Center, Checkbox, Combobox, Container, Grid, Group, NumberInput, SegmentedControl, Select, Space, Table, Tabs, Text, TextInput, Tooltip } from '@mantine/core'
import React from 'react'
import { LoaderShow } from '../../../../../components/Loader/LoaderShow.tsx'
// @ts-ignore
import classes from './OrderList.module.css'
import { IconEyeClosed, IconSquareCheck, IconSquareX } from '@tabler/icons-react'
import { sendToSocket } from '../../../../../modules/socket/pipSendSocket.ts'
import { emptyWork } from '../../../ServicePage.tsx'

export function OrdersScreen(props, message) {

  // const [textInput, setTextInput] = useState('') 

  console.log('OrdersScreen')
  console.log(props.orders[0])
  console.log('parts', props.props.newWork)
  console.log('service', props.service)

  const line = props.service.orderData.map(item => ({name: item.item, data: item.item})).concat([
    {name: props.text.created[props.leng], data: 'createdAt'},
    {name: props.text.edited[props.leng], data: 'updatedAt'},
    {name: props.text.manager[props.leng], data: '_manager_'},
    {name: 'Id', data: '_orderServiceId_'},
    {name: props.text.status[props.leng], data: '_status_'},
    {name: props.text.localService[props.leng], data: '_subService_'},
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
  const dataForTable = (data) => {
    const res: any  = []
    if(props.props.screenSizeOrderButLine < 12){
       for(const i in data){
        const field = line.find(item => item.data === i)
        if(field && field !== '_history_'){
          res.push(
            <Table.Tr key={i}>
              <Table.Th w={350}>{field.name}</Table.Th>
              <Table.Td>{specData(data[i], i)}</Table.Td>
            </Table.Tr>
          )
        }
        else if(field !== '_history_'){
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
        if(field && field !== '_history_'){
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
        else if(field !== '_history_'){
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
                {line.find(item => item.data === i.edit) ? line.find(item => item.data === i.edit).name : i.edit === '_information_' ? props.text.information[props.leng] : i.edit}
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
                {line.find(item => item.data === i.edit) ? line.find(item => item.data === i.edit).name : i.edit === '_information_' ? props.text.information[props.leng] : i.edit}
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
  const profit = (cost, subCost) => {

    const sizeFont = (text) => {
      const l = text.toString().length
      if(l < 5) return 'xl'
      else if(l < 8) return 'md'
      else if(l < 11) return 'sm'
      return 'xs'
    }
    if(cost || cost === 0){
      const res = cost - (subCost ? subCost : 0)
      if(res === 0){
        return <Text size={sizeFont(res)} c='yellow'>{res}</Text>
      }
      else if(res > -1){
        return <Text size={sizeFont(res)} c='green'>+ {res}</Text>
      }
      else if(res){
        return <Text size={sizeFont(res)} c='red'>{res}</Text>
      }
    }
    return '--'
  }
  const total = () => {
   
    const sumCost = () => {
      let totalRes = props.props.newWork.cost ? props.props.newWork.cost : 0
      if(props.props.newWork.parts.length){
        for(const i of props.props.newWork.parts){
          totalRes = totalRes + (i.cost ? i.cost : 0)
        }
      }
      return totalRes
    }

    const sumSub = () => {
      let totalRes = props.props.newWork.subCost ? props.props.newWork.subCost : 0
      if(props.props.newWork.parts.length){
        for(const i of props.props.newWork.parts){
          totalRes = totalRes + (i.subCost ? i.subCost : 0)
        }
      }
      return totalRes
    }

    return {
      sumSub: sumSub(),
      sumCost: sumCost(),
      sumProfit: profit(sumCost(), sumSub())
    }
  }
  const parts = () => {
    if(props.props.newWork.parts.length){
      return props.props.newWork.parts.map((item, index) => 
      <Grid key={`part panel${index}`} justify="center" align="center">
        <Grid.Col key={'delete'} span={props.props.screenSizeOrderButLine < 12 ? 0.4 : 0}>
          <Center>
            <IconSquareX color='red' onClick={() => {
              props.props.newWork.parts.splice(index, 1)
              props.props.setNewWork({...props.props.newWork, parts: props.props.newWork.parts})
            }}/>
          </Center>
        </Grid.Col>
        <Grid.Col key={'part'} span={props.props.screenSizeOrderButLine < 12 ? 5.1 : 12}>
          <TextInput value={item.part} placeholder='Запчасть' error={!item.part}
            onChange={(event) => {
              item.part = event.target.value
              props.props.setNewWork({...props.props.newWork, parts: [...props.props.newWork.parts]})
            }}/>
        </Grid.Col>
        <Grid.Col key={'hide'} span={props.props.screenSizeOrderButLine < 12 ? 1.9 : 0}>
          {/* <Group><Checkbox color='grey' checked={props.props.newWork.parts[index].link}
            onChange={(event) => {
            props.props.newWork.parts[index].link = event.currentTarget.checked
            props.props.setNewWork({...props.props.newWork, parts: props.props.newWork.parts})
          }}/> Объединить с услугой</Group> */}
          <SegmentedControl value={item.link} fullWidth
            onChange={(event) => {
              item.link = event
              props.props.setNewWork({...props.props.newWork, parts: props.props.newWork.parts})
            }}  
            data={['apart', 'mix', 'hide']} 
            />
        </Grid.Col>
        <Grid.Col key={'varanty'} span={props.props.screenSizeOrderButLine < 12 ? 1.2 : 12}>
          <NumberInput value={item.varanty} placeholder='Гарантия' 
            onChange={(event) => {
              item.varanty = event
              props.props.setNewWork({...props.props.newWork, parts: [...props.props.newWork.parts]})
            }}/>
        </Grid.Col>
        <Grid.Col key={'subCost'} span={props.props.screenSizeOrderButLine < 12 ? 1.2 : 12}>
          <NumberInput value={item.subCost} placeholder='Себестоимость' 
            onChange={(event) => {
              item.subCost = event
              props.props.setNewWork({...props.props.newWork, parts: [...props.props.newWork.parts]})
            }}/>
        </Grid.Col>
        <Grid.Col key={'cost'} span={props.props.screenSizeOrderButLine < 12 ? 1.2 : 12}>
          <NumberInput value={item.cost} placeholder='Стоимость' error={!item.cost} 
            onChange={(event) => {
              item.cost = event
              props.props.setNewWork({...props.props.newWork, parts: [...props.props.newWork.parts]})
            }}/>
        </Grid.Col>
        <Grid.Col key={'profit'} span={props.props.screenSizeOrderButLine < 12 ? 1 : 12}>
          {profit(item.cost, item.subCost)}
        </Grid.Col>
      </Grid>)
    }
  }

  const activButAddNewWork = (data) => {
    if(!data.work || !data.cost || !data.master){
      return true
    }
    if(data.parts.length){
      for(const i of data.parts){
        if(!i.part || !i.cost){
          return true
        }
      }
    }
    return false
  }
  const activDotWork = (data) => {
    if(!data.work){
      return 'red'
    }
    if(data.parts.length){
      for(const i of data.parts){
        if(!i.part){
          return 'red'
        }
      }
    }
    return 'green'
  }
  const activDotCost = (data) => {
    if(!data.cost){
      return 'red'
    }
    if(data.parts.length){
      for(const i of data.parts){
        if(!i.cost){
          return 'red'
        }
      }
    }
    return 'green'
  }
  const activDotMaster = (data) => {
    if(!data.master){
      return 'red'
    }
    return 'green'
  }
  const workForClientLook = (data) => {
    console.log('cost', data.cost)
    if(JSON.stringify(props.props.newWork) !== JSON.stringify(structuredClone(emptyWork))){

      const work = data.work + data.parts.filter(item => item.link === 'mix').map(item => ' ' + item.part).join(' / ')

      const cost = data.parts.filter(item => ['mix', 'hide'].includes(item.link)).reduce((acc, item) => acc + item.cost, data.cost)

      const varanty = [...data.parts.
      filter(item => ['mix', 'hide'].includes(item.link) && item.varanty)
      .map(item => item.varanty), data.varanty ? data.varanty : 0]
      .sort((a, b) => b - a)
      
      return (
        <Table withTableBorder withColumnBorders verticalSpacing="0.01vmax" variant="vertical">
          <Table.Tbody>
            <Table.Tr>
              <Table.Td width={'70%'}>
                {work}
              </Table.Td>
              <Table.Td width={'15%'}>
                <Center>
                  {varanty[0]}
                </Center>
              </Table.Td>
              <Table.Td width={'15%'}>
                <Center>
                  {cost}
                </Center>
              </Table.Td>
            </Table.Tr>
            {data.parts.filter(item => 'apart' === item.link).map(item => 
              <Table.Tr>
              <Table.Td width={'70%'}>
                {item.part ? item.part : '--'}
              </Table.Td>
              <Table.Td width={'15%'}>
                <Center>
                  {item.varanty ? item.varanty : 0}
                </Center>
              </Table.Td>
              <Table.Td width={'15%'}>
                <Center>
                  {item.cost ? item.cost : 0}
                </Center>
              </Table.Td>
            </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      )
    }
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
            .map((item, index) => <Grid.Col key={index} span={props.props.screenSizeOrderButLine}>{item}</Grid.Col>)}
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
          {[...order._information_].reverse().map((item, index) => <div key={index}>{item}</div>)}
        </Tabs.Panel>

        <Tabs.Panel value={props.text.works[props.leng]} pt="xs">

          <Grid key={'title panel'} justify="center" align="center">
            <Grid.Col key={'Услуга'} span={props.props.screenSizeOrderButLine < 12 ? 5.5 : 12}>
              <Badge variant="dot" color={activDotWork(props.props.newWork)}>Название</Badge>
            </Grid.Col>
            <Grid.Col key={'Мастер'} span={props.props.screenSizeOrderButLine < 12 ? 1.9 : 12}>
              <Badge variant="dot" color={activDotMaster(props.props.newWork)}>Мастер</Badge>
            </Grid.Col>
            <Grid.Col key={'Гарантия'} span={props.props.screenSizeOrderButLine < 12 ? 1.2: 12}>
              <Badge variant="dot" color="grey">Гарантия</Badge>
            </Grid.Col>
            <Grid.Col key={'Себестоимость'} span={props.props.screenSizeOrderButLine < 12 ? 1.2 : 12}>
              <Badge variant="dot" color="grey">{total().sumSub !== 0 ? total().sumSub : ''} Себестоимость</Badge> 
            </Grid.Col>
            <Grid.Col key={'Стоимость'} span={props.props.screenSizeOrderButLine < 12 ? 1.2 : 12}>
              <Badge variant="dot" color={activDotCost(props.props.newWork)}>{total().sumCost !== 0 ? total().sumCost : ''} Стоимость</Badge> 
            </Grid.Col>
            <Grid.Col key={'profit'} span={props.props.screenSizeOrderButLine < 12 ? 1 : 12}>
              {total().sumProfit}
            </Grid.Col>
          </Grid>

          <Grid key={'input panel'} justify="center" align="center">
            <Grid.Col key={'Услуга'} span={props.props.screenSizeOrderButLine < 12 ? 5.5 : 12}>
              <TextInput value={props.props.newWork.work} placeholder='Услуга' error={!props.props.newWork.work}
                onChange={(event) => {
                  props.props.setNewWork({...props.props.newWork, work: event.target.value})
                }}/>
            </Grid.Col>
            <Grid.Col key={'Мастер'} span={props.props.screenSizeOrderButLine < 12 ? 1.9 : 12}>
              <Select value={props.props.newWork.master} placeholder='Мастер' error={!props.props.newWork.master}
                data={props.service.localUsers.map(item => ({label: item.name ? item.name + ' (' + item.email + ')' : item.email, value: item.id}))}
                onChange={(event) => {
                  props.props.setNewWork({...props.props.newWork, master: event})
                }}/>
            </Grid.Col>
            <Grid.Col key={'Гарантия'} span={props.props.screenSizeOrderButLine < 12 ? 1.2 : 12}>
              <NumberInput value={props.props.newWork.varanty} placeholder='Гарантия' 
                // data={[1, 7, 14, 30, 60, 90, 120, 365].map(item => ({label: `${item} `, value: item}))}
                onChange={(event) => {
                  props.props.setNewWork({...props.props.newWork, varanty: event})
                }}/>
            </Grid.Col>
            <Grid.Col key={'Себестоимость'} span={props.props.screenSizeOrderButLine < 12 ? 1.2 : 12}>
              <NumberInput value={props.props.newWork.subCost} placeholder='Себестоимость' 
                onChange={(event) => {
                  props.props.setNewWork({...props.props.newWork, subCost: event})
                }}/>
            </Grid.Col>
            <Grid.Col key={'Стоимость'} span={props.props.screenSizeOrderButLine < 12 ? 1.2 : 12}>
              <NumberInput value={props.props.newWork.cost} placeholder='Стоимость' error={!props.props.newWork.cost}
                onChange={(event) => {
                  props.props.setNewWork({...props.props.newWork, cost: event})
                }}/>
            </Grid.Col>
            <Grid.Col key={'profit'} span={props.props.screenSizeOrderButLine < 12 ? 1 : 12}>
              {profit(props.props.newWork.cost, props.props.newWork.subCost)}
            </Grid.Col>
          </Grid>

          {parts()}

          <Space h='xl'/>

          <Grid key={'control panel'} justify="center" align="center">

            <Grid.Col key={props.text.addPart[props.leng]} span={props.props.screenSizeOrderButLine < 12 ? 3 : 12}>
              <Button variant='default' fullWidth
                disabled={activButAddNewWork(props.props.newWork)}
                onClick={async () => {
                  await props.props.setNewWork(
                    {...props.props.newWork, parts: [...props.props.newWork.parts, {part: '', varanty: NaN, subCost: NaN, cost: NaN, link: 'apart'}]}
                  )
                }}>
                {props.text.addPart[props.leng]}
              </Button>
            </Grid.Col>

            <Grid.Col key={props.text.clear[props.leng]} span={props.props.screenSizeOrderButLine < 12 ? 3 : 12}>
              <Button variant='default' fullWidth
                disabled={JSON.stringify(props.props.newWork) === JSON.stringify(structuredClone(emptyWork))}
                onClick={() => {
                  props.props.setNewWork(structuredClone(emptyWork))
                }}>
                  {props.text.clear[props.leng]}
              </Button>
            </Grid.Col>

            <Grid.Col key={props.text.add[props.leng]} span={props.props.screenSizeOrderButLine < 12 ? 3 : 12}>
              <Button fullWidth variant='default' c={!activButAddNewWork(props.props.newWork) ? 'green' : ''}
                disabled={activButAddNewWork(props.props.newWork)}
                onClick={() => {
                    sendToSocket('addNewWork', {
                      serviceId: props.user.serviceId, 
                      subServiceId: props.user.subServiceId,
                      orderId: order._id,
                      work: props.props.newWork
                    })
                    props.props.setNewWork(structuredClone(emptyWork))
                }}>
              {props.text.add[props.leng]}
              </Button>
            </Grid.Col>

          </Grid>

          <Space h='xl'/>

          {workForClientLook(props.props.newWork)}
          {/* {[...order._information_].reverse().join(', ')} */}
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
            {props.service.statuses.map(item => <Grid.Col key={item} span={props.props.screenSizeOrderButLine}>
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