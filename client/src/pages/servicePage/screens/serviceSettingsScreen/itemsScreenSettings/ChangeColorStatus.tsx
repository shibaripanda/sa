import { Button, ColorPicker, Group, HoverCard, Text } from '@mantine/core'
import React from 'react'

export function ChangeColorStatus(props, message) {

  console.log('ChangeColorStatus')


  return (
    <div>
      <Text fw={700} style={{marginBottom: 10}}>{props.text[message][props.leng]}</Text>
      <Group style={{marginBottom: 10}}>{props.service.statuses.map(item => 
        <HoverCard width={280} shadow="md">
          <HoverCard.Target>
            <Button>{item}</Button>
          </HoverCard.Target>
          <HoverCard.Dropdown>
          <Text>{item}</Text>
          <ColorPicker
            format="hex"
              swatches={['#2e2e2e', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14']}
          /> 
          </HoverCard.Dropdown>
        </HoverCard>
        )}
      </Group>
    </div>
  )
}





    