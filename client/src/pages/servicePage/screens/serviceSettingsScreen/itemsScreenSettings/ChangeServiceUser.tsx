import { Button, Center, Checkbox, Table, Text, TextInput, Tooltip } from '@mantine/core'
import React from 'react'
import { sendToSocket } from '../../../../../modules/socket/pipSendSocket.ts'
import { upFirstString } from '../../../../../modules/upFirstString.ts'
import { IconSquareX } from '@tabler/icons-react'

export function ChangeServiceUser(props, message) {

  console.log('ChangeServiceUser', props, message)

  sendToSocket('getServiceUsers', {
                serviceId: props.user.serviceId, 
                subServiceId: props.user.subServiceId
              })

              console.log(props.props.users)

  return (
    <div>
        <Text fw={700} style={{marginBottom: 10}}>{props.text[message][props.leng]}</Text>

        <Table.ScrollContainer minWidth={500}>
          <Table stickyHeader>
            <Table.Thead>
            <Table.Tr>
              <Table.Th>Доступ</Table.Th>
              {props.service.roles.map(item => <Table.Th key={item.role}>
                {item.role}
                </Table.Th>)}
              <Table.Th>Доступ</Table.Th>
            </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {props.props.users.map(item => <Table.Tr key={item._id}>
                                            <Table.Td>
                                              {item.name ? item.name + ' ' + item.email : item.email}
                                            </Table.Td>
                                            {/* {props.service.roles.map((role, index) => <Table.Td  key={index}>{accessStatus(item, role.role)}</Table.Td>)} */}
                                            <Table.Td>
                                              {/* {props.text[item][props.leng]} */}
                                            </Table.Td>
                                        </Table.Tr>)}
            </Table.Tbody>
            <Table.Thead>
            <Table.Tr>
              <Table.Th></Table.Th>
              {props.service.roles.map(item => <Table.Th key={item.role}>
                {item.role}
                </Table.Th>)}
              <Table.Th></Table.Th>
            </Table.Tr>
            </Table.Thead>
            
          </Table>
        </Table.ScrollContainer>
      
        {/* <Table.ScrollContainer minWidth={500}>
          <Table stickyHeader>
            <Table.Thead>
            <Table.Tr>
              <Table.Th>Доступ</Table.Th>
              {props.service.roles.map(item => <Table.Th key={item.role}>
                <Button variant='default' key={item}
                            onClick={() => {
                              sendToSocket('addNewServiceRole', {
                                serviceId: props.user.serviceId, 
                                subServiceId: props.user.subServiceId, 
                                newRole: item.role
                                })
                            }}>
                              <IconSquareX color='red'/>{'\u00A0'}<Text>{item.role}</Text>
                            </Button>
                </Table.Th>)}
              <Table.Th>Доступ</Table.Th>
            </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {linesAccess().map(item => <Table.Tr key={item}>
                                            <Table.Td>
                                              {props.text[item][props.leng]}
                                            </Table.Td>
                                            {props.service.roles.map((role, index) => <Table.Td  key={index}>{accessStatus(item, role.role)}</Table.Td>)}
                                            <Table.Td>
                                              {props.text[item][props.leng]}
                                            </Table.Td>
                                        </Table.Tr>)}
            </Table.Tbody>
            <Table.Thead>
            <Table.Tr>
              <Table.Th>Доступ</Table.Th>
              {props.service.roles.map(item => <Table.Th key={item.role}>
                <Button variant='default' key={item}
                            onClick={() => {
                              sendToSocket('addNewServiceRole', {
                                serviceId: props.user.serviceId, 
                                subServiceId: props.user.subServiceId, 
                                newRole: item.role
                                })
                            }}>
                              <IconSquareX color='red'/>{'\u00A0'}<Text>{item.role}</Text>
                            </Button>
                </Table.Th>)}
              <Table.Th>Доступ</Table.Th>
            </Table.Tr>
            </Table.Thead>
            
          </Table>
        </Table.ScrollContainer> */}
        

        <TextInput placeholder={props.text.newRole[props.leng]}
        value={props.props.newRole}
        onChange={(event) => {
          props.props.setNewRole(upFirstString(event.target.value))
        }}/>
        <Button style={{marginTop: 10}}
        disabled={!props.props.newRole || props.service.roles.map(item => item.role).includes(props.props.newRole) || ['Owner', 'owner'].includes(props.props.newRole)}
        onClick={() => {
          sendToSocket('addNewServiceRole', {
            serviceId: props.user.serviceId, 
            subServiceId: props.user.subServiceId, 
            newRole: props.props.newRole.toString()
          })
          props.props.setNewRole('')
        }}
        >{props.text.add[props.leng]}
        </Button>
    </div>
  )
}