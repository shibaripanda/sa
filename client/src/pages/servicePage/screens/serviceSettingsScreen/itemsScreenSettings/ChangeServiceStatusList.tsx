import { Button, ColorPicker, Grid, Group, Text, TextInput, HoverCard } from '@mantine/core'
import React from 'react'
import { upFirstString } from '../../../../../modules/upFirstString.ts'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import { IconHandStop } from '@tabler/icons-react'
import { editString } from '../../../../../modules/testStringSimbols.js'

export function ChangeServiceStatusList(props, message) {

  console.log('now3', message)


  if(props.props.stateColorList.length !== props.service.statuses.length){
    props.props.setStateColorListhandlers.setState(props.service.statuses)
  }

  const colorBut = (status) => {
    const res = props.service.colorStatuses.find(item => item.status === status)
    return res ? res.color : 'grey'
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
                    props.user.changeColorStatus(props.props.colorStatus.status, props.props.colorStatus.color)
                    props.props.setColorStatus(false)
                  }}>
                  {props.text.save[props.leng]}
                </Button>
                </Group>

                <ColorPicker
                  value={props.props.colorStatus.color}
                  // value={colorBut(item)}
                  onChange={(color) => {
                    props.props.setColorStatus({status: item, color: color})
                  }}
                  format="hex"
                    swatches={['#2e2e2e', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14']}
                />
                <hr></hr>
                  <Button size='xs'
                    color='red'
                    onClick={() => {
                      props.user.changeServiceStatusList(item)
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
          props.user.replaceStatusPosition(source.index, destination?.index || 0)
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
          props.props.setStatus(upFirstString(editString(event.target.value)))
        }}/>

      <Button style={{marginTop: 10}}
      disabled={!props.props.status || props.service.statuses.includes(props.props.status)}
      onClick={() => {
        props.user.changeServiceStatusList(props.props.status.toString())
        props.props.setStatus('')
      }}
      >{props.text.add[props.leng]}
      </Button>

    </div>
  )
}