import React from 'react'
import { Anchor, Box, Burger, Button, Container, Grid, Group, Modal, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
// @ts-ignore
import classes from './Header1.module.css'

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
    // <header className={classes.header}>
    //   <Container className={classes.inner}>
        
    //     <Grid gutter="xs">
    //       <Grid.Col span={12}>
    //         <Text size='xs'>
    //           {`${props.service.name} (${props.service.subName})`}
    //         </Text>
    //       </Grid.Col>
    //       <Grid.Col span={12}>
    //         <Text size='xs'>
    //           {props.user.name ? props.user.name : props.user.email}
    //         </Text>
    //       </Grid.Col>
    //     </Grid>

        
    //     {props.text[props.menu[props.activeScreen]][props.leng]}
    //     <Box className={classes.links} visibleFrom="sm">
    //       <Group gap={0} justify="flex-end" className={classes.mainLinks}>
    //         {mainItems}
    //       </Group>
    //     </Box>
        
    //     <Burger
    //       opened={opened}
    //       onClick={toggle}
    //       className={classes.burger}
    //       size="sm"
    //       hiddenFrom="sm"
    //     />
    //   </Container>
      
    //   <BurgerMenuModal/>
    // </header>
        <header className={classes.header}>
        {/* <Container> */}
        <Grid  className={classes.inner}>
          <Grid.Col span={6} hiddenFrom="sm">
            {props.text[props.menu[props.activeScreen]][props.leng]}
          </Grid.Col>
          <Grid.Col span={6} hiddenFrom="sm">
            <Burger opened={opened}
              onClick={toggle}
              className={classes.burger}
              size="sm"
              hiddenFrom="sm"
            />
          </Grid.Col>

          
          <Grid.Col span={1}>
            <div className={classes.mainLinkData}>
              <Anchor<'a'> href={'/'}>Выйти</Anchor>
            </div>
          </Grid.Col>
          <Grid.Col span={2}>
            <div className={classes.mainLinkData}>
              {`${props.service.name} (${props.service.subName})`}
            </div>
          </Grid.Col>
          <Grid.Col span={1}>
            <div className={classes.mainLinkData}>
              {props.user.name ? props.user.name : props.user.email}
            </div>
          </Grid.Col>
          <Grid.Col span={8}>
            <Group  visibleFrom="sm" gap={0} justify="center">
              {mainItems}
            </Group>
          </Grid.Col>

        </Grid>
        
          
            
          
          
        {/* </Container> */}
        
        <BurgerMenuModal/>
      </header>
  )
}

