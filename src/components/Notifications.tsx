import { toast } from "sonner"
import { useWebSocket } from "@/context/SocketContext"
import { useEffect } from "react"

export const Notifications = () => {
    const {subscribe} = useWebSocket()

    useEffect(() => {
        const unsubNotifications = subscribe("notification", (payload) => {
            const text = payload?.["text"]
            const desc = payload?.["desc"]

            toast(text, {
                description: desc
            });
        })

        return () => {
            unsubNotifications()
        };
    }, [subscribe]);
    return null
}