import { Accordion, Anchor, Autocomplete, Badge, Box, Button, Center, Container, Grid, Group, Image, NumberInput, Overlay, SegmentedControl, Select, Space, Table, Tabs, Text, TextInput, Tooltip } from '@mantine/core'
import React from 'react'
import { LoaderShow } from '../../../../../components/Loader/LoaderShow.tsx'
// @ts-ignore
import classes from './OrderList.module.css'
import { IconSquareCheck, IconSquareX } from '@tabler/icons-react'
import { sendToSocket } from '../../../../../modules/socket/pipSendSocket.ts'
import { emptyWork } from '../../../ServicePage.tsx'

export function OrdersScreen(props, message) {

  console.log('OrdersScreen')

  // const [scroll, scrollTo] = useWindowScroll()
  
  if(!props.props.newWork.master){
    props.props.setNewWork({...props.props.newWork, master: props.props.newWork.master ? props.props.newWork.master : props.user._id})
  }

  if(!props.props.newWork.varanty){
    props.props.setNewWork({...props.props.newWork, varanty: props.props.newWork.varanty ? props.props.newWork.varanty : 120})
  }

  const line = props.service.orderData.map(item => ({name: item.item, data: item.item})).concat([
    {name: props.text.created[props.leng], data: 'createdAt'},
    {name: props.text.edited[props.leng], data: 'updatedAt'},
    {name: props.text.manager[props.leng], data: '_manager_'},
    {name: 'Id', data: '_orderServiceId_'},
    {name: props.text.status[props.leng], data: '_status_'},
    {name: props.text.localService[props.leng], data: '_subService_'},
  ])
  const lineActiv = props.user.orderDataShowItems
  .find(item => item.serviceId === props.user.serviceId) ? props.user.orderDataShowItems
  .find(item => item.serviceId === props.user.serviceId).data.filter(f => line.map(r => r.data).includes(f)) : []

  const activData = lineActiv.map(e => ({item: e}))

  const deviceName = (name) => {
    if(name === '_DeviceBlocked_'){
      return props.text.device[props.leng]
    }
    return name
  }
  const colorOrder = (status) => {
    return props.service.colorStatuses.find(item => item.status === status) ? props.service.colorStatuses.find(item => item.status === status).color : 'grey'
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
  const nameDevice = (name) => {
    if(name === '_DeviceBlocked_'){
      return props.text.device[props.leng]
    }
    return name
  }
  const dataForTable = (data) => {
    const res: any  = []
    if(props.props.screenSizeOrderButLine < 12){
       for(const i in data){
        const field = line.find(item => item.data === i)
        if(field && field !== '_history_'){
          res.push(
            <Table.Tr key={i}>
              <Table.Th w={350}>{nameDevice(field.name)}</Table.Th>
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
  const textBigToSmall = (text, l) => {
    if(text.length > l){
      return <Tooltip label={text}><Text size='sm'>{deviceName(text).slice(0, l) + '...'}</Text></Tooltip>
    }
    return <Text size='sm'>{deviceName(text)}</Text>
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

        <Autocomplete
          value={item.part}
          placeholder={props.text.part[props.leng]}
          error={!item.part}
          data={props.service.boxParts.map(item => item.value + ` | ${props.text.varanty[props.leng]}: ` + item.varanty + ` | ${props.text.subCost[props.leng]}: ` + item.subPrice + ` | ${props.text.cost[props.leng]}: ` + item.price)}
          onChange={(event) => {

            if(props.service.boxParts.find(item => item.value === event.split(' | ')[0])){
              const res = props.service.boxParts.find(item => item.value === event.split(' | ')[0])
              console.log(res)
              item.part = res.value
              item.cost = res.price
              item.subCost = res.subPrice
              item.varanty = res.varanty
            }
            else{
              item.part = event
            }
            props.props.setNewWork({...props.props.newWork, parts: [...props.props.newWork.parts]})
          }}
        />
        </Grid.Col>
        <Grid.Col key={'hide'} span={props.props.screenSizeOrderButLine < 12 ? 1.9 : 0}>
          <SegmentedControl value={item.link} fullWidth
            onChange={(event) => {
              item.link = event
              props.props.setNewWork({...props.props.newWork, parts: props.props.newWork.parts})
            }}  
            data={['apart', 'mix', 'hide']} 
            />
        </Grid.Col>
        <Grid.Col key={'varanty'} span={props.props.screenSizeOrderButLine < 12 ? 1.2 : 12}>
          <NumberInput value={item.varanty} placeholder={props.text.varanty[props.leng]} 
            onChange={(event) => {
              item.varanty = event
              props.props.setNewWork({...props.props.newWork, parts: [...props.props.newWork.parts]})
            }}/>
        </Grid.Col>
        <Grid.Col key={'subCost'} span={props.props.screenSizeOrderButLine < 12 ? 1.2 : 12}>
          <NumberInput value={item.subCost} placeholder={props.text.subCost[props.leng]} 
            onChange={(event) => {
              item.subCost = event
              props.props.setNewWork({...props.props.newWork, parts: [...props.props.newWork.parts]})
            }}/>
        </Grid.Col>
        <Grid.Col key={'cost'} span={props.props.screenSizeOrderButLine < 12 ? 1.2 : 12}>
          <NumberInput value={item.cost} placeholder={props.text.cost[props.leng]} error={!item.cost} 
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
  const activButEditWork = (data, order) => {
    for(const i of data){
      if(!i.work || !i.cost || !i.master){
        console.log('s', true)
        return true
      }
      if(i.parts.length){
        for(const y of i.parts){
          if(!y.part || !y.cost){
            return true
          }
        }
      }
    }
    console.log('d', false)
    return JSON.stringify(order) === JSON.stringify(props.props.editedWork)
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

  const controlNewWorkButtonsPanel = (order) => {
    return (
      <Grid key={'control panel'} justify="flex-start" align="center">
        <Grid.Col key={props.text.addPart[props.leng]} span={props.props.screenSizeOrderButLine < 12 ? 2 : 12}>
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
        <Grid.Col key={props.text.clear[props.leng]} span={props.props.screenSizeOrderButLine < 12 ? 2 : 12}>
          <Button variant='default' fullWidth
            disabled={JSON.stringify(props.props.newWork) === JSON.stringify(structuredClone(emptyWork))}
            onClick={() => {
              props.props.setNewWork(structuredClone(emptyWork))
            }}>
              {props.text.clear[props.leng]}
          </Button>
        </Grid.Col>
        <Grid.Col key={props.text.add[props.leng]} span={props.props.screenSizeOrderButLine < 12 ? 2 : 12}>
          <Button fullWidth variant='default' c={!activButAddNewWork(props.props.newWork) ? 'green' : ''}
            disabled={activButAddNewWork(props.props.newWork)}
            onClick={() => {
                sendToSocket('addNewWork', {
                  serviceId: props.user.serviceId, 
                  subServiceId: props.user.subServiceId,
                  orderId: order._id,
                  work: {...props.props.newWork, total: total().sumCost}
                })
                props.props.setNewWork(structuredClone(emptyWork))
            }}>
          {props.text.add[props.leng]}
          </Button>
        </Grid.Col>
      </Grid>
    )
  }
  const orderWorksPanel = (order) => {

    if(order._work_.length){

      const allOrders = () => {
        if(activButAddNewWork(props.props.newWork)){
          return [...order._work_]
        }
        else return [...order._work_, props.props.newWork]
      }
      const title = (data) => { 
        return data.work + data.parts.filter(item => item.link === 'mix').map(item => ' ' + item.part).join(' / ')
      }
      const cost = (data) => { 
        return data.parts.filter(item => ['mix', 'hide'].includes(item.link)).reduce((acc, item) => acc + item.cost, data.cost)
      }
      const subCost = (data) => { 
        return data.parts.filter(item => ['mix', 'hide'].includes(item.link)).reduce((acc, item) => acc + (item.subCost ? item.subCost : 0), data.subCost ? data.subCost : 0)
      }
      const varanty = (data) => {
        return [...data.parts
          .filter(item => ['mix', 'hide'].includes(item.link) && item.varanty)
          .map(item => item.varanty), data.varanty ? data.varanty : 0]
          .sort((a, b) => b - a)[0]
      }
      const partsManager = (work) => {
        if(work.parts.filter(item => 'apart' === item.link).length){
          return (
            work.parts.filter(w => 'apart' === w.link).map(part => 
              <Table.Tr>
                <Table.Td>
                  {part.part ? part.part : '--'}
                </Table.Td>
                <Table.Td>
                  <Center>
                    --
                  </Center>
                </Table.Td>
                <Table.Td>
                  <Center>
                    {part.varanty ? part.varanty : 0}
                  </Center>
                </Table.Td>
                <Table.Td>
                  <Center>
                    {part.subCost ? part.subCost : 0}
                  </Center>
                </Table.Td>
                <Table.Td>
                  <Center>
                    {part.cost ? part.cost : 0}
                  </Center>
                </Table.Td>
                <Table.Td>
                  <Center>
                    ---
                  </Center>
                </Table.Td>
              </Table.Tr>
            )
          )
        }
      }
      const partsClient = (work) => {
        if(work.parts.filter(item => 'apart' === item.link).length){
          return (
            work.parts.filter(w => 'apart' === w.link).map(part => 
              <Table.Tr>
                <Table.Td>
                  {part.part ? part.part : '--'}
                </Table.Td>
                <Table.Td>
                  <Center>
                    {part.varanty ? part.varanty : 0}
                  </Center>
                </Table.Td>
                <Table.Td>
                  <Center>
                    {part.cost ? part.cost : 0}
                  </Center>
                </Table.Td>
              </Table.Tr>
            )
          )
        }
      }
      const totalCost = () => {
        let total = allOrders().reduce((acc, item) => acc + item.cost, 0)
        for(const i of allOrders()){
          total = total + i.parts.reduce((acc, item) => acc + item.cost, 0)
        }
        return total
      }
      const totalSubCost = () => {
        let total = allOrders().reduce((acc, item) => acc + (item.subCost ? item.subCost : 0), 0)
        for(const i of allOrders()){
          total = total + i.parts.reduce((acc, item) => acc + (item.subCost ? item.subCost : 0), 0)
        }
        return total
      }
      const totalExistCost = () => {
        let total = order._work_.reduce((acc, item) => acc + item.cost, 0)
        for(const i of order._work_){
          total = total + i.parts.reduce((acc, item) => acc + item.cost, 0)
        }
        return total
      }
      const totalExistSubCost = () => {
        let total = order._work_.reduce((acc, item) => acc + (item.subCost ? item.subCost : 0), 0)
        for(const i of order._work_){
          total = total + i.parts.reduce((acc, item) => acc + (item.subCost ? item.subCost : 0), 0)
        }
        return total
      }
      const newWorkOld = (work) => {
        if(work._id){
          return (
            <Anchor size='sm' c='red' onClick={() => {
              sendToSocket('deleteWork', {
                serviceId: props.user.serviceId, 
                subServiceId: props.user.subServiceId,
                orderId: order._id,
                work: work
              })
            }}>
              {props.text.delete[props.leng]}
            </Anchor>
          )
        }
        return (
          <Anchor size='sm' c='green' onClick={() => {
            sendToSocket('addNewWork', {
              serviceId: props.user.serviceId, 
              subServiceId: props.user.subServiceId,
              orderId: order._id,
              work: {...props.props.newWork, total: total().sumCost}
            })
            props.props.setNewWork(structuredClone(emptyWork))
          }}>
            {props.text.add[props.leng]}
          </Anchor>
        )
      }
      const profitMain = () => {
        const nalog = props.service.fee
        const fee = totalExistCost() / 100 * nalog
        const res = (totalExistCost() - totalExistSubCost()) - fee
        if(res === 0){
          return <Text c='yellow' size='1.5vmax'>{res}</Text> 
        }
        else if(res < 0){
          return <Text c='red' size='1.5vmax'>{res}</Text> 
        }
        return <Text c='green' size='1.5vmax'>{res}</Text>
      }
      const butDeleteAll = (order) => {
        if(order._work_.length > 1){
          return (
            <Anchor size='sm' c='red' onClick={() => {
              sendToSocket('deleteAllWork', {
                serviceId: props.user.serviceId, 
                subServiceId: props.user.subServiceId,
                orderId: order._id
              })
            }}>
              {props.text.deleteAll[props.leng]}
            </Anchor>
          )
        }
      }
      const partsEdit = (work) => {
        if(work.length){
          return work.map((item, index) => 
          <Grid key={`part panel${index}`} justify="center" align="center">
            <Grid.Col key={'delete1'} span={props.props.screenSizeOrderButLine < 12 ? 0.4 : 0}>
            </Grid.Col>
            <Grid.Col key={'delete'} span={props.props.screenSizeOrderButLine < 12 ? 0.4 : 0}>
              <Center>
                <IconSquareX color='red' onClick={() => {
                  work.splice(index, 1)
                  props.props.setEditedWork([...props.props.editedWork])
                }}/>
              </Center>
            </Grid.Col>
            <Grid.Col key={'part'} span={props.props.screenSizeOrderButLine < 12 ? 4.7 : 12}>
              <TextInput value={item.part} placeholder='Запчасть' error={!item.part}
                onChange={(event) => {
                  item.part = event.target.value
                  props.props.setEditedWork([...props.props.editedWork])
                }}/>
            </Grid.Col>
            <Grid.Col key={'hide'} span={props.props.screenSizeOrderButLine < 12 ? 1.9 : 0}>
              <SegmentedControl value={item.link} fullWidth
                onChange={(event) => {
                  item.link = event
                  props.props.setEditedWork([...props.props.editedWork])
                }}  
                data={['apart', 'mix', 'hide']} 
                />
            </Grid.Col>
            <Grid.Col key={'varanty'} span={props.props.screenSizeOrderButLine < 12 ? 1.2 : 12}>
              <NumberInput value={item.varanty} placeholder={props.text.varanty[props.leng]}
                onChange={(event) => {
                  item.varanty = event
                  props.props.setEditedWork([...props.props.editedWork])
                }}/>
            </Grid.Col>
            <Grid.Col key={'subCost'} span={props.props.screenSizeOrderButLine < 12 ? 1.2 : 12}>
              <NumberInput value={item.subCost} placeholder={props.text.subCost[props.leng]} 
                onChange={(event) => {
                  item.subCost = event
                  props.props.setEditedWork([...props.props.editedWork])
                }}/>
            </Grid.Col>
            <Grid.Col key={'cost'} span={props.props.screenSizeOrderButLine < 12 ? 1.2 : 12}>
              <NumberInput value={item.cost} placeholder={props.text.cost[props.leng]} error={!item.cost} 
                onChange={(event) => {
                  item.cost = event
                  props.props.setEditedWork([...props.props.editedWork])
                }}/>
            </Grid.Col>
            <Grid.Col key={'profit'} span={props.props.screenSizeOrderButLine < 12 ? 1 : 12}>
              {profit(item.cost, item.subCost)}
            </Grid.Col>
          </Grid>)
        }
      }
      
      if(props.props.viewWork === 'Manager view'){
        return (
          <div>
            <Space h='sm'/>
            <hr color={colorOrder(order._status_)}></hr>
            <Space h='xs'/>
            <Grid>
              <Grid.Col span={12}>
                <Group justify="space-between" align="center">
                  <SegmentedControl
                  value={props.props.viewWork}
                  data={[
                    {label: props.text['Manager view'][props.leng], value: 'Manager view' }, 
                    {label: props.text['Client view'][props.leng], value: 'Client view' }, 
                    {label: props.text['Edit'][props.leng], value: 'Edit' }
                  ]}
                  onChange={props.props.setViewWork}/>
                  <Group>
                  {profitMain()}
                  <Text c='grey' size='1vmax'>{props.service.fee}%</Text> 
                  </Group>
                </Group>
                <Space h='xs'/>
                <Table withTableBorder withColumnBorders verticalSpacing="0.01vmax" variant="vertical">
                  <Table.Tbody>
                    <Table.Tr>
                      <Table.Td>
                        <Center>
                          {props.text.servOrPart[props.leng]}
                        </Center>
                      </Table.Td>
                      <Table.Td>
                        <Center>
                          {props.text.master[props.leng]}
                        </Center>
                      </Table.Td>
                      <Table.Td>
                        <Center>
                          {props.text.varanty[props.leng]}
                        </Center>
                      </Table.Td>
                      <Table.Td>
                        <Center>
                          {props.text.subCost[props.leng]}
                        </Center>
                      </Table.Td>
                      <Table.Td>
                        <Center>
                          {props.text.cost[props.leng]}
                        </Center>
                      </Table.Td>
                      <Table.Td>
                        
                      </Table.Td>
                    </Table.Tr>
                    {allOrders().map((work, index) =>
                      <>
                        <Table.Tr key={index}>
                          <Table.Td width={'40%'}>
                            {title(work)}
                          </Table.Td>
                          <Table.Td width={'20%'}>
                            {props.service.localUsers.find(item => item.id === work.master) ? 
                            (props.service.localUsers.find(item => item.id === work.master).name ? 
                            props.service.localUsers.find(item => item.id === work.master).name + ' (' + props.service.localUsers.find(item => item.id === work.master).email + ')' : props.service.localUsers.find(item => item.id === work.master).email) : '--'
                          }
                          </Table.Td>
                          <Table.Td width={'10%'}>
                            <Center>
                              {varanty(work)}
                            </Center>
                          </Table.Td>
                          <Table.Td width={'10%'}>
                            <Center>
                              {subCost(work)}
                            </Center>
                          </Table.Td>
                          <Table.Td width={'10%'}>
                            <Center>
                              {cost(work)}
                            </Center>
                          </Table.Td>
                          <Table.Td width={'10%'}>
                            <Center>
                              {newWorkOld(work)}
                            </Center>
                          </Table.Td>
                        </Table.Tr>
                        {partsManager(work)}
                      </>
                    )}
                    <Table.Tr>
                      <Table.Td>
                      </Table.Td>
                      <Table.Td>
                      </Table.Td>
                      <Table.Td>
                      </Table.Td>
                      <Table.Td>
                        <Center>
                          {totalSubCost()}
                        </Center>
                      </Table.Td>
                      <Table.Td>
                        <Center>
                          {totalCost()}
                        </Center>
                      </Table.Td>
                      <Table.Td>
                        <Center>
                          {butDeleteAll(order)}
                        </Center>
                      </Table.Td>
                    </Table.Tr>
                  </Table.Tbody>
                </Table>
              </Grid.Col>
            </Grid>
            <Space h='sm'/>
          </div>
        )
      }
      else if(props.props.viewWork === 'Client view'){
        return (
          <div>
            <Space h='sm'/>
            <hr color={colorOrder(order._status_)}></hr>
            <Space h='xs'/>
            <Grid>
              <Grid.Col span={12}>
                <Group justify="space-between" align="center">
                  <SegmentedControl
                  value={props.props.viewWork} 
                  data={[
                    {label: props.text['Manager view'][props.leng], value: 'Manager view' }, 
                    {label: props.text['Client view'][props.leng], value: 'Client view' }, 
                    {label: props.text['Edit'][props.leng], value: 'Edit' }
                  ]}
                  onChange={props.props.setViewWork}/>
                  <Group>
                  {profitMain()}
                  <Text c='grey' size='1vmax'>{props.service.fee}%</Text> 
                  </Group>
                </Group>
                <Space h='xs'/>
                <Table withTableBorder withColumnBorders verticalSpacing="0.01vmax" variant="vertical">
                <Table.Tbody>
                <Table.Tr>
                    <Table.Td>
                      <Center>
                        {props.text.servOrPart[props.leng]}
                      </Center>
                    </Table.Td>
                    <Table.Td>
                      <Center>
                        {props.text.varanty[props.leng]}
                      </Center>
                    </Table.Td>
                    <Table.Td>
                      <Center>
                       {props.text.cost[props.leng]}
                      </Center>
                    </Table.Td>
                  </Table.Tr> 
                  {allOrders().map(work =>
                    <>
                      <Table.Tr>
                        <Table.Td width={'70%'}>
                          {title(work)}
                        </Table.Td>
                        <Table.Td width={'15%'}>
                          <Center>
                            {varanty(work)}
                          </Center>
                        </Table.Td>
                        <Table.Td width={'15%'}>
                          <Center>
                            {cost(work)}
                          </Center>
                        </Table.Td>
                        {/* <Table.Td width={'10%'}>
                          <Center>
                            {newWorkOld(work)}
                          </Center>
                        </Table.Td> */}
                      </Table.Tr>
                      {partsClient(work)}
                    </>
                    )
                  }
                  <Table.Tr>
                    <Table.Td>
                    </Table.Td>
                    <Table.Td>
                    </Table.Td>
                    <Table.Td>
                      <Center>
                        {totalCost()}
                      </Center>
                    </Table.Td>
                  </Table.Tr>
                </Table.Tbody>
                </Table>
              </Grid.Col>
            </Grid>
            <Space h='sm'/>
          </div>
        )
      }
      else if(props.props.viewWork === 'Edit'){
        return (
          <div>
            <Space h='sm'/>
            <hr color={colorOrder(order._status_)}></hr>
            <Space h='xs'/>
            <Group justify="space-between" align="center">
              <SegmentedControl
              value={props.props.viewWork} 
              data={[
                {label: props.text['Manager view'][props.leng], value: 'Manager view' }, 
                {label: props.text['Client view'][props.leng], value: 'Client view' }, 
                {label: props.text['Edit'][props.leng], value: 'Edit' }
              ]}
              onChange={props.props.setViewWork}/>
              <Group>
                {profitMain()}
                <Text c='grey' size='1vmax'>{props.service.fee}%</Text> 
              </Group>
            </Group>
            <Space h='xs'/>
            {props.props.editedWork.map((item, index)=>
            <div key={item._id}>
              <Grid key={'input panel'} justify="center" align="center">
                <Grid.Col key={'delete'} span={props.props.screenSizeOrderButLine < 12 ? 0.4 : 0}>
                  <Center>
                    <IconSquareX color='red' onClick={() => {
                      props.props.editedWork.splice(index, 1)
                      // props.props.setEditedWork({...props.props.editedWork, parts: props.props.editedWork.parts})
                      props.props.setEditedWork([...props.props.editedWork])
                    }}/>
                  </Center>
                </Grid.Col>
                <Grid.Col key={props.text.servOrPart[props.leng]} span={props.props.screenSizeOrderButLine < 12 ? 5.1 : 12}>
                  <TextInput value={item.work} placeholder={props.text.servOrPart[props.leng]} error={!item.work}
                    onChange={(event) => {
                      item.work = event.target.value
                      console.log('ddd')
                      props.props.setEditedWork([...props.props.editedWork])
                    }}/>
                </Grid.Col>
                <Grid.Col key={props.text.master[props.leng]} span={props.props.screenSizeOrderButLine < 12 ? 1.9 : 12}>
                  <Select value={item.master} placeholder={props.text.master[props.leng]} error={!item.master}
                    data={props.service.localUsers.map(item => ({label: item.name ? item.name + ' (' + item.email + ')' : item.email, value: item.id}))}
                    onChange={(event) => {
                      item.master = event
                      props.props.setEditedWork([...props.props.editedWork])
                    }}/>
                </Grid.Col>
                <Grid.Col key={props.text.varanty[props.leng]} span={props.props.screenSizeOrderButLine < 12 ? 1.2 : 12}>
                  <NumberInput value={item.varanty} placeholder={props.text.varanty[props.leng]} 
                    // data={[1, 7, 14, 30, 60, 90, 120, 365].map(item => ({label: `${item} `, value: item}))}
                    onChange={(event) => {
                      item.varanty = event
                      props.props.setEditedWork([...props.props.editedWork])
                    }}/>
                </Grid.Col>
                <Grid.Col key={props.text.subCost[props.leng]} span={props.props.screenSizeOrderButLine < 12 ? 1.2 : 12}>
                  <NumberInput value={item.subCost} placeholder={props.text.subCost[props.leng]}
                    onChange={(event) => {
                      item.subCost = event
                      props.props.setEditedWork([...props.props.editedWork])
                    }}/>
                </Grid.Col>
                <Grid.Col key={props.text.cost[props.leng]} span={props.props.screenSizeOrderButLine < 12 ? 1.2 : 12}>
                  <NumberInput value={item.cost} placeholder={props.text.cost[props.leng]} error={!item.cost}
                    onChange={(event) => {
                      item.cost = event
                      props.props.setEditedWork([...props.props.editedWork])
                    }}/>
                </Grid.Col>
                <Grid.Col key={'profit'} span={props.props.screenSizeOrderButLine < 12 ? 1 : 12}>
                  {profit(item.cost, item.subCost)}
                </Grid.Col>
              </Grid>
              {partsEdit(item.parts)}
            </div>
            )}
            <Space h='sm'/>
            <Button
              disabled={activButEditWork(props.props.editedWork, order._work_)}
              onClick={() => {
                sendToSocket('updateOrderWork', {
                  serviceId: props.user.serviceId, 
                  subServiceId: props.user.subServiceId,
                  orderId: order._id,
                  work: props.props.editedWork
                })
              }}
            > 
            {props.text.save[props.leng]}
            </Button>
            <Space h='sm'/>
          </div>
        )
      }
    }
  }
  const orderPhotosLine = (order) => {
    if(order._mediaPhotos_ && order._mediaPhotos_.length){
      return (
        <>
        <Space h='sm'/>
        <Grid>
          {order._mediaPhotos_.map((item, index)=> 
            <Grid.Col span={1.2} key={index}>
              <Image 
                src={`data:image/jpeg;base64,${item}`}
                radius="sm"
                h='15vmax'
                w="auto"
              />
            </Grid.Col>
          )}
        </Grid>
        </>
      )
    }
  }
  
  const bottomSideData = (order) => {
    return (
      <Tabs defaultValue={props.text.information[props.leng]} color={colorOrder(order._status_)}>

        <Tabs.List>
          <Tabs.Tab value='time' disabled>{props.text.updated[props.leng]}: {specData(order._updateTime_, 'updatedAt')}</Tabs.Tab>
          <Tabs.Tab value={props.text.information[props.leng]}>{props.text.information[props.leng]}</Tabs.Tab>
          <Tabs.Tab value={props.text.works[props.leng]}>{props.text.works[props.leng]}</Tabs.Tab>
          <Tabs.Tab value={props.text.history[props.leng]}>{props.text.history[props.leng]}</Tabs.Tab>
          <Tabs.Tab value={props.text.close[props.leng]} ml="auto">{props.text.close[props.leng]}</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value={props.text.close[props.leng]} pt="xs">
          <Grid justify="center" grow>
            {[<></>,
              // <Button
              //   color='red'
              //   fullWidth
              //   onClick={async () => {
              //     // await props.props.printDocument(order, 'WarrantyOrderPrint')
              //   }}
              //   >
              //   {props.text.delete[props.leng]}
              // </Button>,
              // <></>,
              <Button
                color='green'
                fullWidth
                onClick={async () => {
                  await props.props.printDocument(order, 'WarrantyOrderPrint')
                }}
                >
                {props.text.closeOrder[props.leng]}
              </Button>,
              <></>
            ]
            .map((item, index) => <Grid.Col key={index} span={props.props.screenSizeOrderButLine}>{item}</Grid.Col>)}
          </Grid>
          <Space h='lg'/>
          <Table withTableBorder withColumnBorders verticalSpacing="0.01vmax" variant="vertical">
          <Table.Tbody>
            <Table.Tr>
                    <Table.Td>
                      <Center>
                        {props.text.servOrPart[props.leng]}
                      </Center>
                    </Table.Td>
                    <Table.Td>
                      <Center>
                        {props.text.varanty[props.leng]}
                      </Center>
                    </Table.Td>
                    <Table.Td>
                      <Center>
                       {props.text.cost[props.leng]}
                      </Center>
                    </Table.Td>
            </Table.Tr> 
            {order._work_.map(work =>
                <>
                  <Table.Tr>
                    <Table.Td width={'70%'}>
                      {work.work + work.parts.filter(item => item.link === 'mix').map(item => ' ' + item.part).join(' / ')}
                    </Table.Td>
                    <Table.Td width={'15%'}>
                      <Center>
                        {[...work.parts
                          .filter(item => ['mix', 'hide'].includes(item.link) && item.varanty)
                          .map(item => item.varanty), work.varanty ? work.varanty : 0]
                          .sort((a, b) => b - a)}
                      </Center>
                    </Table.Td>
                    <Table.Td width={'15%'}>
                      <Center>
                        {work.parts.filter(item => ['mix', 'hide'].includes(item.link)).reduce((acc, item) => acc + item.cost, work.cost)}
                      </Center>
                    </Table.Td>
                  </Table.Tr>
                  {work.parts.filter(w => 'apart' === w.link).map(part => 
                    <Table.Tr>
                      <Table.Td>
                        {part.part ? part.part : '--'}
                      </Table.Td>
                      <Table.Td>
                        <Center>
                          {part.varanty ? part.varanty : 0}
                        </Center>
                      </Table.Td>
                      <Table.Td>
                        <Center>
                          {part.cost ? part.cost : 0}
                        </Center>
                      </Table.Td>
                    </Table.Tr>
                  )}
                </>
                )
              }
            <Table.Tr>
              <Table.Td>
              </Table.Td>
              <Table.Td>
              </Table.Td>
              <Table.Td>
                <Center>
                  {order._work_.reduce((acc, work) => acc + work.cost + work.parts.reduce((acc, part) => acc + part.cost, 0), 0)}
                </Center>
              </Table.Td>
            </Table.Tr>
          </Table.Tbody>
          </Table>
          
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
          <Space h='lg'/>
          {[...order._information_].reverse().map((item, index) => <div key={index}>{item}</div>)}
        </Tabs.Panel>

        <Tabs.Panel value={props.text.works[props.leng]} pt="xs">

          <Grid key={'title panel'} justify="center" align="center">
            <Grid.Col key={'Service'} span={props.props.screenSizeOrderButLine < 12 ? 5.5 : 12}>
              <Badge variant="dot" color={activDotWork(props.props.newWork)}>{props.text.servOrPart[props.leng]}</Badge>
            </Grid.Col>
            <Grid.Col key={props.text.master[props.leng]} span={props.props.screenSizeOrderButLine < 12 ? 1.9 : 12}>
              <Badge variant="dot" color={activDotMaster(props.props.newWork)}>{props.text.master[props.leng]}</Badge>
            </Grid.Col>
            <Grid.Col key={props.text.varanty[props.leng]} span={props.props.screenSizeOrderButLine < 12 ? 1.2: 12}>
              <Badge variant="dot" color="grey">{props.text.varanty[props.leng]}</Badge>
            </Grid.Col>
            <Grid.Col key={props.text.subCost[props.leng]} span={props.props.screenSizeOrderButLine < 12 ? 1.2 : 12}>
              <Badge variant="dot" color="grey">{total().sumSub !== 0 ? total().sumSub : ''} {props.text.subCost[props.leng]}</Badge> 
            </Grid.Col>
            <Grid.Col key={props.text.cost[props.leng]} span={props.props.screenSizeOrderButLine < 12 ? 1.2 : 12}>
              <Badge variant="dot" color={activDotCost(props.props.newWork)}>{total().sumCost !== 0 ? total().sumCost : ''} {props.text.cost[props.leng]}</Badge> 
            </Grid.Col>
            <Grid.Col key={'profit'} span={props.props.screenSizeOrderButLine < 12 ? 1 : 12}>
              {total().sumProfit}
            </Grid.Col>
          </Grid>
          <Grid key={'input panel'} justify="center" align="center">
            <Grid.Col key={'Service'} span={props.props.screenSizeOrderButLine < 12 ? 5.5 : 12}>
              <Autocomplete
                value={props.props.newWork.work}
                placeholder={props.text.uslugi[props.leng]}
                error={!props.props.newWork.work}
                data={props.service.uslugi.map(item => item.value + ` | ${props.text.cost[props.leng]}: ` + item.price)}
                onChange={(event) => {
                  if(!props.props.newWork.subCost && props.service.uslugi.find(item => item.value === event.split(' | ')[0])){
                    props.props.setNewWork({...props.props.newWork, cost: props.service.uslugi.find(item => item.value === event.split(' | ')[0]).price, work: event.split(' | ')[0]})
                  }
                  else{
                    props.props.setNewWork({...props.props.newWork, work: event.split(' | ')[0]})
                  }
                }}
              />
            </Grid.Col>
            <Grid.Col key={props.text.master[props.leng]} span={props.props.screenSizeOrderButLine < 12 ? 1.9 : 12}>
              <Select value={props.props.newWork.master ? props.props.newWork.master : props.user._id} placeholder={props.text.master[props.leng]} error={!props.props.newWork.master}
                data={props.service.localUsers.map(item => ({label: item.name ? item.name + ' (' + item.email + ')' : item.email, value: item.id}))}
                onChange={(event) => {
                  props.props.setNewWork({...props.props.newWork, master: event})
                }}/>
            </Grid.Col>
            <Grid.Col key={props.text.varanty[props.leng]} span={props.props.screenSizeOrderButLine < 12 ? 1.2 : 12}>
              <NumberInput value={props.props.newWork.varanty} placeholder={props.text.varanty[props.leng]} 
                // data={[1, 7, 14, 30, 60, 90, 120, 365].map(item => ({label: `${item} `, value: item}))}
                onChange={(event) => {
                  props.props.setNewWork({...props.props.newWork, varanty: event})
                }}/>
            </Grid.Col>
            <Grid.Col key={props.text.subCost[props.leng]} span={props.props.screenSizeOrderButLine < 12 ? 1.2 : 12}>
              <NumberInput value={props.props.newWork.subCost} placeholder={props.text.subCost[props.leng]}
                onChange={(event) => {
                  props.props.setNewWork({...props.props.newWork, subCost: event})
                }}/>
            </Grid.Col>
            <Grid.Col key={props.text.cost[props.leng]} span={props.props.screenSizeOrderButLine < 12 ? 1.2 : 12}>
              <NumberInput value={props.props.newWork.cost} placeholder={props.text.cost[props.leng]} error={!props.props.newWork.cost}
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
          {controlNewWorkButtonsPanel(order)}
          {orderWorksPanel(order)}
        </Tabs.Panel>

        <Tabs.Panel value={props.text.history[props.leng]} pt="xs">
          {history(order._history_)}
        </Tabs.Panel>

      </Tabs>
    )
  }
  const acordControl = (element) => {
    if(props.props.orderAcord === element._id){
      return (
        <Accordion.Panel>
          <Grid justify="center" grow>
            {props.service.statuses.map(item => 
              <Grid.Col key={item} span={props.props.screenSizeOrderButLine}>
                <Button 
                  color={item === element._status_ ? colorOrder(element._status_) : 'grey'} 
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
          <Space h='xs'/>
          {bottomSideData(element)}
          <Space h='xs'/>
          <hr color={colorOrder(element._status_)}></hr>
          <Space h='sm'/>
          {dataForTable(element)}
          <Space h='sm'/>
          <Group justify="space-between">
            <Button
              disabled={!element._media_.length || element._mediaPhotos_}
              variant='default'
              onClick={() => {
                sendToSocket('getOrderPhotos', {
                  serviceId: props.user.serviceId, 
                  subServiceId: props.user.subServiceId,
                  orderId: element._id,
                })
              }}
            >
            {props.text.photos[props.leng]}
            </Button>
            <Button
              disabled={!props.user.telegramId}
              variant='default'
              onClick={() => {
                sendToSocket('sendOrderToTelegram', {
                  serviceId: props.user.serviceId, 
                  subServiceId: props.user.subServiceId,
                  orderId: element._id,
                })
              }}
            >
            {props.text.sendToTelegram[props.leng]}
            </Button>
          </Group>
          
          {orderPhotosLine(element)}
          
        </Accordion.Panel>
      )
    }
  }

  if(props.orders.length){
    const rowss = props.orders.map((element) => (
      <Box pos="relative" key={element._id}>
        <Accordion.Item key={element._id} className={classes.item} value={element._id} 
          style={{
            border: `2px solid ${colorOrder(element._status_)}`
          }}>
          
          <Accordion.Control>

              {props.props.orderAcord && props.props.orderAcord !== element._id ? <Overlay color="#000" backgroundOpacity={0.35} blur={0.7} /> : <></>}
          
              <Grid justify="center" align="center" visibleFrom="sm">
                {activData.map((item, index) => 
                  <Grid.Col span={12 / activData.length} key={element._id + index}><Center>{textBigToSmall(specData(element[item.item], item.item), 30)}</Center></Grid.Col>
                )}
              </Grid>
              <Grid justify="center" align="center" hiddenFrom="sm">
                {activData.slice(0, 3).map((item, index) => 
                  <Grid.Col span={4} key={element._id + index}><Center>{textBigToSmall(specData(element[item.item], item.item), 35)}</Center></Grid.Col>
                )}
              </Grid>
            
          </Accordion.Control>
          
          {acordControl(element)}
        </Accordion.Item>
      </Box>
    ))
    
    return (
      <div>
        <Grid justify="space-between" align="center" visibleFrom="sm" style={{marginBottom: '1vmax'}}>
          {activData.map(item => 
              <Grid.Col span={12 / activData.length} key={item.item}><Center>{textBigToSmall(line.find(w => w.data === item.item).name, 15)}</Center></Grid.Col>
            )}
        </Grid>
        <Container size="100%" className={classes.wrapper}>
          <Accordion 
            value={props.props.orderAcord} 
            onChange={(event) => {
              if(event){
                props.props.setEditedWork([])
                sendToSocket('getOrder', {
                    serviceId: props.user.serviceId, 
                    subServiceId: props.user.subServiceId,
                    orderId: event
                  }
                )
              }
              props.props.setOrderAcord(event)
            }} 
            variant="separated" 
            chevron={false}>
            {rowss}
          </Accordion>
        </Container>
      </div>
    )
  }

  return <LoaderShow/>

}