import { Box, Button, Checkbox, CloseButton, Collapse, Divider, Grid, Group, Image, Indicator, NumberInput, RangeSlider, Space, TextInput } from '@mantine/core'
import React from 'react'
import { MultSelectCreate } from './ElementsInput/MultSelectCreate.tsx'
import { SelectField } from './ElementsInput/SelectField.tsx'
import { MultSelect } from './ElementsInput/MultSelect.tsx'
import { NumberHandInput } from './ElementsInput/NumberHandInput.tsx'
import { TextHandInput } from './ElementsInput/TextHandInput.tsx'
import { MultSelectNoCreate } from './ElementsInput/MultSelectNoCreate.tsx'
import { MultSelectCreateOne } from './ElementsInput/MultSelectCreateOne.tsx'
import { MultSelectNoCreateOne } from './ElementsInput/MultSelectNoCreateOne.tsx'
import { DatePickerInput } from '@mantine/dates'

export function CreateOrderScreen(props, message) {

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
        field: i.item, 
        number: i.number,
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
    return <Button fullWidth variant='default' onClick={() => switchFilterOrNewOrder('newOrder')}>{props.text.hide[props.leng]}</Button>
  }
  const butOpenFilter = () => {
    if(!props.props.openedFilter){
      return <Button fullWidth variant='default' onClick={() => switchFilterOrNewOrder('filter')}>{props.text.filter[props.leng]}</Button>
    }
    return <Button fullWidth variant='default' onClick={() => switchFilterOrNewOrder('filter')}>{props.text.hide[props.leng]}</Button>
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
                props.user.deleteImage(item.media)
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
    butOpenCreateOrder(),
    filterOrderInput(),
    butOpenFilter(),
  ]

  const createModule = () => {
    if(props.props.openedNewOrder){
      return (
        <Box style={{
          border: '2px solid #6ef54c',
          borderRadius: '7px',
          padding: '16px',
          marginTop: '15px'
        }}>
        <div style={{marginRight: '2vmax', marginLeft: '2vmax'}}>
          <Space h='lg'/>
          <Grid grow>
            {activData.map(item => 
            <Grid.Col key={item.item} span={props.props.screenSizeNewOrder}>
              {fieldCheck(item)}
            </Grid.Col>)}
          </Grid>
          <Space h='lg'/>
            {newOrderPhotosLine()}
          <Space h='lg'/>
          <Grid grow>
            <Grid.Col span={props.props.screenSizeNewOrder}>
              <Button
                variant='default'
                fullWidth
                disabled={!props.props.newOrderImages.length}
                onClick={async () => {
                  props.user.deleteAllImage()
                }}
                >
                {props.text.deleteAllImages[props.leng]}
              </Button>
            </Grid.Col>
            <Grid.Col span={props.props.screenSizeNewOrder}>
              <Button
                variant='default'
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
                  props.user.createOrder(createOrder())
                  props.user.deleteAllImage()
                  switchFilterOrNewOrder('newOrder')   //сворачивание нового заказа
                }}
                >
                {props.text.createNewOrder[props.leng]}
              </Button>
            </Grid.Col>
          </Grid>

        </div>
        </Box>
      )
    }
  }
  const filterModule = () => {
    if(props.props.openedFilter){
      return (
        <Box style={{
          border: '2px solid #6ef54c',
          borderRadius: '7px',
          padding: '16px',
          marginTop: '15px'
        }}>
        <div style={{marginRight: '2vmax', marginLeft: '2vmax'}}>
          <Space h='lg'/>
          <Group>
            {props.service.devices.map(item => 
            <Checkbox color='grey' key={item} label={item} checked={!props.user.deviceFilter.includes(item)}
            onChange={() => {
              props.user.editUserFilter('deviceFilter', item)
            }}
            />)}
          </Group>
          <Divider size="xs" color="gray.4" my="xs" />
          <Space h='lg'/>
          <Group>
            {props.service.statuses.map(item => <Checkbox color='grey' key={item} label={item} checked={!props.user.statusFilter.includes(item)}
            onChange={() => {
              props.user.editUserFilter('statusFilter', item)
            }}/>)}
          </Group>
          <Divider size="xs" color="gray.4" my="xs" />
          <Space h='lg'/>
          <Group>
            {props.service.subServices.map(item => <Checkbox color='grey' key={item.subServiceId} label={item.name} checked={!props.user.subServiceFilter.includes(item.subServiceId)}
            onChange={() => {
              props.user.editUserFilter('subServiceFilter', item.subServiceId)
            }}/>)}
          </Group>
          <Divider size="xs" color="gray.4" my="xs" />
          <Space h='lg'/>
          <Group justify='space-between'>
            <Group>
              <DatePickerInput
              type="range"
              value={props.user.dateFilter.map(item => item ? new Date(item) : null)}
              onChange={(event) => {
                props.user.editUserFilter('dateFilter', [event[0], event ? event[1] : null])
              }}
              placeholder="All dates"
              />
              <Button variant='default'
                onClick={() => {
                  props.user.editUserFilter('dateFilter', [null, null])
                }}
                >
                {props.text.skipDate[props.leng]}
              </Button>
            </Group>

            <Group>
              {props.text.maxOrderCount[props.leng] + ': '}
              <NumberInput value={props.props.countLoadOrders[1]}
              min={1}
              max={50}
              onChange={(event) => {
                console.log(event)
                props.props.setCountLoadOrders([props.props.countLoadOrders[0], event])
              }
            }
            />
            </Group>

            

            <Group>
              <Button variant='default'
                onClick={() => {
                  props.user.editUserFilter('skip', 'skip')
                }}
                >
                {props.text.skipAll[props.leng]}
              </Button>
              <Button variant='default'
              onClick={() => {
                props.props.upateOrdersFilter()
              }}>
                {props.text.use[props.leng]}
              </Button>
            </Group>
          </Group>


        </div>
        </Box>
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
      </Collapse>
      <Collapse in={props.props.openedFilter}>
      {filterModule()}
      </Collapse>
      <hr style={{marginTop: '1vmax', marginBottom: '0.1vmax'}}></hr>
    </div>
    
  )
}