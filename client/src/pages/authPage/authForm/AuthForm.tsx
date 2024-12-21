import React, { useState } from 'react'
import {
    Button,
    Paper,
    PasswordInput,
    TextInput,
    Title,
  } from '@mantine/core';
  // @ts-ignore
import classes from './AuthForm.module.css';
import { LanguagePicker } from '../../../components/LanguagePicker/LanguagePicker.tsx'

const validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  
  export function AuthForm(props) {

    const [errorMessageEmail, setErrorMessageEmail] = useState<string>('')
    const [clickEmailSend, setClickEmailSend] = useState<boolean>(false)
    
    const authBlok = () => {
        if(clickEmailSend){
            return (
                <div> 
                    <PasswordInput 
                    label="Password" 
                    placeholder="xxxx" 
                    mt="md" 
                    size="md"
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
                        await props.authClass.startRequest(props.email, props.leng, Number(props.authCode))
                        console.log(props.authCode)
                        console.log(props.email)
                    }}
                    >
                    {props.text.login[props.leng]}
                    </Button>
                </div>
            )
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
            }} 
            />
            <Button
            fullWidth
            mt="xl"
            size="md"
            disabled={!validEmail.test(props.email) || clickEmailSend}
            onClick={() => {
                setClickEmailSend(true)
            }}
            >
            {props.text.sendPasswordToEmail[props.leng]}
            </Button>
            {authBlok()}
        </Paper>
      </div>
    )
  }