import { Autocomplete, Button, Center, Grid, NumberInput, Space, Text } from '@mantine/core'
import React from 'react'

export function ChangeWorksService(props, message) {

  return (
    <div>
        <Text fw={700} style={{marginBottom: 10}}>{props.text[message][props.leng]}</Text>
        <Grid justify="flex-start" align="center" grow>

          <Grid.Col span={8}>
            <Autocomplete
              value={props.props.usluga.value}
              placeholder="Pick value or enter anything"
              data={props.service.uslugi.map(item => item.value)}
              onChange={(event) => {
                props.props.setUsluga({...props.props.usluga, value: event})
              }}
            />
          </Grid.Col>

          <Grid.Col span={2}>
            <NumberInput placeholder={props.text.newNameForService[props.leng]}
            value={props.props.usluga.price}
            onChange={(event) => {
              props.props.setUsluga({...props.props.usluga, price: event})
            }}/>
          </Grid.Col>
        
          <Grid.Col span={2}>
            <Button
              fullWidth
              disabled={!props.props.usluga.value || !props.props.usluga.price}
              onClick={() => {
                props.user.changeWorksService(props.props.usluga)
                props.props.setUsluga({value: '', price: ''})
              }}
              >{props.text.add[props.leng]}
            </Button>
          </Grid.Col>

        </Grid>

        <Space h='lg'/>

        <Grid grow>
        {props.service.uslugi.filter(item => item.value.includes(props.props.usluga.value)).map(item =>
        <>
          <Grid.Col span={8}>
            {item.value}
          </Grid.Col>
          <Grid.Col span={2}>
            <Center>{item.price}</Center>
          </Grid.Col>
          <Grid.Col span={2}>
            <Button
              color={'red'}
              fullWidth
              onClick={() => {
                props.user.deleteUsluga({value: item.value, price: item.price})
              }}
              >{props.text.delete[props.leng]}
            </Button>
          </Grid.Col>
        </>
        )}
        </Grid>
    </div>
  )
}