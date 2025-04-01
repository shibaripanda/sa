import { Grid, Group, Paper, TextInput } from '@mantine/core'
import { IconBackspace } from '@tabler/icons-react'
import React from 'react'

export function MySettingsScreen(props) {

  return (
      <>
        <div style={{margin: 15}}>
          <Group gap={0} justify="center">
            <TextInput inputSize={'45'} rightSection={<IconBackspace onClick={() => props.props.setSettingsFilter('')} stroke={2}/>}
            value={props.props.settingsFilter}
            placeholder='filter'
            onChange={(event) => {
              props.props.setSettingsFilter(event.target.value)
            }}/>
          </Group>
        </div>
        <div style={{margin: 15}}>
          <Grid grow align="stretch">
            {props.items.map((item, index) => 
            <Grid.Col key={item.message + index} span={item.size ? item.size : props.props.screenSize}>
              <Paper shadow="xl" radius="md" withBorder p="xl">
                {item.screenItem(props, item)}
                {/* {item.screenItem(props, item.message)} */}
              </Paper>
            </Grid.Col>)}
          </Grid>
        </div>
      </>
    )
  
}