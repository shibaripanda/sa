import { Button, Group, Modal, Text } from '@mantine/core'
import React from 'react'

export function ModalWindowPrintStatus(props) {

  console.log(props.data._orderServiceId_)

  const totalCost = () => {
    if(props.data._work_ && props.data._work_.length){
      let total = props.data._work_.reduce((acc, item) => acc + item.cost, 0)
      for(const i of props.data._work_){
        total = total + i.parts.reduce((acc, item) => acc + item.cost, 0)
      }
      return total
    }
  }

  return (
      <>
          <Modal
          title={<Group justify='space-between'><Text fw={700}>{props.data._orderServiceId_} {totalCost()}</Text></Group>}
          centered
          radius={'md'} 
          size="auto"
          opened={props.openedClosePrint} 
          onClose={props.openedClosePrintHandlers.close}
          withCloseButton={false}
          >
            <div style={{textAlign: 'center', marginTop: '1.7vmax'}}>
                    <Button
                    onClick={props.openedClosePrintHandlers.close}  
                    style={{width: 375, marginRight: '1.7vmax', marginBottom: '1vmax'}}>
                      {props.text.cancel[props.leng]}
                    </Button>
                  </div>
          </Modal>
      </>
    )
}