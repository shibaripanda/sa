import { Button, Modal } from '@mantine/core'
import React from 'react'

export function ModalWindowPrintStatus(props) {

  return (
      <>
          <Modal
          centered
          radius={'md'} 
          size="auto"
          opened={props.openedClosePrint} 
          onClose={props.openedClosePrintHandlers.close}
          withCloseButton={false}
          >
            <div style={{textAlign: 'center', marginTop: '1.7vmax'}}>
                    <Button color='red' 
                    onClick={props.openedClosePrintHandlers.close}  
                    style={{width: 375, marginRight: '1.7vmax', marginBottom: '1vmax'}}>
                      {props.text.cancel[props.leng]}
                    </Button>
                  </div>
          </Modal>
      </>
    )
}