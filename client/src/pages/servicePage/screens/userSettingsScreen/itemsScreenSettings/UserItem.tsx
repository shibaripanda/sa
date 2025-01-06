import { Button, Center, Checkbox, Group, Select, Table, Text, TextInput } from '@mantine/core'
import React from 'react'
import { sendToSocket } from '../../../../../modules/socket/pipSendSocket.ts'
import { IconDoorExit, IconSquareX } from '@tabler/icons-react'

export function UserItem(props, user) {

  console.log('UserItem')
  console.log(user)
  const userTable = () => {

      return (
        <Table.ScrollContainer minWidth={500}>
          <Table withTableBorder withColumnBorders highlightOnHover>

            <Table.Thead>
              <Table.Tr>
                <Table.Th>
                  <Center>
                    <Text fw={700}>
                      {user.name ? user.name + ' (' + user.email + ')' : user.email}
                    </Text>
                  </Center>
                </Table.Th>
                  {props.service.subServices.map(service => <Table.Th key={service.subServiceId}><Center>{service.name}</Center></Table.Th>)}
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              <Table.Tr>
                <Table.Td>
                  <Text fw={700}>Roles</Text>
                </Table.Td>
              </Table.Tr>
              {props.service.roles.map(serviceRole => 
                <Table.Tr key={serviceRole.role}>
                <Table.Td>
                  {serviceRole.role}
                </Table.Td>
                {props.service.subServices.map(service => 
                <Table.Td key={service.subServiceId}>
                  <Center>
                    <Checkbox 
                    checked={
                      user.services_roles
                      .find(item => item.serviceId === props.user.serviceId).subServices
                      .find(item => item.subServiceId === service.subServiceId) ? 
                      user.services_roles
                      .find(item => item.serviceId === props.user.serviceId).subServices
                      .find(item => item.subServiceId === service.subServiceId).roles.includes(serviceRole.role) :
                      false
                    }
                    onChange={() => {
                      console.log(user.email)
                      console.log(serviceRole.role)
                      sendToSocket('addRoleToUser', {
                        serviceId: props.user.serviceId, 
                        subServiceId: service.subServiceId, 
                        email: user.email,
                        role: serviceRole.role
                      })
                    }}
                        />
                  </Center>
                </Table.Td>)}
              </Table.Tr>
              )}

              <Table.Tr>
                <Table.Td>
                <Text fw={700}>Devices</Text>
                </Table.Td>
              </Table.Tr>
              {props.service.devices.map(dev => 
                <Table.Tr key={dev}>
                <Table.Td>
                  {dev}
                </Table.Td>
                {props.service.subServices.map(service => 
                <Table.Td key={service.subServiceId}>
                  <Center>
                    <Checkbox
                    disabled={user.services_roles
                      .find(item => item.serviceId === props.user.serviceId).subServices
                      .find(item => item.subServiceId === service.subServiceId) ? 
                      !user.services_roles
                      .find(item => item.serviceId === props.user.serviceId).subServices
                      .find(item => item.subServiceId === service.subServiceId).roles.length :
                      true
                    }  
                    checked={
                      user.services_roles
                      .find(item => item.serviceId === props.user.serviceId).subServices
                      .find(item => item.subServiceId === service.subServiceId) ? 
                      !user.services_roles
                      .find(item => item.serviceId === props.user.serviceId).subServices
                      .find(item => item.subServiceId === service.subServiceId).devices.includes(dev) :
                      true
                    }
                    // onChange={() => {
                    //   console.log(user.email)
                    //   console.log(serviceRole.role)
                    //   sendToSocket('addRoleToUser', {
                    //     serviceId: props.user.serviceId, 
                    //     subServiceId: service.subServiceId, 
                    //     email: user.email,
                    //     role: serviceRole.role
                    //   })
                    // }}
                        />
                  </Center>
                </Table.Td>)}
              </Table.Tr>
              )}

              <Table.Tr>
                <Table.Td>
                  <Text fw={700}>Statuses</Text>
                </Table.Td>
              </Table.Tr>
              {props.service.statuses.map(status => 
                <Table.Tr key={status}>
                <Table.Td>
                  {status}
                </Table.Td>
                {props.service.subServices.map(service => 
                <Table.Td key={service.subServiceId}>
                  <Center>
                    <Checkbox
                    disabled={user.services_roles
                      .find(item => item.serviceId === props.user.serviceId).subServices
                      .find(item => item.subServiceId === service.subServiceId) ? 
                      !user.services_roles
                      .find(item => item.serviceId === props.user.serviceId).subServices
                      .find(item => item.subServiceId === service.subServiceId).roles.length :
                      true
                    } 
                    checked={
                      user.services_roles
                      .find(item => item.serviceId === props.user.serviceId).subServices
                      .find(item => item.subServiceId === service.subServiceId) ? 
                      !user.services_roles
                      .find(item => item.serviceId === props.user.serviceId).subServices
                      .find(item => item.subServiceId === service.subServiceId).statuses.includes(status) :
                      true
                    }
                    // onChange={() => {
                    //   console.log(user.email)
                    //   console.log(serviceRole.role)
                    //   sendToSocket('addRoleToUser', {
                    //     serviceId: props.user.serviceId, 
                    //     subServiceId: service.subServiceId, 
                    //     email: user.email,
                    //     role: serviceRole.role
                    //   })
                    // }}
                        />
                  </Center>
                </Table.Td>)}
              </Table.Tr>
              )}
            </Table.Tbody>

          </Table>
        </Table.ScrollContainer>
      )
  }

    return (
      <div>

          {userTable()}
          <Button variant='default'
                      onClick={() => {
                        sendToSocket('deleteUserFromService', {
                          serviceId: props.user.serviceId, 
                          subServiceId: props.user.subServiceId, 
                          email: user.email
                          })
                      }}>
                        <IconSquareX color='red'/>{'\u00A0'}<Text fw={700}>{user.name ? user.name + ' (' + user.email + ')' : user.email}</Text>
                      </Button>
          
      </div>
    )
}