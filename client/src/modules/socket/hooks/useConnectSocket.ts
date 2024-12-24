import { useEffect } from "react"
import { SocketApt } from "../api/socket-api.ts"

export const useConnectSocket = (token) => {

    const connectSocket = () => {
        SocketApt.createConnections(token)

    }
    
    useEffect(() => {
        connectSocket()
        return () => { 
            SocketApt.disconnectConnections(); 
           }
    }, [])
    
}
