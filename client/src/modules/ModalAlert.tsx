import { Anchor, Button, Group, Image, Modal } from '@mantine/core'
import React from 'react'

export function ModalAlert(props) {

  if(props.data.telegramCode){
    // @ts-ignore
    const link = process.env.REACT_APP_BOTLINK
    
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
          <Anchor href={link + '?start=' + props.data.telegramCode + 'getactivcode' + props.user._id} target="_blank">Connect</Anchor>
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
  else if(props.data){

    const image = () => {
      if(props.data.buffer){
          return (
          <Image 
          src={`data:image/jpeg;base64,${props.data.buffer}`}
          radius="sm"
          h='35vmax'
          w="auto"/>
        )
      }
    }

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
          {image()}
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