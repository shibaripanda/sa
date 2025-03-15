import { Button, Grid, Group, HoverCard, Text, TextInput } from '@mantine/core'
import React from 'react'
import { sendToSocket } from '../../../../../modules/socket/pipSendSocket.ts'
import { IconHandStop, IconSquareX } from '@tabler/icons-react'
import { upFirstString } from '../../../../../modules/upFirstString.ts'
import { editString } from '../../../../../modules/testStringSimbols.js'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'

export function ChangeServiceDeviceList(props, message) {

    
  console.log('ChangeServiceDeviceList')


  const items = props.service.devices.map((item, index) => (

    <Draggable key={item} index={index} draggableId={item}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div>
            <IconHandStop/>
            <HoverCard shadow="md">
              <HoverCard.Target> 
                <Button variant='default' key={item} fullWidth>
                  {item}
                </Button>
              </HoverCard.Target>
              
              <HoverCard.Dropdown>
              <Button color='red' key={item} size='xs'
                onClick={() => {
                  sendToSocket(message, {
                    serviceId: props.user.serviceId, 
                    subServiceId: props.user.subServiceId, 
                    device: item
                  })
                }}>
                  {props.text.delete[props.leng]} {item}
                </Button>
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
          sendToSocket('replaceDevicePosition', {
                        serviceId: props.user.serviceId, 
                        subServiceId: props.user.subServiceId, 
                        index1: source.index,
                        index2: destination?.index || 0 
                        })
        
          props.props.setStateColorListhandlers.reorder({ from: source.index, to: destination?.index || 0 })
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

      <TextInput placeholder={props.text.deviceName[props.leng]}
      value={props.props.device}
      onChange={(event) => {
        props.props.setDevice(upFirstString(editString(event.target.value)))
      }}/>
      <Button style={{marginTop: 10}}
      disabled={!props.props.device || props.service.devices.includes(props.props.device)}
      onClick={() => {
        sendToSocket(message, {
          serviceId: props.user.serviceId, 
          subServiceId: props.user.subServiceId, 
          device: props.props.device.toString()
        })
        props.props.setDevice('')
      }}
      >{props.text.add[props.leng]}
      </Button>
    </div>
  )
}