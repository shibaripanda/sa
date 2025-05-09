import { Button, Center, Checkbox, Table, Text, Tooltip } from '@mantine/core'
import React from 'react'
import { IconSquareX } from '@tabler/icons-react'

export function UserItem(props, user) {


  const userTable = () => {

    const subServStatus = (service) => {
      const a = user.services_roles
      .find(item => item.serviceId === props.user.serviceId).subServices
      .find(item => item.subServiceId === service.subServiceId)
      if(a && a.roles && a.roles.length){
          return <Text c={'green'} fw={700}>{service.name}</Text>
      }
      return <Text c={'dimmed'}>{service.name}</Text>
    }

    const localService = () => {
      if(props.getDataMessage === 'getServiceLocalUsers'){
        return props.service.subServices.filter(item => item.subServiceId === props.user.subServiceId)
      }
      else if(props.getDataMessage === 'getServiceUsers'){
        return props.service.subServices
      }
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
                {localService().map(service => 
                <Table.Th key={service.subServiceId}>
                  <Center>
                    {subServStatus(service)}
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
              {localService().map(service => 
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
                    props.user.addRoleToUser(user.email, serviceRole.role)
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
              {localService().map(service => 
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
                      props.user.addStatusToUser(user.email, status)
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
              {localService().map(service => 
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
                    props.user.addDeviceToUser(user.email, dev)
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
                if(props.getDataMessage === 'getServiceLocalUsers'){
                  props.user.deleteUserFromLocalService(user.email)
                }
                else{
                  props.user.deleteUserFromService(user.email)
                }
              }}>
              <IconSquareX color='red'/>{'\u00A0'}<Text fw={700}>{user.name ? user.name + ' (' + user.email + ')' : user.email}</Text>
            </Button>
          </Tooltip>
          
      </div>
    )
}