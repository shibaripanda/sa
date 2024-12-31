import { Button, Checkbox, Table, Text, TextInput } from '@mantine/core'
import React from 'react'
import { sendToSocket } from '../../../../../modules/socket/pipSendSocket.ts'
import { upFirstString } from '../../../../../modules/upFirstString.ts'
import { line } from '../../screensLine.ts'

export function ChangeServiceRole(props, message) {

  console.log('ChangeServiceRole', props, message)

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
    return <Checkbox
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
  }

  return (
    <div>
        <Text fw={700} style={{marginBottom: 10}}>{props.text[message][props.leng]}</Text>
          <Table>
            <Table.Thead>
            <Table.Tr>
              <Table.Th>Доступ</Table.Th>
              {props.service.roles.map(item => <Table.Th key={item.role}>{item.role}</Table.Th>)}
            </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {linesAccess().map(item => <Table.Tr key={item}>
                                            <Table.Td>
                                              {props.text[item][props.leng]}
                                            </Table.Td>
                                            {props.service.roles.map((role, index) => <Table.Td key={index}>{accessStatus(item, role.role)}</Table.Td>)}
                                        </Table.Tr>)}
            </Table.Tbody>
          </Table>

        {/* <TextInput placeholder={props.text.statusName[props.leng]}
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
        </Button> */}
    </div>
  )
}