import React from 'react'
import { Anchor, Box, Burger, Container, Grid, Group, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { MantineLogo } from '@mantinex/mantine-logo'
// @ts-ignore
import classes from './Header1.module.css'

const userLinks = [
  { link: '#', label: 'Privacy & Security' },
  { link: '#', label: 'Account settings' },
  { link: '#', label: 'Support options' },
]

export function Header1(props) {
  const [openedModal, { open, close }] = useDisclosure(false)
  const [opened, { toggle }] = useDisclosure(false, {onOpen: () => open()})
  

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

  const secondaryItems = userLinks.map((item) => (
    <Anchor
      href={item.link}
      key={item.label}
      onClick={(event) => event.preventDefault()}
      className={classes.secondaryLink}
    >
      {item.label}
    </Anchor>
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
            title={props.user.name ? props.user.name : props.user.email}
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


  return (
    <header className={classes.header}>
      <Container className={classes.inner}>
        <MantineLogo size={34} />
        {props.text[props.menu[props.activeScreen]][props.leng]}
        <Box className={classes.links} visibleFrom="sm">
          <Group justify="flex-end">{secondaryItems}</Group>
          <Group gap={0} justify="flex-end" className={classes.mainLinks}>
            {mainItems}
          </Group>
        </Box>
        
        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
          hiddenFrom="sm"
        />
      </Container>
      <BurgerMenuModal/>
    </header>
  )
}

