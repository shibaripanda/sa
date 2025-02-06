import { Button, Center, ColorPicker, Grid, Group, HoverCard, Text } from '@mantine/core'
import React from 'react'
import { sendToSocket } from '../../../../../modules/socket/pipSendSocket.ts'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import { IconHandStop } from '@tabler/icons-react'

export function ChangeColorStatus(props, message) {

  console.log('ChangeColorStatus')
  console.log('d', props)

  if(props.props.stateColorList.length !== props.service.statuses.length){
    props.props.setStateColorListhandlers.setState(props.service.statuses)
  }

  const colorBut = (status) => {
    const res = props.service.colorStatuses.find(item => item.status === status)
    return res ? res.color : 'green'
  }

  const items = props.props.stateColorList.map((item, index) => (
    <Draggable key={item} index={index} draggableId={item}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div>
            <IconHandStop/>
          <HoverCard width={280} shadow="md">
            <HoverCard.Target>
              <Button fullWidth color={colorBut(item)}>{item}</Button>
            </HoverCard.Target>
            <HoverCard.Dropdown>
            <Group style={{marginBottom: '0.5vmax'}}>
              <Text>{item}</Text>
              <Button size='xs'
              color={props.props.colorStatus.color}
              disabled={!props.props.colorStatus}
                onClick={() => {
                  sendToSocket(message, {
                    serviceId: props.user.serviceId, 
                    subServiceId: props.user.subServiceId, 
                    status: props.props.colorStatus.status,
                    color: props.props.colorStatus.color
                  })
                }}>
                {props.text.save[props.leng]}
              </Button>
              
            </Group>
            <ColorPicker
              value={props.props.colorStatus.color}
              onChange={(color) => {
                console.log(props.props.colorStatus)
                props.props.setColorStatus({status: item, color: color})
                console.log(props.props.colorStatus)
              }}
              format="hex"
                swatches={['#2e2e2e', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14']}
            />
            <Center>
              <Button size='xs'
                onClick={() => {
                  // if(!['New', 'Ready'].includes(item)){
                    sendToSocket(message, {
                      serviceId: props.user.serviceId, 
                      subServiceId: props.user.subServiceId, 
                      status: item
                    })
                  // }
                }}>
                  {/* {iconStatus(item)}{'\u00A0'} */}
                  <Text>{props.text.delete[props.leng]}</Text>
                </Button>
              </Center>
            </HoverCard.Dropdown>
          </HoverCard>
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
      <Text fw={700} style={{marginBottom: 10}}>{props.text[message][props.leng]}</Text>
      <DragDropContext
        onDragEnd={({ destination, source }) => {
          sendToSocket('replaceStatusPosition', {
                        serviceId: props.user.serviceId, 
                        subServiceId: props.user.subServiceId, 
                        index1: source.index,
                        index2: destination?.index || 0 
                        })
        
          props.props.setStateColorListhandlers.reorder({ from: source.index, to: destination?.index || 0 })
        }}
      >
        <Droppable droppableId="dnd-list" direction={vertikalHorizontal(props.props.screenSize)}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <Grid grow>{items.map((item, index) => <Grid.Col span={props.props.screenSize} key={index}>{item}</Grid.Col>)}</Grid>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}





    