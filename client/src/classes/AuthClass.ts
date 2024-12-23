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
            console.log(e.response.data.message ? e.response.data.message : 'error')
            return false
        })

    }

}