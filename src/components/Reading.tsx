import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"

import { useWebSocket } from "@/context/SocketContext"

type ReadingProps = {
    title: string,
    data_reading: string,
    label: string,
}

export const Reading = (props: ReadingProps) => {
    const {isConnected, subscribe} = useWebSocket()
    const [dataReading, setData] = useState<number | null>(null)


    const textToShow = isConnected
    ? (dataReading !== null ? dataReading.toFixed(2) : "---")
    : "Not Connected!"

    useEffect(() => {
        const unsubReading = subscribe("probe_data", (payload) => {
            const value = payload?.[props.data_reading];
            if (value !== undefined) setData(value);
        });

        return () => unsubReading();
    }, [subscribe, props.data_reading]);

    console.log("isConnected:", isConnected)

    return (    
        <Card className="w-full flex flex-col gap-0 overflow-hidden">
            <CardHeader className="flex items-center border-b">
                <CardTitle className="text-center w-full">{props.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col items-center justify-center px-6 py-2 min-h-0">
                <p className="text-[clamp(1rem,8vmin,3rem)] text-center leading-none">{textToShow}</p>
                <p className="text-center">{props.label}</p>
            </CardContent>
        </Card>
    )
}