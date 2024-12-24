import React from 'react'
import { Modal } from '@mantine/core'


export function ServiceModalWaiting(props: any) {

    return (
        <>
            <Modal centered opened={props.opened} size="30%" title={''} onClose={props.close}>
            
           {props.text.newServiceCreating[props.leng]}
            
            </Modal>
        </>
    )
  
      
}