import { Button, Center, ColorPicker, Grid, Group, Text, TextInput, HoverCard } from '@mantine/core'
import React from 'react'
import { sendToSocket } from '../../../../../modules/socket/pipSendSocket.ts'
import { upFirstString } from '../../../../../modules/upFirstString.ts'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import { IconHandStop } from '@tabler/icons-react'

export function ChangeServiceStatusList(props, message) {

  console.log('ChangeServiceStatusList')

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
                    sendToSocket('changeColorStatus', {
                      serviceId: props.user.serviceId, 
                      subServiceId: props.user.subServiceId, 
                      status: props.props.colorStatus.status,
                      color: props.props.colorStatus.color
                    })
                    props.props.setColorStatus(false)
                  }}>
                  {props.text.save[props.leng]}
                </Button>
                </Group>

                <ColorPicker
                  value={colorBut(item)}
                  onChange={(color) => {
                    console.log(props.props.colorStatus)
                    props.props.setColorStatus({status: item, color: color})
                    console.log(props.props.colorStatus)
                  }}
                  format="hex"
                    swatches={['#2e2e2e', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14']}
                />
                <hr></hr>
                  <Button size='xs'
                    color='red'
                    onClick={() => {
                      sendToSocket(message, {
                        serviceId: props.user.serviceId, 
                        subServiceId: props.user.subServiceId, 
                        status: item
                      })
                    }}>
                    {props.text.delete[props.leng]}
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
          sendToSocket('replaceStatusPosition', {
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

      <TextInput placeholder={props.text.statusName[props.leng]}
        value={props.props.status}
        onChange={(event) => {
          props.props.setStatus(upFirstString(event.target.value))
        }}/>

      <Button style={{marginTop: 10}}
      disabled={!props.props.status || props.service.statuses.includes(props.props.status)}
      onClick={() => {
        sendToSocket(message, {
          serviceId: props.user.serviceId, 
          subServiceId: props.user.subServiceId, 
          status: props.props.status.toString()
        })
        props.props.setStatus('')
      }}
      >{props.text.add[props.leng]}
      </Button>

    </div>
  )
}