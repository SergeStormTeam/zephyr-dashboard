import { useWebSocket } from "@/context/SocketContext"
import { useEffect, useState } from "react"

export const Connected = () => {
    const {subscribe, isConnected} = useWebSocket()
    const [sessionActive, setSessionActive] = useState<boolean>(false)
    const [Id, setId] = useState<string>("INVALID")

    useEffect(() => {
        const unsubscribeSessionUpdate = subscribe("session_update", (payload) => {
            const valueSes = payload?.["session"]
            if (valueSes !== undefined) setSessionActive(valueSes)
            if (valueSes) {
                const valueId = payload?.["id"]
                if (valueId !== undefined) setId(valueId)
            }
        })

        return () => {
            unsubscribeSessionUpdate()
        }
    })
    return (
        <div className="flex flex-row items-center">
            <div className={`w-4 h-4 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}/>
            <p className="pl-2">{isConnected ? (sessionActive ? `Connected: ${Id}` : `Connected: No Active Session!`) : "Not Connected"}</p>
        </div>
    )
}