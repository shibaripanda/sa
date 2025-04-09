import axios from "axios"
import { jwtDecode } from "jwt-decode"

export class AuthClass {
    link: string | undefined

    constructor(){
        // @ts-ignore
        this.link = process.env.REACT_APP_LINK
    }

    getServiceId(){
        if(!sessionStorage.getItem('serviceId')) return false
        return sessionStorage.getItem('serviceId')
    }

    getSubServiceId(){
        if(!sessionStorage.getItem('subServiceId')) return false
        return sessionStorage.getItem('subServiceId')
    }

    getCurrentUserForCurrentService(){
        if(!sessionStorage.getItem('currentUser')) return false
         // @ts-ignore
        const user = JSON.parse(sessionStorage.getItem('currentUser'))
        user.openSubServices = structuredClone(
            user.roles.find(item => item.serviceId === this.getServiceId()) ?
            user.roles.find(item => item.serviceId === this.getServiceId()).subServices.map(item => item.subServiceId) : []
        )
        user.roles = user.roles.filter(item => item.serviceId === this.getServiceId())[0].subServices.filter(item => item.subServiceId === this.getSubServiceId())[0]
        
        user.serviceId = this.getServiceId()
        return user
    }

    getCurrentUser(){
        if(!sessionStorage.getItem('currentUser')) return false
         // @ts-ignore
        return JSON.parse(sessionStorage.getItem('currentUser'))
    }

    deleteCurrentUser(){
        sessionStorage.removeItem('currentUser')
    }

    deleteCurrentService(){
        sessionStorage.removeItem('serviceId')
    }

    getServiceAppUsers(){
        if(!sessionStorage.getItem('serviceAppUsers')) return []
        // @ts-ignore
        return JSON.parse(sessionStorage.getItem('serviceAppUsers'))
    }

    updateServiceAppUsers(data, field){
        const users = this.getServiceAppUsers()
        const user = this.getCurrentUser()
        user[field] = data
        users.find(item => item._id === user._id)[field] = data
        sessionStorage.setItem('currentUser', JSON.stringify(user))
        sessionStorage.setItem('serviceAppUsers', JSON.stringify(users))
    }

    async startRequest(email, leng, authCode, setDescriptionText, setUsersThisSession, usersThisSession, setAuthCode, setEmail, setClickEmailSend){
        
        return await axios({
            method: 'POST',
            url: this.link + '/auth/login',
            data: {email: email, leng: leng, authCode: authCode},
            headers: {},
            timeout: 10000
        })
        .then(async (res) => {
            if(!usersThisSession.map(item => item._id).includes(jwtDecode(res.data.token)['_id'])){
                await setUsersThisSession([{...jwtDecode(res.data.token), token: res.data['token']}, ...usersThisSession])
                if(!sessionStorage.getItem('serviceAppUsers')){
                    sessionStorage.setItem('serviceAppUsers', JSON.stringify([{...jwtDecode(res.data.token), token: res.data['token']}]))
                }
                else{
                    // @ts-ignore
                    const serviceAppUsers = JSON.parse(sessionStorage.getItem('serviceAppUsers'))
                    const newSETusers = [{...jwtDecode(res.data.token), token: res.data['token']}, ...serviceAppUsers]
                    sessionStorage.setItem('serviceAppUsers', JSON.stringify(newSETusers))
                }
            }
            setDescriptionText(undefined)
            setAuthCode()
            setEmail('')
            setClickEmailSend(false)
            return true
        })
        .catch((e) => {
            setDescriptionText(e.response.data.message ? e.response.data.message : 'error')
            return false
        })

    }

    async startGoogleAuthRequest(credentialResponse, setDescriptionText, setUsersThisSession, usersThisSession){

        return await axios({
            method: 'POST',
            url: this.link + '/auth/googleLogin',
            data: {access_token: credentialResponse},
            headers: {},
            timeout: 10000
        })
        .then(async (res) => {
            if(!usersThisSession.map(item => item._id).includes(jwtDecode(res.data.token)['_id'])){
                await setUsersThisSession([{...jwtDecode(res.data.token), token: res.data['token']}, ...usersThisSession])
                if(!sessionStorage.getItem('serviceAppUsers')){
                    sessionStorage.setItem('serviceAppUsers', JSON.stringify([{...jwtDecode(res.data.token), token: res.data['token']}]))
                }
                else{
                    // @ts-ignore
                    const serviceAppUsers = JSON.parse(sessionStorage.getItem('serviceAppUsers'))
                    const newSETusers = [{...jwtDecode(res.data.token), token: res.data['token']}, ...serviceAppUsers]
                    sessionStorage.setItem('serviceAppUsers', JSON.stringify(newSETusers))
                }
            }
            return true
        })
        .catch((e) => {
            setDescriptionText(e.response.data.message ? e.response.data.message : 'error')
            return false
        })

    }

    async startDemo(setDescriptionText, setUsersThisSession, usersThisSession){

        return await axios({
            method: 'POST',
            url: this.link + '/auth/demo',
            data: {demo: 'demo'},
            headers: {},
            timeout: 10000
        })
        .then(async (res) => {
            if(!usersThisSession.map(item => item._id).includes(jwtDecode(res.data.token)['_id'])){
                await setUsersThisSession([{...jwtDecode(res.data.token), token: res.data['token']}, ...usersThisSession])
                if(!sessionStorage.getItem('serviceAppUsers')){
                    sessionStorage.setItem('serviceAppUsers', JSON.stringify([{...jwtDecode(res.data.token), token: res.data['token']}]))
                }
                else{
                    // @ts-ignore
                    const serviceAppUsers = JSON.parse(sessionStorage.getItem('serviceAppUsers'))
                    const newSETusers = [{...jwtDecode(res.data.token), token: res.data['token']}, ...serviceAppUsers]
                    sessionStorage.setItem('serviceAppUsers', JSON.stringify(newSETusers))
                }
            }
            return true
        })
        .catch((e) => {
            setDescriptionText(e.response.data.message ? e.response.data.message : 'error')
            return false
        })

    }

}