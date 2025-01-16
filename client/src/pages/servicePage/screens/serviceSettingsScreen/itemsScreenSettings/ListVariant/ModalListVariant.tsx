import React from 'react'
import { Button, Grid, Modal, TextInput } from '@mantine/core'
import { sendToSocket } from '../../../../../../modules/socket/pipSendSocket.ts'

export function ModalListVariant(props) {

    if(props.props.listVariantName){

        const variant = props.service.orderData.find(item => item.item === props.props.listVariantName)

        return (
            <>
                <Modal opened={props.props.opened} size="85%" title={props.props.listVariantName} onClose={props.props.close}>
                
                    <TextInput placeholder={props.text.statusName[props.leng]}
                    value={props.props.newVariant}
                    onChange={(event) => {
                        props.props.setNewVariant(event.target.value)
                    }}/>
                    <Button style={{marginTop: 10}}
                    disabled={!props.props.newVariant || variant.variants.includes(props.props.newVariant)}
                    onClick={() => {
                        sendToSocket('addOrDelListVariant', {
                        serviceId: props.user.serviceId, 
                        subServiceId: props.user.subServiceId, 
                        item: variant.item,
                        variant: props.props.newVariant.toString()
                        })
                        props.props.setNewVariant('')
                        
                    }}
                    >{props.text.add[props.leng]}
                    </Button>
                    <hr></hr>
                    <Grid>
                        {variant.variants.reverse().map(item =>
                        <>
                        <Grid.Col span={8}>
                            {item}
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <Button
                            color='red'
                            onClick={() => {
                                sendToSocket('addOrDelListVariant', {
                                serviceId: props.user.serviceId, 
                                subServiceId: props.user.subServiceId, 
                                item: variant.item,
                                variant: item
                                })
                            }}
                            >{props.text.delete[props.leng]}
                            </Button>
                        </Grid.Col>
                        </> )}
                    </Grid>

                </Modal>
            </>
        )
  
    }
}