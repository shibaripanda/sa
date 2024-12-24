import React, { useState } from 'react'
import {
    Button,
    Paper,
    PasswordInput,
    TextInput,
    Title,
  } from '@mantine/core';
  // @ts-ignore
import classes from './AuthForm.module.css'
import { LanguagePicker } from '../../../components/LanguagePicker/LanguagePicker.tsx'
import { useDisclosure } from '@mantine/hooks'
import { ServiceModal } from '../serviceForm/ServiceModal.tsx'

const validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  
  export function AuthForm(props: any) {

    const [errorMessageEmail, setErrorMessageEmail] = useState<string>('')
    const [clickEmailSend, setClickEmailSend] = useState<boolean>(false)
    const [descriptionText, setDescriptionText] = useState<string>('')
    const [opened, { close, open }] = useDisclosure(false)
    const [timer, setTimer] = useState<number>()
    let [time, setTime] = useState<number>(60)

    function timerSet(){
      if(time === 0){
        clearInterval(timer)
        setClickEmailSend(false)
        props.setAuthCode()
      }
      else{
        setTime(time--)
      }
    }

    const authBlok = () => {
        if(clickEmailSend){
            return (
                <div> 
                    <PasswordInput
                    description={descriptionText} 
                    label="Password" 
                    placeholder="xxxx" 
                    mt="md" 
                    size="md"
                    withAsterisk
                    value={props.authCode}
                    onChange={(event) => {
                        props.setAuthCode(event.currentTarget.value)
                    }} 
                    />
                    <Button
                    type="submit"
                    fullWidth
                    mt="xl"
                    size="md"
                    disabled={!props.authCode || props.authCode.length < 4 || props.authCode.length > 4}
                    onClick={async () => {
                        const res = await props.authClass.startRequest(props.email, props.leng, Number(props.authCode), setDescriptionText, props.setUsersThisSession, props.usersThisSession, props.setAuthCode, props.setEmail, setClickEmailSend)
                        clearInterval(timer)
                        if(!res){
                          props.setAuthCode()
                          setTime(60)
                          time = 60
                          const int = setInterval(timerSet, 1000)
                          setTimer(int)
                        }
                    }}
                    >
                    {props.text.auth[props.leng] + ' ' + time}
                    </Button>
                </div>
            )
        }
    }
    const sendButBlok = () => {
      if(!clickEmailSend)
        return <Button
            fullWidth
            mt="xl"
            size="md"
            disabled={!validEmail.test(props.email) || clickEmailSend}
            onClick={async () => {
                await props.authClass.startRequest(props.email, props.leng, undefined, setDescriptionText)
                setClickEmailSend(true)
                setTime(60)
                time = 60
                const int = setInterval(timerSet, 1000)
                setTimer(int)
            }}
            >
            {props.text.sendPasswordToEmail[props.leng]}
            </Button>
    }
    const usersBlock = () => {
      if(props.usersThisSession.length)
        return (
          <div>
            <hr></hr>
          {props.usersThisSession.map(item => <Button
            key={item._id}
            color='green'
            fullWidth
            mt="xl"
            size="md"
            onClick={async () => {
              sessionStorage.setItem('currentUser', JSON.stringify(item))
              clearInterval(timer)
              open()
            }}
            >
            {item.name ? item.name : item.email}
          </Button>)}
          <Button
            color='red'
            fullWidth
            mt="xl"
            size="md"
            onClick={async () => {
              props.setUsersThisSession([])
              setClickEmailSend(false)
              props.setAuthCode()
              props.setEmail('')
              sessionStorage.removeItem('serviceAppUsers')
              sessionStorage.removeItem('currentUser')
              clearInterval(timer)
            }}
            >
            {props.text.exit[props.leng]}
          </Button>
          </div>

          )
    }
    const modalBlock = () => {
      if(sessionStorage.getItem('currentUser')){
        // @ts-ignore
        return <ServiceModal opened={opened} close={close} user={JSON.parse(sessionStorage.getItem('currentUser'))}/>
      }
    }

    return (
      <div className={classes.wrapper}>
        <Paper className={classes.form} radius={0} p={30}>
          <LanguagePicker avLeng={props.avLeng} setLeng={props.setLeng} leng={props.leng}/>
          <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
            {props.text.welcome[props.leng]}
          </Title>
            <TextInput 
            label="Email" 
            placeholder="hello@gmail.com" 
            size="md"
            value={props.email}
            error={errorMessageEmail}
            withAsterisk
            onChange={(event) => {
                if(!validEmail.test(event.currentTarget.value)){
                    setErrorMessageEmail(props.text.badEmail[props.leng])
                    if(event.currentTarget.value === ''){
                        setErrorMessageEmail('')
                    }
                }
                else{
                    setErrorMessageEmail('')
                }
                setClickEmailSend(false)
                props.setAuthCode()
                props.setEmail(event.currentTarget.value)
                if(timer){
                  console.log(timer)
                  clearInterval(timer)
                  setTimer(undefined)
                  console.log(timer)  
                }    
            }} 
            />
            {sendButBlok()}
            {authBlok()}
            {usersBlock()}
        </Paper>
        {modalBlock()}
      </div>
    )
  }