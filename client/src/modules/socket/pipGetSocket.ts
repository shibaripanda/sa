import { SocketApt } from "./api/socket-api.ts"

interface Pip {
    message: string
    handler: any
}
export const getFromSocket = (messages: Pip[]) => {

    for(const i of messages){
        SocketApt.socket?.on(i.message, (data) => {
            i.handler(data)
        })
    }
    
}