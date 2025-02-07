import { Button, Chip, Grid, Group, Text } from '@mantine/core'
import React from 'react'
import { sendToSocket } from '../../../../../modules/socket/pipSendSocket.ts'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import { IconHandStop } from '@tabler/icons-react'

export function ChangeMyMainOrderDataLine(props, item) {

  console.log('ChangeMyMainOrderDataLine')

  // stateDataOrderLine setDataOrderLine

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

  if(props.props.stateDataOrderLine.length === 0){
    props.props.setDataOrderLine.setState(line)
  }

  const activeData = (data) => {
    console.log(props.user)
    const res = props.user.orderDataShowItems.find(item => item.serviceId === props.service.serviceId)
    if(res && res.data.includes(data)){
      return 'green'
    }
    return 'grey'
  }

  const items = props.props.stateDataOrderLine.map((item, index) => (

    <Draggable key={item.data} index={index} draggableId={item.data}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div>
            <IconHandStop/>
            <Button fullWidth color={activeData(item.data)}>{item.name}</Button>
            
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
        <Text fw={700} style={{marginBottom: 10}}>{props.text[item.message][props.leng]}</Text>
        <DragDropContext
            onDragEnd={({ destination, source }) => {
              sendToSocket(item.message, {
                            serviceId: props.user.serviceId, 
                            subServiceId: props.user.subServiceId, 
                            index1: source.index,
                            index2: destination?.index || 0 
                            })
            
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
        {/* <Group>{line.map(item => <Chip checked={true} onChange={() => {}}>{item.name}</Chip>)}</Group> */}
    </div>
    )
}