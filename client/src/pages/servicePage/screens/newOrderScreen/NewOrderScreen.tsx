import { Grid } from '@mantine/core'
import React from 'react'

export function NewOrderScreen(props) {

    console.log('NewOrderScreen')

    return (
      <>
        <div style={{margin: 15}}>
          <Grid grow align="stretch">
            {props.items.map((item, index) => 
            <Grid.Col key={item.message + index} span={12}>
              {item.screenItem(props, item.message)}
            </Grid.Col>)}
          </Grid>
        </div>
      </>
    )
}