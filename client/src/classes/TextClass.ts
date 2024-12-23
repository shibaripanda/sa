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

    async getTextPackFromServer(): Promise<Leng | false>{

        return await axios({
            method: 'GET',
            url: this.link + '/auth/text',
            data: {},
            headers: {},
            timeout: 10000
        })
        .then((res) => {
            console.log(res.data)
            return res.data
        })
        .catch((e) => {
            console.log(false)
            return false
        })

    }
}