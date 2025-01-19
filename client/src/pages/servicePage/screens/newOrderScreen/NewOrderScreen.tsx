import { Grid, Paper } from '@mantine/core'
import React from 'react'

export function NewOrderScreen(props) {

    console.log('NewOrderScreen')

    return (
      <>
        <div style={{margin: 15}}>
          <Grid grow align="stretch">
            {props.items.map((item, index) => 
            <Grid.Col key={item.message + index} span={item.size ? item.size : props.props.screenSize}>
              <Paper shadow="xl" radius="md" withBorder p="xl">
                {item.screenItem(props, item.message)}
              </Paper>
            </Grid.Col>)}
          </Grid>
        </div>
      </>
    )
}