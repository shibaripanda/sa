import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import { IconGripVertical } from '@tabler/icons-react'
import { Button, Center, Table } from '@mantine/core'
// @ts-ignore
import classes from './DragAndDrop.module.css'
import React from 'react'
import { sendToSocket } from '../../../../../../modules/socket/pipSendSocket.ts'

export function DragAndDrop(props, message) {

    const items = props.props.dragDrop.map((item, index) => (
        <Draggable key={item.item} index={index} draggableId={item.item}>
          {(provided) => (
            <Table.Tr className={classes.item} ref={provided.innerRef} {...provided.draggableProps}>
              <Table.Td>
                <div className={classes.dragHandle} {...provided.dragHandleProps}>
                  <IconGripVertical size={18} stroke={1.5} />
                </div>
              </Table.Td>
              <Table.Td>{item.item}</Table.Td>
              <Table.Td><Center>{item.control.toString()}</Center></Table.Td>
              <Table.Td><Center>{item.variants.length}</Center></Table.Td>
              <Table.Td><Center>{item.onlyVariants.toString()}</Center></Table.Td>
              <Table.Td><Center>{item.multiVariants.toString()}</Center></Table.Td>
              <Table.Td><Center>{item.hidden.toString()}</Center></Table.Td>
              <Table.Td>
                <Center>
                    <Button
                        color='red'
                        onClick={() => {
                            sendToSocket(message, {
                            serviceId: props.user.serviceId, 
                            subServiceId: props.user.subServiceId, 
                            newOrderData: item.item
                            })
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
        <Table.ScrollContainer minWidth={420}>
          <DragDropContext
            onDragEnd={({ destination, source }) => {
                    props.props.setDragDrop.reorder({ from: source.index, to: destination?.index || 0 })
                }
            }
          >
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th/>
                  <Table.Th>Name</Table.Th>
                  <Table.Th><Center>Control</Center></Table.Th>
                  <Table.Th><Center>Variants</Center></Table.Th>
                  <Table.Th><Center>OnlyVariants</Center></Table.Th>
                  <Table.Th><Center>MultiVariants</Center></Table.Th>
                  <Table.Th><Center>Hide</Center></Table.Th>
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
      )
    }