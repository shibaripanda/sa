import { Button, Group, Space, Text, Textarea } from '@mantine/core'
import React from 'react'
import { sendToSocket } from '../../../../../modules/socket/pipSendSocket.ts'

export function ChangeWarrantyOrderPrint(props, message) {

    console.log('WarrantyOrderPrint')

    if(!props.props.printDocs){
      props.props.setPrinDocs(structuredClone(props.service.serviceDocuments))
    }

    if(props.props.printDocs){
      const dataPrint = props.props.printDocs.find(item => item.name === 'WarrantyOrderPrint').data
      const textFields = () => {

        const resize = (ln) => {
          if(ln > 100){
            return 'vertical'
          }
          return undefined
        }
        const textTest = (text) => {
          if(typeof text === 'string'){
            return text
          }
          return ''
        }
        
        return Object.entries(dataPrint).map(item => 
            <>
              <Textarea
                placeholder={item[0]}
                resize={resize(textTest(item[1]).length)} label={item[0]}
                value={textTest(item[1])}
                onChange={(event) => {
                  dataPrint[item[0]] = event.target.value
                  return props.props.setPrinDocs([...props.props.printDocs])
                }}
                />
              <Space h='lg'/>
            </>
          )
      }

    return (
      <div>
          <Text fw={700} style={{marginBottom: 10}}>{props.text[message][props.leng]}</Text>

          {textFields()}
          <Group>
            <Button style={{marginTop: 10}}
              disabled={JSON.stringify(props.props.printDocs.find(item => item.name === 'WarrantyOrderPrint')) === JSON.stringify(props.service.serviceDocuments.find(item => item.name === 'WarrantyOrderPrint'))}
              onClick={() => {
                sendToSocket('updateDocument', {
                  serviceId: props.user.serviceId, 
                  subServiceId: props.user.subServiceId, 
                  docName: 'NewOrderPrint',
                  newDoc: dataPrint
                })
                props.props.setPrinDocs(false)
              }}
              >{props.text.save[props.leng]}
            </Button>

            <Button style={{marginTop: 10}}
              disabled={JSON.stringify(props.props.printDocs.find(item => item.name === 'WarrantyOrderPrint')) === JSON.stringify(props.service.serviceDocuments.find(item => item.name === 'WarrantyOrderPrint'))}
              onClick={() => {
                props.props.setPrinDocs(structuredClone(props.service.serviceDocuments))
              }}
              >{props.text.cancel[props.leng]}
            </Button>
          </Group>
      </div>
    )
  }
}