import { Button, Chip, Grid, Group, Space, Text } from '@mantine/core'
import React from 'react'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import { IconHandStop } from '@tabler/icons-react'

export function ChangeMyMainOrderDataLine(props, item1) {

  const deviceName = (name) => {
    if(name === '_DeviceBlocked_'){
      return props.text.device[props.leng]
    }
    return name
  }

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

  const lineActiv = props.user.orderDataShowItems
  .find(item => item.serviceId === props.user.serviceId) ? props.user.orderDataShowItems
  .find(item => item.serviceId === props.user.serviceId).data.filter(f => line.map(r => r.data).includes(f)) : []
  
  if(props.props.stateDataOrderLine[0] === false){
    props.props.setDataOrderLine.setState(lineActiv)
  }

  const activeData = (data) => {
    const res = props.user.orderDataShowItems.find(item => item.serviceId === props.user.serviceId)
    if(res && res.data.includes(data)){
      return true
    }
    return false
  }

  const items = props.props.stateDataOrderLine.map((item, index) => (

    <Draggable key={item} index={index} draggableId={item}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div>
            <IconHandStop/>
            <Button fullWidth variant='default'>{deviceName(line.find(a => a.data === item).name)}</Button>
          </div>
        </div>
      )}
    </Draggable>

  ))
  
  const vertikalHorizontal = (screen) => {
    if(screen === 12){
      return 'vertical'
    }
    return 'horizontal'
  }

  return (
      <div>
        <Text fw={700} style={{marginBottom: 10}}>{props.text[item1.message][props.leng]}</Text>
        <DragDropContext
            onDragEnd={({ destination, source }) => {
              props.user.changeMyMainOrderDataLine(source.index, destination?.index || 0, 'replace')
              props.props.setDataOrderLine.reorder({ from: source.index, to: destination?.index || 0 })
            }}
          >
          <Droppable droppableId="dnd-list" direction={vertikalHorizontal(props.props.screenSizeOrderButLine)}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <Grid grow={props.props.screenSizeOrderButLine === 12} style={{marginBottom: 10}}>{items.map((item, index) => <Grid.Col span={props.props.screenSizeOrderButLine} key={index}>{item}</Grid.Col>)}</Grid>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <Space h="xs" />
        <hr></hr>
        <Space h="xs" />
        <Group>
          {line.map(item => 
          <Chip checked={activeData(item.data)}
            disabled={item.name === '_DeviceBlocked_'}
            onChange={() => {
              if(item.name !== '_DeviceBlocked_'){
                props.user.changeMyMainOrderDataLine(null, null, 'addDelete', item.data, !activeData(item.data))
              }
              if(activeData(item.data)){
                props.props.setDataOrderLine.setState([...props.props.stateDataOrderLine.filter(i => i !== item.data)])
              }
              else{
                props.props.stateDataOrderLine.push(item.data)
                props.props.setDataOrderLine.setState([...props.props.stateDataOrderLine])
              }
            }}>
            {deviceName(item.name)}
          </Chip>)}
        </Group>
    </div>
    )
}