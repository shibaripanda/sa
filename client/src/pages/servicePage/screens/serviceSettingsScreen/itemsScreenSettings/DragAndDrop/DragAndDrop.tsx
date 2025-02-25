import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import { IconCheck, IconGripVertical, IconX } from '@tabler/icons-react'
import { Button, Center, Checkbox, Group, Switch, Table, Text } from '@mantine/core'
// @ts-ignore
import classes from './DragAndDrop.module.css'
import React from 'react'
import { sendToSocket } from '../../../../../../modules/socket/pipSendSocket.ts'
import { ModalListVariant } from '../ListVariant/ModalListVariant.tsx'

export function DragAndDrop(props, message) {

  const colorTextDisableItem = (check) => {
    if(check){
      return 'grey'
    }
  }

  const listBut = (item) => {
    // console.log(item.variant)
    if(item.variant){
      return (
            <Button
              variant='default'
              disabled={item.hidden || item.number}
              size='xs'
              onClick={() => {
                props.props.setListVariantName(item.item)
                props.props.open()
              }}>
                List
            </Button>
      )
    }
  }

  const items = props.props.dragDrop.map((item, index) => (
    <Draggable key={item.item} index={index} draggableId={item.item}>
      {(provided) => (
        <Table.Tr className={classes.item} ref={provided.innerRef} {...provided.draggableProps}>
            <Table.Td>
              <div className={classes.dragHandle} {...provided.dragHandleProps}>
                <IconGripVertical size={18} stroke={1.5} />
              </div>
            </Table.Td>
            <Table.Td>
                <Switch
                checked={!item.hidden}
                color='green'
                onChange={() => {
                  sendToSocket('orderDataEdit', {
                    serviceId: props.user.serviceId, 
                    subServiceId: props.user.subServiceId,
                    item: item.item, 
                    data: 'hidden',
                    newValue: !item.hidden
                    })
                    props.props.setDragDrop.setItem(index, {...item, hidden: !item.hidden})
                  }
                }
                thumbIcon={
                  !item.hidden ? (
                    <IconCheck size={12} color="var(--mantine-color-teal-6)" stroke={3} />
                  ) : (
                    <IconX size={12} color="var(--mantine-color-red-6)" stroke={3} />
                  )
                }
                />
            </Table.Td>
            <Table.Td>
              <Text c={colorTextDisableItem(item.hidden)}>
                {item.item}
              </Text>
            </Table.Td>
            <Table.Td>
              <Center>
              <Checkbox
                  checked={item.number}
                  disabled={item.hidden}
                  onChange={() => {
                    sendToSocket('orderDataEdit', {
                      serviceId: props.user.serviceId, 
                      subServiceId: props.user.subServiceId,
                      item: item.item, 
                      data: 'number',
                      newValue: !item.number
                      })
                      props.props.setDragDrop.setItem(index, {...item, number: !item.number})
                    }
                  }
                  />
              </Center>
            </Table.Td>
            <Table.Td>
              <Center>
              <Checkbox
                  checked={item.control}
                  disabled={item.hidden}
                  onChange={() => {
                    sendToSocket('orderDataEdit', {
                      serviceId: props.user.serviceId, 
                      subServiceId: props.user.subServiceId,
                      item: item.item, 
                      data: 'control',
                      newValue: !item.control
                      })
                      props.props.setDragDrop.setItem(index, {...item, control: !item.control})
                    }
                  }
                  />
              </Center>
            </Table.Td>
            <Table.Td>
              <Center>
                <Group>
                  <Switch
                    checked={item.variant}
                    color='green'
                    disabled={item.hidden || item.number}
                    onChange={() => {
                      sendToSocket('orderDataEdit', {
                        serviceId: props.user.serviceId, 
                        subServiceId: props.user.subServiceId,
                        item: item.item, 
                        data: 'variant',
                        newValue: !item.variant
                        })
                        props.props.setDragDrop.setItem(index, {...item, variant: !item.variant})
                      }
                    }
                    thumbIcon={
                      item.variant ? (
                        <IconCheck size={12} color="var(--mantine-color-teal-6)" stroke={3} />
                      ) : (
                        <IconX size={12} color="var(--mantine-color-red-6)" stroke={3} />
                      )
                    }
                  />
                  {listBut(item)}
                </Group>
              </Center>
            </Table.Td>       
            <Table.Td>
              <Center>
              <Checkbox 
                  checked={item.onlyVariants}
                  disabled={!item.variant || item.hidden || item.number}
                  onChange={() => {
                    sendToSocket('orderDataEdit', {
                      serviceId: props.user.serviceId, 
                      subServiceId: props.user.subServiceId,
                      item: item.item, 
                      data: 'onlyVariants',
                      newValue: !item.onlyVariants
                      })
                      props.props.setDragDrop.setItem(index, {...item, onlyVariants: !item.onlyVariants})
                    }
                  }
                  />
              </Center>
            </Table.Td>
            <Table.Td>
              <Center>
                <Checkbox
                  checked={item.multiVariants}
                  disabled={!item.variant || item.hidden || item.number}
                  onChange={() => {
                    sendToSocket('orderDataEdit', {
                      serviceId: props.user.serviceId, 
                      subServiceId: props.user.subServiceId,
                      item: item.item, 
                      data: 'multiVariants',
                      newValue: !item.multiVariants
                      })
                      props.props.setDragDrop.setItem(index, {...item, multiVariants: !item.multiVariants})
                    }
                  }
                  />
              </Center>
            </Table.Td>
            <Table.Td>
              <Center>
              <Checkbox 
                  checked={item.saveNewVariants}
                  disabled={!item.variant || item.hidden || item.onlyVariants || item.number}
                  onChange={() => {
                    sendToSocket('orderDataEdit', {
                      serviceId: props.user.serviceId, 
                      subServiceId: props.user.subServiceId,
                      item: item.item, 
                      data: 'saveNewVariants',
                      newValue: !item.saveNewVariants
                      })
                      props.props.setDragDrop.setItem(index, {...item, saveNewVariants: !item.saveNewVariants})
                    }
                  }
                  />
              </Center>
            </Table.Td>
            <Table.Td>
            <Center>
                <Button
                    disabled={item.blocked}
                    variant='default'
                    size='xs'
                    c='red'
                    onClick={() => {
                        sendToSocket(message, {
                        serviceId: props.user.serviceId, 
                        subServiceId: props.user.subServiceId, 
                        newOrderData: item.item
                        })
                        props.props.setDragDrop.remove(index)
                    }}
                    >{props.text.delete[props.leng]}
                </Button>
            </Center>
            </Table.Td>
        </Table.Tr>
      )}
    </Draggable>
  ))
    
    return (
      <>
      <Table.ScrollContainer minWidth={420}>
        <DragDropContext
          onDragEnd={({ destination, source }) => {
            sendToSocket('replaceOrderDataItems', {
              serviceId: props.user.serviceId, 
              subServiceId: props.user.subServiceId, 
              index1: source.index,
              index2: destination?.index || 0 
              })
                props.props.setDragDrop.reorder({ from: source.index, to: destination?.index || 0 })
              }
          }
        >
          
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th/>
                <Table.Th/>
                <Table.Th>Name</Table.Th>
                <Table.Th><Center>Number</Center></Table.Th>
                <Table.Th><Center>Control</Center></Table.Th>
                <Table.Th><Center>Variants</Center></Table.Th>
                
                <Table.Th><Center>OnlyVariants</Center></Table.Th>
                <Table.Th><Center>MultiVariants</Center></Table.Th>
                <Table.Th><Center>SaveNewVariants</Center></Table.Th>
                
                <Table.Th><Center>{props.text.delete[props.leng]}</Center></Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Droppable droppableId="dnd-list" direction="vertical">
              {(provided) => (
                <Table.Tbody {...provided.droppableProps} ref={provided.innerRef}>
                  {items}
                  {provided.placeholder}
                </Table.Tbody>
              )}
            </Droppable>
            
          </Table>
        </DragDropContext>
      </Table.ScrollContainer>
      <ModalListVariant {...props}/>
      </>
    )
  }