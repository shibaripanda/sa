import { Grid, Group, Paper, TextInput } from '@mantine/core'
import { IconBackspace } from '@tabler/icons-react'
import React from 'react'
import { UserItem } from './itemsScreenSettings/UserItem.tsx'
import { LoaderShow } from '../../../../components/Loader/LoaderShow.tsx'

export function UserSettingsScreen(props) {


  const localService = () => {
    if(props.getDataMessage === 'getServiceLocalUsers'){
      return props.props.usersLocal
    }
    else if(props.getDataMessage === 'getServiceUsers'){
      return props.props.users
    }
  }

  if(localService() === false){
    if(props.getDataMessage === 'getServiceUsers'){
      props.user.getServiceUsers()
    }
    else if(props.getDataMessage === 'getServiceLocalUsers'){
      props.user.getServiceLocalUsers()
    }
  }

  
  
  const userList = () => {
    if(localService().length){
      return localService().filter(user => user.name ? user.email + ' ' + user.name : user.email.toLowerCase().includes(props.props.settingsFilter.toLowerCase())).map(user =>
        <Grid.Col key={user._id} span={12}>
          <Paper shadow="xl" radius="md" withBorder p="xl">
            {UserItem(props, user)}
          </Paper>
        </Grid.Col> 
      )
    }
    else if(!localService()){
      return (
        <Grid.Col span={12}>
            {LoaderShow()}
        </Grid.Col>
      )
    }
 }
  

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
                {item.screenItem(props, item.message)}
              </Paper>
            </Grid.Col>)}
            {userList()}
          </Grid>

        </div>
      </>
    )
  
}