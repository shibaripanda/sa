import { useState } from 'react'
import { CheckIcon, Combobox, Group, Pill, PillsInput, useCombobox } from '@mantine/core'
import React from 'react'
import { sendToSocket } from '../../../../../../modules/socket/pipSendSocket.ts';


export function MultSelectCreate(props) {
  console.log(props.props.field)
  console.log(sessionStorage.getItem(`docInput_${props.props.field.item}`))
    
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  })

  const [search, setSearch] = useState('');
  const [data, setData] = useState(props.props.field.variants)
  // @ts-ignore
  const [value, setValue] = useState<string[]>(sessionStorage.getItem(`docInput_${props.props.field.item}`) ? JSON.parse(sessionStorage.getItem(`docInput_${props.props.field.item}`)) : [])

  const exactOptionMatch = data.some((item) => item === search)

  const handleValueSelect = (val: string) => {
    setSearch('')

    if(val === '$create'){
      setData((current) => [...current, search])
      if(props.props.field.saveNewVariants){
        sendToSocket('addOrDelListVariant', {
                    serviceId: props.props.user.serviceId, 
                    subServiceId: props.props.user.subServiceId, 
                    item: props.props.field.item,
                    variant: search
                    })
                  }
      setValue((current) => [...current, search])
      sessionStorage.setItem(`docInput_${props.props.field.item}`, JSON.stringify([...value, search]))
      console.log('add+')
    }
    else{
      setValue((current) =>
        current.includes(val) ? current.filter((v) => v !== val) : [...current, val]
      )
      sessionStorage.setItem(`docInput_${props.props.field.item}`, value.includes(val) ? JSON.stringify(value.filter((v) => v !== val)) : JSON.stringify([...value, val]))
      console.log('add')
    }

  }

  const handleValueRemove = (val: string) => {
    setValue((current) => current.filter((v) => v !== val))
    sessionStorage.setItem(`docInput_${props.props.field.item}`, JSON.stringify(value.filter((v) => v !== val)))
    console.log('remove')
  }

  const values = value.map((item) => (
    <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
      {item}
    </Pill>
  ))

  const options = data
    .filter((item) => item.toLowerCase().includes(search.trim().toLowerCase()))
    .map((item) => (
      <Combobox.Option value={item} key={item} active={value.includes(item)}>
        <Group gap="sm">
          {value.includes(item) ? <CheckIcon size={12} /> : null}
          <span>{item}</span>
        </Group>
      </Combobox.Option>
    ))

    const currentValue = () => {
      if(!sessionStorage.getItem(`docInput_${props.props.field.item}`)){
        values.splice(0, value.length)
        for(const i of data){
          handleValueRemove(i)
        }
      }
    }
  
    currentValue()

  return (
    <Combobox store={combobox} onOptionSubmit={handleValueSelect} withinPortal={false}>
      <Combobox.DropdownTarget>
        <PillsInput label={props.props.field.item} onClick={() => combobox.openDropdown()}>
          <Pill.Group>
            {values}

            <Combobox.EventsTarget>
              <PillsInput.Field
                
                onFocus={() => combobox.openDropdown()}
                onBlur={() => combobox.closeDropdown()}
                value={search}
                placeholder={props.props.field.item}
                onChange={(event) => {
                  combobox.updateSelectedOptionIndex();
                  setSearch(event.currentTarget.value);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Backspace' && search.length === 0) {
                    event.preventDefault();
                    handleValueRemove(value[value.length - 1])
                  }
                }}
              />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown>
        <Combobox.Options>
          {options}

          {!exactOptionMatch && search.trim().length > 0 && (
            <Combobox.Option value="$create">+ {search}</Combobox.Option>
          )}

          {exactOptionMatch && search.trim().length > 0 && options.length === 0 && (
            <Combobox.Empty>Nothing found</Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  )
}