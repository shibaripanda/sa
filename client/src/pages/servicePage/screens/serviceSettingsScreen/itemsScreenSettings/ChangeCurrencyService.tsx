import { Button, Checkbox, Group, NumberFormatter, NumberInput, Select, Text, TextInput } from '@mantine/core'
import React from 'react'

export function ChangeCurrencyService(props, message) {

  if(!props.props.currency){
    props.props.serCurrency(structuredClone(props.service.currency))
  }

  // currency serCurrency

  if(props.props.currency){

    const cur = props.props.currency

    const showExample = () => {
      const separator = () => {
        if(cur.comma1000 === true){
          return '.'
        }
        return false
      }
      if(cur.suffixOrPrefix === 'suffix'){
        return <NumberFormatter  suffix={cur.value} thousandSeparator={separator()} decimalSeparator=',' value={(1000000 / 3).toFixed(cur.afterNumbers)} />
      }
      return <NumberFormatter  prefix={cur.value} thousandSeparator={separator()} decimalSeparator=',' value={(1000000 / 3).toFixed(cur.afterNumbers)} />
    }

    return (
      <div>
          <Text fw={700} style={{marginBottom: 10}}>{props.text[message][props.leng]}</Text>

          {showExample()}
          
          <Group>
          <Select
          label={props.text.suffixOrPrefix[props.leng]} 
          placeholder={props.text.suffixOrPrefix[props.leng]} 
          value={cur.suffixOrPrefix}
          data={['suffix', 'prefix']}
          onChange={(event) => {
            props.props.serCurrency({...props.props.currency, suffixOrPrefix: event})
          }}
          />

          <TextInput
          label={props.text.changeCurrencyService[props.leng]}  
          placeholder={props.text.changeCurrencyService[props.leng]} 
          value={cur.value}
          onChange={(event) => {
            props.props.serCurrency({...props.props.currency, value: event.target.value})
          }}
          />
          <NumberInput
          label={props.text.afterNumbers[props.leng]}  
          placeholder={props.text.afterNumbers[props.leng]} 
          value={cur.afterNumbers}
          onChange={(event) => {
            props.props.serCurrency({...props.props.currency, afterNumbers: Number(event) < 0 ? 0 : event})
          }}
          />

          <Checkbox
          label={props.text.comma1000[props.leng]}
          checked={cur.comma1000}
          onChange={(event) => {
            props.props.serCurrency({...props.props.currency, comma1000: event.currentTarget.checked})
          }}
          />
          </Group>

          <Group>
            <Button style={{marginTop: 10}}
              disabled={JSON.stringify(props.props.currency) === JSON.stringify(props.service.currency)}
              onClick={() => {
                props.user.updateCurrency(props.props.currency)
                props.props.setPrinDocs(false)
              }}
              >{props.text.save[props.leng]}
            </Button>

            <Button style={{marginTop: 10}}
              disabled={JSON.stringify(props.props.currency) === JSON.stringify(props.service.currency)}
              onClick={() => {
                props.props.serCurrency(structuredClone(props.service.currency))
              }}
              >{props.text.cancel[props.leng]}
            </Button>
          </Group>
      </div>
    )
  }

  
}