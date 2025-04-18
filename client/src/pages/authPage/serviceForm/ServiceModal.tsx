import React, { useEffect, useState } from 'react'
import { Button, Grid, Modal, Space } from '@mantine/core'
import { useConnectSocket } from '../../../modules/socket/hooks/useConnectSocket.ts'
import { sendToSocket } from '../../../modules/socket/pipSendSocket.ts'
import { getFromSocket } from '../../../modules/socket/pipGetSocket.ts'
import { useDisclosure } from '@mantine/hooks'
import { ServiceModalWaiting } from './ServiceModalWaiting.tsx'
import { useNavigate } from 'react-router-dom'
import { TextClass } from '../../../classes/TextClass.ts'

interface Role {
    serviceId: string
    subServices: {subServiceId: string}[]
}

interface Service {
    _id: string
    name: string[]
    subServices: {subServiceId: string, name: string, roles: string[]}[]
}

export function ServiceModal(props: any) {

    useConnectSocket(props.user.token)

    const navigate = useNavigate()
    const [roles, setRoles] = useState<Role[]>(props.user.roles)
    const [services, setServices] = useState<Service[]>([])
    const [opened, { close, open }] = useDisclosure(false)

    useEffect(() => {
        const upUserRole = (data: any) => {
                props.authClass.updateServiceAppUsers(data, 'roles')
                setRoles(data)
              }
        getFromSocket([
            {message: 'getUserRolesByUserId', handler: upUserRole}
        ])
        sendToSocket('getUserRolesByUserId', {})
    }, [])

    useEffect(() => {
        const addService = (data: any) => {
            if(data){
                const index = services.findIndex(item => item._id === data._id)
                if(index < 0){
                    services.splice(services.length + 1, 0, data)
                    setServices([...services])
                    close()
                }
            }
        }
        for(const serviceId of roles.map(item => item.serviceId)){
            getFromSocket([{message: `getServiceById${serviceId}`, handler: addService}])
            sendToSocket('getServiceById', {serviceId: serviceId})
        }
    }, [roles])

    const createNewService = () => {
        open()
        sendToSocket('createNewService', {name: 'New Service'})
        setTimeout(() => sendToSocket('getUserRolesByUserId', {}), 2500)
    }

  
    return (
        <>
            <Modal opened={props.opened} title={props.user.name ? props.user.name : props.user.email}
                onClose={() => {
                    sessionStorage.removeItem('currentUser')
                    props.close()
                }}>
            
            <Grid>
                {services.map(item1 => 
                <Grid.Col key={item1._id} span={12}>
                    <>
                        {item1.name}
                        <Space h='sm'/>
                        <Grid>
                            {item1.subServices
                            .filter(subServ => roles.map(role => role.subServices).flat().map(subs => subs.subServiceId).includes(subServ.subServiceId))
                            .map(item =>
                            <Grid.Col key={item.subServiceId} span={12}> 
                            <Button
                            variant='default'
                            onClick={async () => {
                                sessionStorage.setItem('leng', props.leng)
                                sessionStorage.setItem('text', JSON.stringify(props.text))
                                sessionStorage.setItem('serviceId', item1._id)
                                sessionStorage.setItem('subServiceId', item.subServiceId)
                                // @ts-ignore
                                setTimeout(() => navigate('/service'), 1000)
                            }} 
                            fullWidth
                            >
                            {item.name}
                            </Button>
                        </Grid.Col>
                            )}  
                        </Grid>
                        <Space h='sm'/>
                        <hr></hr>          
                    </>
                </Grid.Col>)}

                <Grid.Col span={12}>

                </Grid.Col>

                <Grid.Col span={12}>
                    <Button size='xs' variant='default'
                    onClick={() => {
                        createNewService()
                    }}>
                    {props.text.createService[props.leng]}
                    </Button>
                </Grid.Col>
            </Grid>
            <ServiceModalWaiting text={props.text} leng={props.leng} opened={opened} close={close}/>
            </Modal>
            
        </>
    )
}