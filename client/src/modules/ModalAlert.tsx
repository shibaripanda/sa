import { Button, Group, Modal } from '@mantine/core'
import React from 'react'

export function ModalAlert(props) {

  if(props.data){

    return (
      <>
        <Modal 
        centered
        opened={props.alertModal} 
        onClose={props.handlerAlertModal.close} 
        title={props.data.title}
        withCloseButton={false}
        >
          <Group justify="center">
          {props.data.message}
          </Group>
          <Group justify="flex-end">
            <Button variant='default'
            onClick={() => {
              props.handlerAlertModal.close()
            }}
            >
            ok
            </Button>
          </Group>
        </Modal>
      </>
    )

  }
}