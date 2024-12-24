import React, { useEffect, useState } from 'react'
import { Button, Grid, Modal } from '@mantine/core'
import { useConnectSocket } from '../../../modules/socket/hooks/useConnectSocket.ts'
import { sendToSocket } from '../../../modules/socket/pipSendSocket.ts'
import { getFromSocket } from '../../../modules/socket/pipGetSocket.ts'

interface Role {
    serviceId: string
    access: string[]
}

export function ServiceModal(props: any) {

    const [roles, setRoles] = useState<Role[]>(props.user.roles)
    const [services, setServices] = useState<Object[]>([])

    useConnectSocket(props.user.token)

    useEffect(() => {
        getFromSocket([
            {message: 'getUserRolesByUserId', handler: setRoles}
        ])
        sendToSocket('getUserRolesByUserId', {})
    }, [])

    useEffect(() => {
        setServices([])
        const addService = (data) => {
            services.push(data)
            setServices([...new Set(services)])
        }

        for(const serviceId of roles.map(item => item.serviceId)){
            getFromSocket([{message: `getServiceById${serviceId}`, handler: addService}])
            sendToSocket('getServiceById', {serviceId: serviceId})
        }
    }, [roles])

    console.log(services)
     
    const createNewService = () => {
        sendToSocket('createNewService', {name: 'New Service'})
        setTimeout(() => sendToSocket('getUserRolesByUserId', {}), 1500)
    }


    return (
        <>
            <Modal centered opened={props.opened} size="50%" title={props.user.name ? props.user.name : props.user.email}
                onClose={() => {
                    sessionStorage.removeItem('currentUser')
                    props.close()
                }}>
            
            <Grid>
                <Grid.Col span={4}>
                    {services.map(item => <Grid.Col key={item._id} span={12}><Button fullWidth>{item.name}</Button></Grid.Col>)}
                </Grid.Col>
                <Grid.Col span={4}>

                </Grid.Col>
                <Grid.Col span={12}>
                    <Button size='xs'
                    onClick={() => {
                        createNewService()
                    }}>
                        Создать сервис
                    </Button>
                </Grid.Col>
            </Grid>
            
            </Modal>
        </>
    )
}