import { Button, Center, Checkbox, Table, Text, TextInput, Tooltip } from '@mantine/core'
import React from 'react'
import { sendToSocket } from '../../../../../modules/socket/pipSendSocket.ts'
import { upFirstString } from '../../../../../modules/upFirstString.ts'
import { line } from '../../screensLine.ts'
import { IconSquareX } from '@tabler/icons-react'

export function ChangeServiceRole(props, message) {

  // console.log('ChangeServiceRole', props, message)
  console.log('ChangeServiceRole')

  const accessItems = (roles) => {
      if(!roles){
        accessItems(roles)
      }
      else{
        let res: any = {}
        for(const i of roles){
          res[i.role] = {}
          for(const a of line.map(item => item.items).flat().map(item => item.message)){
            res[i.role][a] = i.access.includes(a)
          }
        }
        return res
      }
    }
  props.props.checkedAccess = accessItems(props.service.roles)

  

  const linesAccess = () => {
    return line.map(item => item.items).flat().map(item => item.message)
  }

  const accessStatus = (itemAccess, role) => {
    return <Center>
            <Tooltip label={props.text[itemAccess][props.leng]}>
              <Checkbox
                checked={props.props.checkedAccess[role][itemAccess]}
                onChange={(event) => {
                  props.props.setCheckedAccess({...props.props.checkedAccess, [role]: {...props.props.checkedAccess[role], [itemAccess]: event.currentTarget.checked}})
                  
                  sendToSocket(message, {
                    serviceId: props.user.serviceId, 
                    subServiceId: props.user.subServiceId, 
                    role: role,
                    access: itemAccess
                  })
                }}
              />
            </Tooltip>
          </Center>
  }

  return (
    <div>
        <Text fw={700} style={{marginBottom: 10}}>{props.text[message][props.leng]}</Text>
      
        <Table.ScrollContainer minWidth={500}>
          <Table withTableBorder withColumnBorders highlightOnHover>
            <Table.Thead>
            <Table.Tr>
              <Table.Th>Доступ</Table.Th>
              {props.service.roles.map(item => <Table.Th key={item.role}>
                <Center>
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
                            </Center>
                </Table.Th>)}
              {/* <Table.Th>Доступ</Table.Th> */}
            </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {linesAccess().map(item => <Table.Tr key={item}>
                                            <Table.Td>
                                              {props.text[item][props.leng]}
                                            </Table.Td>
                                            {props.service.roles.map((role, index) => <Table.Td  key={index}>{accessStatus(item, role.role)}</Table.Td>)}
                                            {/* <Table.Td>
                                              {props.text[item][props.leng]}
                                            </Table.Td> */}
                                        </Table.Tr>)}
            </Table.Tbody>
            {/* <Table.Thead>
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
            </Table.Thead> */}
            
          </Table>
        </Table.ScrollContainer>
        

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