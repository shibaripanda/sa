import { Button, Checkbox, Group, Select, Table, Text, TextInput } from '@mantine/core'
import React from 'react'
import { sendToSocket } from '../../../../../modules/socket/pipSendSocket.ts'

export function ChangeServiceUser(props, message) {

  // console.log('ChangeServiceUser', props, message)
  console.log('ChangeServiceUser')

  if(props.props.users === false){
     sendToSocket('getServiceUsers', {
                serviceId: props.user.serviceId, 
                subServiceId: props.user.subServiceId
              })
  }
 
  console.log(props.props.users)

  const userTable = () => {
    const subSids = props.service.subServices.map(item => item.subServiceId)
    if(props.props.users && props.props.users.length){
      return (
        <Table.ScrollContainer minWidth={500}>
          
            <Table>

              <Table.Thead>
                <Table.Tr>
                <Table.Th>User</Table.Th>
                {props.service.roles.map(item => <Table.Th key={item.role}>{item.role}</Table.Th>)}
                </Table.Tr>
              </Table.Thead>
            {props.props.users.map(user => 
              <>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>
                      {user.name ? user.name + ' (' + user.email + ')' : user.email}
                    </Table.Th>
                  </Table.Tr>
                </Table.Thead>

                <Table.Tbody>
                {user.services_roles
                      .map(item => item.subServices.filter(item => subSids.includes(item.subServiceId))
                      .map(s => <Table.Tr><Table.Td>{props.service.subServices.find(item => item.subServiceId === s.subServiceId).name}</Table.Td>{props.service.roles.map(rol => <Table.Td>
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
                        </Table.Td>)}</Table.Tr>)
                      )}
                </Table.Tbody>
              </>
            )}
            </Table>
          
        </Table.ScrollContainer>
      )
    }
  }

  const usersList = () => {
    const subSids = props.service.subServices.map(item => item.subServiceId)
    console.log(subSids)
    if(props.props.users && props.props.users.length){
        return <Table.ScrollContainer minWidth={500}>
                <Table stickyHeader>
                  <Table.Thead>
                  <Table.Tr>
                    <Table.Th>User</Table.Th>
                    {props.service.roles.map(item => <Table.Th key={item.role}>
                      {item.role}
                      </Table.Th>)}
                  </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {props.props.users.map(item => 
                    <>
                    <Table.Tr key={item._id}>
                      <Table.Td>
                        {item.name ? item.name + ' ' + item.email : item.email}
                      </Table.Td>
                      </Table.Tr>
                      {item.services_roles
                      .map(item => item.subServices.filter(item => subSids.includes(item.subServiceId))
                      .map(s => <Table.Tr><Table.Td>{s.subServiceId}</Table.Td>{props.service.roles.map(rol => <Table.Td>
                        <Checkbox 
                        checked={s.roles.includes(rol.role)}
                        onChange={() => {
                          console.log(item)
                          sendToSocket('addRoleToUser', {
                            serviceId: props.user.serviceId, 
                            subServiceId: props.user.subServiceId, 
                            email: item.email,
                            role: rol.role
                          })
                        }}
                        />
                        </Table.Td>)}</Table.Tr>)
                      )}
                    </>
                  )}
                  </Table.Tbody>
                  <Table.Thead>
                  <Table.Tr>
                    <Table.Th></Table.Th>
                    {props.service.roles.map(item => <Table.Th key={item.role}>
                      {item.role}
                      </Table.Th>)}
                  </Table.Tr>
                  </Table.Thead>
                  
                </Table>
              </Table.ScrollContainer>
    }
  }

    return (
      <div>
          <Text fw={700} style={{marginBottom: 10}}>{props.text[message][props.leng]}</Text>

          {/* {usersList()} */}
          {userTable()}
        
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
          }}
          >{props.text.add[props.leng]}
          </Button>
      </div>
    )
}