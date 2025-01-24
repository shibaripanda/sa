import { Modal } from '@mantine/core'
import React from 'react'
import { PrintServer } from './PrintServer'

export function ModalWindowPrint(props) {
    
  return (
      <>
          <Modal
          // style={{alignContent: 'center'}}
          radius={'md'} 
          size="auto"
          opened={props.openedPrintNewOrder} 
          onClose={props.openedPrintNewOrderHandlers.close}
          withCloseButton={false}
          centered
          >
            <PrintServer close={props.openedPrintNewOrderHandlers.close} data={props.dataForPrint}/>
          </Modal>
      </>
    )
}