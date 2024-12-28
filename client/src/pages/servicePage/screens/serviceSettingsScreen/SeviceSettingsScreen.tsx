import { Grid, Group, Paper, TextInput } from '@mantine/core'
import { IconBackspace } from '@tabler/icons-react'
import React, { useMemo, useState } from 'react'

export function SeviceSettingsScreen(props) {

  // const [filter, setFilter] = useState('')

    console.log('SeviceSettingsScreen')

    console.log(props)


  // const filterItems = useMemo(() => {
  //   return props.items.filter(item => item)
  // }, [])
  


  return (
    <>
      <div style={{margin: 15}}>
        <Group gap={0} justify="center">
          <TextInput inputSize={'45'} rightSection={<IconBackspace  stroke={2}/>}/>
        </Group>
      </div>
      <div style={{margin: 15}}>
        <Grid>
          {props.items.map((item, index) => 
          <Grid.Col key={item.message + index} span={4}>
            <Paper shadow="xl" radius="md" withBorder p="xl">
              {item.screenItem(props)}
            </Paper>
          </Grid.Col>)}
        </Grid>
      </div>
    </>
  )
}