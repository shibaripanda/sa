import axios from "axios"

interface Leng {
    text: object
    lengPack: []
}

export class TextClass {
    link: string | undefined

    constructor(){
        // @ts-ignore
        this.link = process.env.REACT_APP_LINK
    }

    async getLeng(){
        if(!sessionStorage.getItem('leng')) return false
        // @ts-ignore
        return sessionStorage.getItem('leng')
    }

    async getText(){
        if(!sessionStorage.getItem('text')) return false
        // @ts-ignore
        return JSON.parse(sessionStorage.getItem('text'))
    }

    async getTextPackFromServer(): Promise<Leng | false>{

        return await axios({
            method: 'GET',
            url: this.link + '/auth/text',
            data: {},
            headers: {},
            timeout: 10000
        })
        .then((res) => {
            return res.data
        })
        .catch((e) => {
            console.log(false)
            return false
        })

    }
}