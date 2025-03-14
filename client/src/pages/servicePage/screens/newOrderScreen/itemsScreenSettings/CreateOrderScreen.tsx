import { Button, CloseButton, Collapse, Grid, Image, Indicator, RangeSlider, Space, TextInput } from '@mantine/core'
import React from 'react'
import { sendToSocket } from '../../../../../modules/socket/pipSendSocket.ts'
import { MultSelectCreate } from './ElementsInput/MultSelectCreate.tsx'
import { SelectField } from './ElementsInput/SelectField.tsx'
import { MultSelect } from './ElementsInput/MultSelect.tsx'
import { NumberHandInput } from './ElementsInput/NumberHandInput.tsx'
import { TextHandInput } from './ElementsInput/TextHandInput.tsx'
import { MultSelectNoCreate } from './ElementsInput/MultSelectNoCreate.tsx'
import { MultSelectCreateOne } from './ElementsInput/MultSelectCreateOne.tsx'
import { MultSelectNoCreateOne } from './ElementsInput/MultSelectNoCreateOne.tsx'

export function CreateOrderScreen(props, message) {

  // console.log(props.props.openedNewOrder)

  console.log('CreateOrderScreen')

  const activData = props.service.orderData.filter(item => !item.hidden)

  const fieldCheck = (item) => {
    if(item.number){
      // console.log('-цифры')
      // console.log(item.item)
      return  <NumberHandInput props={{...props, field: item}}/>
    }
    else{
      if(item.variant){
        if(item.onlyVariants){
          if(item.multiVariants){
            // console.log('-несколько вариантов')
            // console.log(item.item)
            return  <MultSelect props={{...props, field: item}}/>
          }
          else{
            // console.log('-один вариант')
            // console.log(item.item)
            return  <SelectField props={{...props, field: item}}/>
          }
        }
        else{
          if(item.multiVariants){
            if(item.saveNewVariants){
              // console.log('-несколько вариантов или свой с сохранением')
              // console.log(item.item)
              return  <MultSelectCreate props={{...props, field: item}}/>
            }
            else{
              // console.log('-несколько вариантов или свой')
              // console.log(item.item)
              return  <MultSelectNoCreate props={{...props, field: item}}/>
            }
          }
          else{
            if(item.saveNewVariants){
              // console.log('-один вариант или свой с сохранением')
              // console.log(item.item)
              return  <MultSelectCreateOne props={{...props, field: item}}/>
            }
            else{
              // console.log('-один вариант или свой')
              // console.log(item.item)
              return  <MultSelectNoCreateOne props={{...props, field: item}}/>
            }

          }
        }
      }
      else{
        // console.log('-текст')
        // console.log(item.item)
        return  <TextHandInput props={{...props, field: item}}/>
      }
    }
  }
  const createOrder = () => {
    const newOrder = []
    for(const i of activData){
      // @ts-ignore
      newOrder.push({data: sessionStorage.getItem(`docInput_${i.item}`) ? JSON.parse(sessionStorage.getItem(`docInput_${i.item}`)).join(', ') : '', 
        field: i.item, number: i.number,
        control: i.control
      })
    }
    return newOrder
  }
  const disabledCreateButton = () => {
    // @ts-ignore
    const fullItems = createOrder().filter(item => !item.data && item.control)
    return fullItems.length ? true : false
  }
  const disabledClearButton = () => {
    // @ts-ignore
    const fullItems = createOrder().filter(item => !item.data)
    return fullItems.length === createOrder().length
  }
  const switchFilterOrNewOrder = (set) => {
      if(set === 'filter'){
        props.props.openedFilterHandler.toggle()
        props.props.openedNewOrderHandler.close()
      }
      else if(set === 'newOrder'){
        props.props.openedFilterHandler.close()
        props.props.openedNewOrderHandler.toggle()
      }
  }
  const butOpenCreateOrder = () => {
    if(!props.props.openedNewOrder){
      return <Button fullWidth color='green' 
      onClick={() => {
        switchFilterOrNewOrder('newOrder')
        props.props.askNewOrderImages()
      }}>{props.text[message][props.leng]}</Button>
    }
    return <Button fullWidth color='red' onClick={() => switchFilterOrNewOrder('newOrder')}>{props.text.hide[props.leng]}</Button>
  }
  const butOpenFilter = () => {
    if(!props.props.openedFilter){
      return <Button fullWidth onClick={() => switchFilterOrNewOrder('filter')}>Filter</Button>
    }
    return <Button fullWidth color='red' onClick={() => switchFilterOrNewOrder('filter')}>{props.text.hide[props.leng]}</Button>
  }
  const filterOrderInput = () => {
    return (
      <TextInput
        rightSection={
          <CloseButton
            aria-label="Clear input"
            onClick={() => props.props.setFilterOrdersString('')}
            style={{ display: props.props.filterOrdersString ? undefined : 'none' }}
          />
        }
        value={props.props.filterOrdersString}
        onChange={(event) => props.props.setFilterOrdersString(event.target.value)}
      />
    )
  }
  const newOrderPhotosLine = () => {
    if(props.props.newOrderImages && props.props.newOrderImages.length){
      return (
        <>
        <Grid>
          {props.props.newOrderImages.map(item => 
            <Grid.Col span={1.2} key={item.media}>
              <Indicator
              offset={7} position="bottom-end" color="red" 
              withBorder
              inline
              size={'1.5vmax'}
              onClick={async () => {
                sendToSocket('deleteImage', {
                  serviceId: props.user.serviceId, 
                  subServiceId: props.user.subServiceId,
                  image: item.media
                })
              }}
              >
              <Image 
                src={`data:image/jpeg;base64,${item.buffer}`}
                radius="sm"
                h='10vmax'
                w="auto"
              />
              </Indicator>
            </Grid.Col>
          )}
        </Grid>
        </>
      )
    }
  }

  const butLine = [
    // <div>
    //   <Button size={'xs'} fullWidth color='red' onClick={() => props.props.getCountOfOrders(props.props.countLoadOrders[0], props.props.countLoadOrders[1])}>Определенное количество</Button>
    //   <RangeSlider color='red' size="xs" labelAlwaysOn defaultValue={props.props.countLoadOrders} classNames={classes} 
    //   onChange={(event) => {
    //       console.log(event)
    //       props.props.setCountLoadOrders(event)
    //     }
    //   }
    //   />
    // </div>,
    butOpenCreateOrder(),
    filterOrderInput(),
    butOpenFilter(),
  ]

  const createModule = () => {
    if(props.props.openedNewOrder){
      return (
        <div>

          <Grid grow>
            {activData.map(item => 
            <Grid.Col key={item.item} span={props.props.screenSizeNewOrder}>
              {fieldCheck(item)}
            </Grid.Col>)}
          </Grid>
            <Space h='lg'/>
            {newOrderPhotosLine()}
          <Grid grow>
            <Grid.Col span={props.props.screenSizeNewOrder}>
              <Button
                color='red'
                fullWidth
                disabled={!props.props.newOrderImages.length}
                onClick={async () => {
                  sendToSocket('deleteAllImage', {
                    serviceId: props.user.serviceId, 
                    subServiceId: props.user.subServiceId
                  })
                }}
                >
                {props.text.deleteAllImages[props.leng]}
              </Button>
            </Grid.Col>
            <Grid.Col span={props.props.screenSizeNewOrder}>
              <Button
                color='red'
                fullWidth 
                disabled={disabledClearButton()}
                onClick={() => {
                  for(const i of activData.map(item => item.item)){
                    sessionStorage.removeItem(`docInput_${i}`)
                  }
                  props.props.setNewOrderRend(Date.now())
                }}
                >
                {props.text.clearForm[props.leng]}
              </Button>
            </Grid.Col>
            <Grid.Col span={props.props.screenSizeNewOrder}>
              <Button
                color='green'
                fullWidth
                disabled={disabledCreateButton()}
                onClick={async () => {
                  await props.props.getAndPrintNewOrder()
                  sendToSocket('createOrder', {
                    serviceId: props.user.serviceId, 
                    subServiceId: props.user.subServiceId,
                    newOrder: createOrder()
                  })
                }}
                >
                {props.text.createNewOrder[props.leng]}
              </Button>
            </Grid.Col>
          </Grid>

        </div>
      )
    }
  }
  const filterModule = () => {
    if(props.props.openedFilter){
      return (
        <div>
          {/* <hr style={{marginTop: '1vmax', marginBottom: '1vmax'}}></hr> */}
                  dddd
          {/* <Grid grow>
            {activData.map(item => 
            <Grid.Col key={item.item} span={props.props.screenSizeNewOrder}>
              {fieldCheck(item)}
            </Grid.Col>)}
          </Grid>

          <Grid style={{marginTop: '1.5vmax'}} grow>
            <Grid.Col span={props.props.screenSizeNewOrder}>
              <Button
                color='green'
                fullWidth
                disabled={disabledCreateButton()}
                onClick={async () => {
                  await props.props.getAndPrintNewOrder()
                  sendToSocket('createOrder', {
                    serviceId: props.user.serviceId, 
                    subServiceId: props.user.subServiceId,
                    newOrder: createOrder()
                  })
                }}
                >
                {props.text.createNewOrder[props.leng]}
              </Button>
            </Grid.Col>
            <Grid.Col span={props.props.screenSizeNewOrder}>
              <Button
                color='red'
                fullWidth 
                disabled={disabledClearButton()}
                onClick={() => {
                  for(const i of activData.map(item => item.item)){
                    sessionStorage.removeItem(`docInput_${i}`)
                  }
                  props.props.setNewOrderRend(Date.now())
                }}
                >
                {props.text.clearForm[props.leng]}
              </Button>
            </Grid.Col>
          </Grid> */}

        </div>
      )
    }
  }

  return (
    <div>
      <Grid>
        {butLine.map((item, index) => <Grid.Col key={index} span={props.props.screenSizeNewOrder}>{item}</Grid.Col>)}
      </Grid>

      <Collapse in={props.props.openedNewOrder}>
      {createModule()}
        {/* <div>
          <hr style={{marginTop: '1vmax', marginBottom: '1vmax'}}></hr>

          <Grid grow>
            {activData.map(item => 
            <Grid.Col key={item.item} span={props.props.screenSizeNewOrder}>
              {fieldCheck(item)}
            </Grid.Col>)}
          </Grid>

          <Grid style={{marginTop: '1.5vmax'}} grow>
            <Grid.Col span={props.props.screenSizeNewOrder}>
              <Button
                color='green'
                fullWidth
                disabled={disabledCreateButton()}
                onClick={async () => {
                  await props.props.getAndPrintNewOrder()
                  sendToSocket('createOrder', {
                    serviceId: props.user.serviceId, 
                    subServiceId: props.user.subServiceId,
                    newOrder: createOrder()
                  })
                }}
                >
                {props.text.createNewOrder[props.leng]}
              </Button>
            </Grid.Col>
            <Grid.Col span={props.props.screenSizeNewOrder}>
              <Button
                color='red'
                fullWidth 
                disabled={disabledClearButton()}
                onClick={() => {
                  for(const i of activData.map(item => item.item)){
                    sessionStorage.removeItem(`docInput_${i}`)
                  }
                  props.props.setNewOrderRend(Date.now())
                }}
                >
                {props.text.clearForm[props.leng]}
              </Button>
            </Grid.Col>
          </Grid>

        </div> */}
      </Collapse>
      <Collapse in={props.props.openedFilter}>
      {filterModule()}
      </Collapse>
      <hr style={{marginTop: '1vmax', marginBottom: '0.1vmax'}}></hr>
    </div>
    
  )
}