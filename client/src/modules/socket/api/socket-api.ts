// import { useNavigate } from 'react-router-dom'
import io, { Socket } from 'socket.io-client'

export class SocketApt {

    // static navigate = useNavigate()

    static socket: null | Socket = null

    static createConnections(token: string): void {
        // @ts-ignore
        this.socket = io(process.env.REACT_APP_WS, {auth: {token: {'Authorization': 'Bearer ' + token}}})

        this.socket.on('connect', () => {
            console.log('connect')
        })

        this.socket.on('disconnect', () => {
            console.log('disconnect')
        })

        this.socket.on('exception', (data) => {
            console.log(data)
        })

    }

    static disconnectConnections(): void {
        this.socket?.disconnect()

    }

}