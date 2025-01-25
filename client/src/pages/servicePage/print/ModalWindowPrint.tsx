import { Modal } from '@mantine/core'
import React from 'react'
import { PrintServer } from './PrintServer'

export function ModalWindowPrint(props) {

  return (
      <>
          <Modal
          radius={'md'} 
          size="auto"
          opened={props.openedPrint} 
          onClose={props.openedPrintHandlers.close}
          withCloseButton={false}
          >
            <PrintServer {...props}/>
          </Modal>
      </>
    )
}