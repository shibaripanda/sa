import { SocketApt } from "./api/socket-api.ts"


export const sendToSocket = (message: string, data: any) => {

    SocketApt.socket?.emit(message, data)
    
}