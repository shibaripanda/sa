import React from 'react'
import { Anchor, Burger, Grid, Group, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
// @ts-ignore
import classes from './Header1.module.css'

export function Header1(props) {
  const [openedModal, { open, close }] = useDisclosure(false)
  const [opened, { toggle }] = useDisclosure(false, {onOpen: () => open()})
  
  const topMenuArray = 
    [
      {
        name: props.text.exit[props.leng],
        color: 'red', class: classes.mainLinkExit,
        action: () => {
          sessionStorage.removeItem('activescreen')
          props.navigate('/')
        }
      },
      {name: `${props.service.name} (${props.service.subName})`, action: () => {}, class: classes.mainLink},
      {name: props.user.name ? props.user.name : props.user.email, action: () => {}, class: classes.mainLink}
    ]
  const topMenuMobileArray = 
    [
      {name: `${props.service.name} (${props.service.subName})`, action: () => {}, class: classes.mainLink}
    ]
  const mobileMenuArray = 
    [
      {
        name: props.text.exit[props.leng],
        color: 'red', class: classes.mainLinkExit,
        action: () => {
          sessionStorage.removeItem('activescreen')
          props.navigate('/')
        }
      },
      {name: props.user.name ? props.user.name : props.user.email, action: () => {}, class: classes.mainLink}
    ]

  const mobileMenu = mobileMenuArray.map((item, index) => (
    <div
      key={index}
      className={item.class}
      onClick={
        item.action
      }
    >
      {item.name}
    </div>
  ))
  const topMenu = topMenuArray.map((item, index) => (
    <div
      key={index}
      className={item.class}
      onClick={
        item.action
      }
    >
      {item.name}
    </div>
  ))
  const topMenuMobile = topMenuMobileArray.map((item, index) => (
    <div
      key={index}
      className={item.class}
      onClick={
        item.action
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
      data-active={item === props.activeScreen || undefined}
      onClick={(event) => {
        event.preventDefault()
        // console.log(item, index)
        props.setActiveScreen(item)
        sessionStorage.setItem('activescreen', item)
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

        <Group visibleFrom="sm" gap={0} justify="space-around">
          {[
            <Group key={1}>
              {topMenu}
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
              {props.text[props.activeScreen][props.leng]}
            </Anchor>,
            // <TextInput size='sx'key={39}/>
          ]}
        </Group>
        
        <BurgerMenuModal/>
      </header>
  )
}

