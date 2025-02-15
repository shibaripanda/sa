import { Button, Collapse, Grid, RangeSlider, TextInput } from '@mantine/core'
import React from 'react'
import { sendToSocket } from '../../../../../modules/socket/pipSendSocket.ts'
import { MultSelectCreate } from './ElementsInput/MultSelectCreate.tsx'
import { SelectField } from './ElementsInput/SelectField.tsx'
import { HandTextInput } from './ElementsInput/HandTextInput.tsx'
import { MultSelect } from './ElementsInput/MultSelect.tsx'
// @ts-ignore
// import classes from './Slider.module.css'

export function CreateOrderScreen(props, message) {

  console.log('CreateOrderScreen')

  const activData = props.service.orderData.filter(item => !item.hidden)
  

  const fieldCheck = (item) => {
    if(!item.variant || item.number){
      return  <HandTextInput props={{...props, field: item}}/>
    }
    if(item.onlyVariants){
      if(item.multiVariants){
        return <MultSelect props={{...props, field: item}}/>
      }
      return <SelectField props={{...props, field: item}}/>
    }
    return <MultSelectCreate props={{...props, field: item}}/>
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
      return <Button fullWidth color='green' onClick={() => switchFilterOrNewOrder('newOrder')}>{props.text[message][props.leng]}</Button>
    }
    return <Button fullWidth color='red' onClick={() => switchFilterOrNewOrder('newOrder')}>{props.text.cancel[props.leng]}</Button>
  }
  const butOpenFilter = () => {
    if(!props.props.openedFilter){
      return <Button fullWidth onClick={() => switchFilterOrNewOrder('filter')}>Filter</Button>
    }
    return <Button fullWidth color='red' onClick={() => switchFilterOrNewOrder('filter')}>{props.text.cancel[props.leng]}</Button>
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
    <TextInput/>,
    butOpenFilter(),
  ]

  return (
    <div>
      <Grid>
        {butLine.map((item, index) => <Grid.Col key={index} span={props.props.screenSizeNewOrder}>{item}</Grid.Col>)}
      </Grid>

      <Collapse in={props.props.openedNewOrder}>
        <div>
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

        </div>
      </Collapse>
      <Collapse in={props.props.openedFilter}>
        <div>
          <hr style={{marginTop: '1vmax', marginBottom: '1vmax'}}></hr>
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
      </Collapse>
      <hr style={{marginTop: '1vmax', marginBottom: '0.1vmax'}}></hr>
    </div>
    
  )
}