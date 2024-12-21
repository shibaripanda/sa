import axios from "axios"

export class AuthClass {
    link: string | undefined

    constructor(){
        // @ts-ignore
        this.link = process.env.REACT_APP_LINK
    }

    async startRequest(email, leng, authCode){
        
        await axios({
            method: 'POST',
            url: this.link + '/auth/login',
            data: {email: email, leng: leng, authCode: authCode},
            headers: {},
            timeout: 10000
        })
        .then((res) => {
            console.log(res.data.token)
        })
        .catch((e) => {
            console.log(e.response.data.message)
        })

    }

    // async startPasswordRequest(obj){
    //     return await axiosCall('POST', `${this.link}/auth/authemailcode`, obj)
    // }

    // async createNewCamp(obj){
    //     return await axiosCall('POST', `${this.link}/auth/registration`, obj)
    // }

}