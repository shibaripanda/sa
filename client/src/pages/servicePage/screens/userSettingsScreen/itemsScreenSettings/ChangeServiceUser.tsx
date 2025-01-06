import { Button, Center, Checkbox, Group, Select, Table, Text, TextInput } from '@mantine/core'
import React from 'react'
import { sendToSocket } from '../../../../../modules/socket/pipSendSocket.ts'
import { IconDoorExit, IconSquareX } from '@tabler/icons-react'

export function ChangeServiceUser(props, message) {

  console.log('ChangeServiceUser')

  console.log(props.props.users)
  
  const userTable = () => {
    const subSids = props.service.subServices.map(item => item.subServiceId)
    if(props.props.users && props.props.users.length){
      return (
        <Table.ScrollContainer minWidth={500}>
          
            <Table withTableBorder withColumnBorders highlightOnHover>

              <Table.Thead>
                <Table.Tr>
                <Table.Th>User / Role</Table.Th>
                {props.service.roles.map(item => <Table.Th key={item.role}><Center>{item.role}</Center></Table.Th>)}
                </Table.Tr>
              </Table.Thead>
            {props.props.users.map((user, index) => 
              <>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>
                    <Button variant='default' key={index}
                              onClick={() => {
                                // sendToSocket('addNewServiceRole', {
                                //   serviceId: props.user.serviceId, 
                                //   subServiceId: props.user.subServiceId, 
                                //   newRole: item.role
                                //   })
                              }}>
                                <IconSquareX color='red'/>{'\u00A0'}<Text>{user.name ? user.name + ' (' + user.email + ')' : user.email}</Text>
                              </Button>
                    </Table.Th>
                  </Table.Tr>
                </Table.Thead>

                <Table.Tbody>
                {user.services_roles
                      .map(item => item.subServices.filter(item => subSids.includes(item.subServiceId))
                      .map(s => 
                      <Table.Tr>
                        <Table.Td>
                        <Button variant='default' key={index} size={'xs'}
                              onClick={() => {
                                // sendToSocket('addNewServiceRole', {
                                //   serviceId: props.user.serviceId, 
                                //   subServiceId: props.user.subServiceId, 
                                //   newRole: item.role
                                //   })
                              }}>
                                <IconDoorExit size={19} color='black'/>{'\u00A0'}{props.service.subServices.find(item => item.subServiceId === s.subServiceId).name}
                              </Button>
                          </Table.Td>{props.service.roles.map(rol => <Table.Td>
                            <Center>
                              <Checkbox 
                              checked={s.roles.includes(rol.role)}
                              onChange={() => {
                                console.log(user.email)
                                console.log(rol.role)
                                sendToSocket('addRoleToUser', {
                                  serviceId: props.user.serviceId, 
                                  subServiceId: props.user.subServiceId, 
                                  email: user.email,
                                  role: rol.role
                                })
                              }}
                        />
                        </Center>
                        </Table.Td>)}
                      </Table.Tr>)
                      )}
                </Table.Tbody>
              </>
            )}
            </Table>
          
        </Table.ScrollContainer>
      )
    }
  }

    return (
      <div>
          <Text fw={700} style={{marginBottom: 10}}>{props.text[message][props.leng]}</Text>
          <Group grow>
            <TextInput placeholder={'email'}
          value={props.props.emailForNewUser}
          onChange={(event) => {
            props.props.setEmailForNewUser(event.target.value.toLowerCase())
          }}
          />
          <Select placeholder={'role'}
          value={props.props.role}
          onChange={props.props.setRole}
          data={props.service.roles.map(item => item.role)}
          /></Group>
          <Button style={{marginTop: 10}}
          disabled={!props.props.emailForNewUser || props.props.users.map(item => item.email.toLowerCase()).includes(props.props.emailForNewUser.toLowerCase()) || !props.props.role}
          onClick={() => {
            sendToSocket('addRoleToUser', {
              serviceId: props.user.serviceId, 
              subServiceId: props.user.subServiceId, 
              email: props.props.emailForNewUser.toLowerCase(),
              role: props.props.role
            })
            props.props.setEmailForNewUser('')
            props.props.setSettingsFilter(props.props.emailForNewUser.toLowerCase())
          }}
          >{props.text.add[props.leng]}
          </Button>
      </div>
    )
}