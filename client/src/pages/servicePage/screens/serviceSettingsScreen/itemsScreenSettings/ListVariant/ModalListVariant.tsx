import React from 'react'
import { Modal } from '@mantine/core'

export function ModalListVariant(props) {

    return (
        <>
            <Modal centered opened={props.opened} size="30%" title={''} onClose={props.close}>
            
           {props.text.newServiceCreating[props.leng]}
            
            </Modal>
        </>
    )
  
      
}