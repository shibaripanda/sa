import React from 'react'
import { Anchor, Box, Burger, Button, Container, Grid, Group, Modal, Text, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
// @ts-ignore
import classes from './Header1.module.css'
import { IconBackspace } from '@tabler/icons-react'

export function Header1(props) {
  const [openedModal, { open, close }] = useDisclosure(false)
  const [opened, { toggle }] = useDisclosure(false, {onOpen: () => open()})
  
  const topMenuArray = 
    [
      {name: 'EXIT', action: () => props.navigate('/'), color: 'red', class: classes.mainLinkExit},
      {name: `${props.service.name} (${props.service.subName})`, action: () => {}, class: classes.mainLink},
      {name: props.user.name ? props.user.name : props.user.email, action: () => {}, class: classes.mainLink},
    ]
  const topMenuMobileArray = 
    [
      {name: `${props.service.name} (${props.service.subName})`, action: () => {}, class: classes.mainLink}
    ]
  const mobileMenuArray = 
    [
      {name: 'EXIT', action: () => props.navigate('/'), color: 'red', class: classes.mainLinkExit},
      {name: props.user.name ? props.user.name : props.user.email, action: () => {}, class: classes.mainLink}
    ]

  const mobileMenu = mobileMenuArray.map((item, index) => (
    <div
      key={index}
      className={item.class}
      onClick={//(event) => {
        item.action
        // event.preventDefault()
        // if(opened){
        //     toggle()
        //     close()
        // }
      //}}
      }
    >
      {item.name}
    </div>
  ))
  const topMenu = topMenuArray.map((item, index) => (
    <div
      key={index}
      className={item.class}
      onClick={//(event) => {
        item.action
        // event.preventDefault()
        // if(opened){
        //     toggle()
        //     close()
        // }
      //}}
      }
    >
      {item.name}
    </div>
  ))
  const topMenuMobile = topMenuMobileArray.map((item, index) => (
    <div
      key={index}
      className={item.class}
      onClick={//(event) => {
        item.action
        // event.preventDefault()
        // if(opened){
        //     toggle()
        //     close()
        // }
      //}}
      }
    >
      {item.name}
    </div>
  ))

  function BurgerMenuModal() {
      return (
      <>
          <Modal
          opened={openedModal}
          onClose={() => {
              close()
              toggle()
          }}
          title={mobileMenu}
          fullScreen
          radius={0}
          transitionProps={{ transition: 'fade', duration: 200 }}
          >
              <Grid>
                  {mainItems.map((item, index) => <Grid.Col key={index} span={12}>{item}</Grid.Col>)}
              </Grid>
          </Modal>
      </>
      )
  }

  const mainItems = props.menu.map((item, index) => (
    <Anchor<'a'>
      href={'#'}
      key={index}
      className={classes.mainLink}
      data-active={index === props.activeScreen || undefined}
      onClick={(event) => {
        event.preventDefault()
        props.setActiveScreen(index)
        if(opened){
            toggle()
            close()
        }
      }}
    >
      {props.text[item][props.leng]}
    </Anchor>
  ))

  return (
      <header className={classes.header}>
        {/* <Group visibleFrom="sm" gap={0} justify="start">
          {[...topMenu, <TextInput size='sx'key={39}/>]}
        </Group> */}

        <Group visibleFrom="sm" gap={0} justify="space-around">
          {[
            <Group key={1}>
              {topMenu}
            </Group>, 
            <Group key={2}>
              <TextInput rightSectionPointerEvents="none"
                inputSize={'30'}
                placeholder=' find'
                rightSection={<IconBackspace stroke={1.5}/>} 
                radius="sm" 
                // size='sx' 
                key={49}/>
            </Group>
            ]}
        </Group>

        <Group visibleFrom="sm" gap={0} justify="center">
          {mainItems}
        </Group>

        <Group hiddenFrom="sm" gap={0} justify="space-around">
          {[...topMenuMobile, <Burger
          key={19}
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
          hiddenFrom="sm"
          />]}
        </Group>
        <Group hiddenFrom="sm" gap={0} justify="space-around">
          {[
            <Anchor<'a'>
            key={29}
            href={'#'}
            className={classes.mainLink}
            data-active={true}
            >
              {props.text[props.menu[props.activeScreen]][props.leng]}
            </Anchor>,
            <TextInput size='sx'key={39}/>
          ]}
        </Group>
        
        <BurgerMenuModal/>
      </header>
  )
}

