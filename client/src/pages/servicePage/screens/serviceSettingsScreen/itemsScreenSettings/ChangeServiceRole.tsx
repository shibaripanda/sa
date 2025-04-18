import { Button, Center, Checkbox, Table, Text, TextInput, Tooltip } from '@mantine/core'
import React from 'react'
import { upFirstString } from '../../../../../modules/upFirstString.ts'
import { line } from '../../screensLine.ts'
import { IconSquareX } from '@tabler/icons-react'
import { editString } from '../../../../../modules/testStringSimbols.js'

export function ChangeServiceRole(props, message) {

  const linesAccess = () => {
    const line1 = line.map(item => item.items).flat()
    let res: string[] = []
    for(const i of line1){
      res.push(i.message)
      if(i['canUse']){
        res = res.concat(i.canUse)
      }
    }
    return res
  }

  const accessItems = (roles) => {
      if(!roles){
        accessItems(roles)
      }
      else{
        let res: any = {}
        for(const i of roles){
          res[i.role] = {}
          for(const a of linesAccess()){
            res[i.role][a] = i.access.includes(a)
          }
        }
        return res
      }
    }
  props.props.checkedAccess = accessItems(props.service.roles)

  

  

  const accessStatus = (itemAccess, role) => {
    return <Center>
            <Tooltip label={props.text[itemAccess] ? props.text[itemAccess][props.leng] : itemAccess}>
              <Checkbox
                checked={props.props.checkedAccess[role][itemAccess]}
                onChange={(event) => {
                  props.props.setCheckedAccess({...props.props.checkedAccess, [role]: {...props.props.checkedAccess[role], [itemAccess]: event.currentTarget.checked}})
                  props.user.changeServiceRole(role, itemAccess)
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
                              props.user.addNewServiceRole(item.role)
                            }}>
                              <IconSquareX color='red'/>{'\u00A0'}<Text>{item.role}</Text>
                            </Button>
                            </Center>
                </Table.Th>)}
              {/* <Table.Th>Доступ</Table.Th> */}
            </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {linesAccess().map(item => 
                <Table.Tr key={item}>
                    <Table.Td>
                      {props.text[item] ? props.text[item][props.leng] : item}
                    </Table.Td>
                    {props.service.roles.map((role, index) => <Table.Td  key={index}>{accessStatus(item, role.role)}</Table.Td>)}
                    {/* <Table.Td>
                      {props.text[item][props.leng]}
                    </Table.Td> */}
                </Table.Tr>)}
            </Table.Tbody>
            
          </Table>
        </Table.ScrollContainer>
        

        <TextInput placeholder={props.text.newRole[props.leng]}
        value={props.props.newRole}
        onChange={(event) => {
          props.props.setNewRole(upFirstString(editString(event.target.value)))
        }}/>
        <Button style={{marginTop: 10}}
        disabled={!props.props.newRole || props.service.roles.map(item => item.role).includes(props.props.newRole) || ['Owner', 'owner'].includes(props.props.newRole)}
        onClick={() => {
          props.user.addNewServiceRole(props.props.newRole.toString())
          props.props.setNewRole('')
        }}
        >{props.text.add[props.leng]}
        </Button>
    </div>
  )
}