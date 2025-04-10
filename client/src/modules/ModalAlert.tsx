import { Anchor, Button, Group, Image, Modal, Space } from '@mantine/core'
import React from 'react'
// import { AuthClass } from '../classes/AuthClass'

export function ModalAlert(props) {


  

  if(props.data.telegramCode){
    // @ts-ignore
    const link = process.env.REACT_APP_BOTLINK
    // const authClass = new AuthClass()
    
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
            onClick={async () => {
              // await props.authClass.upDemo(props.setUsersThisSession, props.usersThisSession, props.user.email)
              props.handlerAlertModal.close()
            }}
            >
            Ok
            </Button>
          </Group>
        </Modal>
      </>
    )

  }
  else if(props.data){
    console.log(props.data)
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
        size="auto" 
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
          <Space h='lg'/>
          <Button variant='default'
          autoFocus
          onClick={async () => {
            if(props.data.title === 'Telegram connect'){
              console.log('fffffffffff')
              await props.authClass.upDemo(props.setUsersThisSession, props.usersThisSession, props.user.email)
            }
            props.handlerAlertModal.close()
          }}
          >
          Ok
          </Button>
        </Modal>
      </>
    )

  }
}