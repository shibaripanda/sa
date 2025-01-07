import { Button, Center, Checkbox, Table, Text, Tooltip } from '@mantine/core'
import React from 'react'
import { sendToSocket } from '../../../../../modules/socket/pipSendSocket.ts'
import { IconSquareX } from '@tabler/icons-react'

export function UserItem(props, user) {

  console.log('UserItem')
  
  const userTable = () => {

    const subServStatus = (service) => {
      const a = user.services_roles
      .find(item => item.serviceId === props.user.serviceId).subServices
      .find(item => item.subServiceId === service.subServiceId)
      if(a && a.roles && a.roles.length){
          return ''
      }
      return 'dimmed'
    }

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
                  {props.service.subServices.map(service => 
                  <Table.Th key={service.subServiceId}>
                    <Center>
                      <Text c={subServStatus(service)}>
                        {service.name}
                      </Text>
                    </Center>
                  </Table.Th>
                  )}
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              <Table.Tr>
                <Table.Td>
                  <Text fw={700}>{props.text.changeServiceRole[props.leng]}</Text>
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
                  <Tooltip label={serviceRole.role}>
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
                      sendToSocket('addRoleToUser', {
                        serviceId: props.user.serviceId, 
                        subServiceId: service.subServiceId, 
                        email: user.email,
                        role: serviceRole.role
                      })
                    }}
                        />
                    </Tooltip>
                  </Center>
                </Table.Td>)}
              </Table.Tr>
              )}

              <Table.Tr>
                <Table.Td>
                <Tooltip label={props.text.deletStatus[props.leng]}> 
                  <Text fw={700}>
                    {props.text.changeServiceStatusList[props.leng]}
                  </Text>
                </Tooltip>
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
                    <Tooltip label={status}> 
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
                      onChange={() => {
                        sendToSocket('addStatusToUser', {
                          serviceId: props.user.serviceId, 
                          subServiceId: service.subServiceId, 
                          email: user.email,
                          status: status
                        })
                      }}
                          />
                    </Tooltip>
                  </Center>
                </Table.Td>)}
              </Table.Tr>
              )}

              <Table.Tr>
                <Table.Td>
                <Tooltip label={props.text.deletDevice[props.leng]}> 
                  <Text fw={700}>
                    {props.text.devices[props.leng]}
                  </Text>
                </Tooltip>
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
                  <Tooltip label={dev}> 
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
                    onChange={() => {
                      sendToSocket('addDeviceToUser', {
                        serviceId: props.user.serviceId, 
                        subServiceId: service.subServiceId, 
                        email: user.email,
                        device: dev
                      })
                    }}
                        />
                    </Tooltip>
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
          <Tooltip label={props.text.deletUser[props.leng]}>
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
          </Tooltip>
          
      </div>
    )
}