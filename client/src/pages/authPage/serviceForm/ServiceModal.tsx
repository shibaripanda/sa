import React from 'react'
import { Modal } from '@mantine/core'

export function ServiceModal(props) {
    console.log('f')
    // @ts-ignore
    // console.log(JSON.parse(sessionStorage.getItem('currentUser')))
    // @ts-ignore
    // const user = JSON.parse(sessionStorage.getItem('currentUser'))
    // if(sessionStorage.getItem('currentUser'))
        return (
            <>
                <Modal centered opened={props.opened} size="50%" title={props.user.name ? props.user.name : props.user.email}
                    onClose={() => {
                        sessionStorage.removeItem('currentUser')
                        props.close()
                    }}>
                {props.user.email}
                </Modal>
            </>
        )
}