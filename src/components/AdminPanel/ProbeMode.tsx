import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select" 
import { useState } from "react"
import { useWebSocket } from "@/context/SocketContext"

export const ProbeMode = () => {
    const [probeMode, setProbeMode] = useState("field")
    const {isConnected, send} = useWebSocket()
    
    const handleModeChange = (value: string) => {
        setProbeMode(value)
        send("probe_mode", { "mode": value })
    }

    return (
        <Select disabled={!isConnected} value={probeMode} onValueChange={handleModeChange}>
            <SelectTrigger
                className="hidden w-[160px] rounded-lg sm:flex h-11"
                aria-label="Select a value"
            >
            <SelectValue placeholder="Last 5 Minutes" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
                <SelectItem value="field" className="rounded-lg">
                    Field Mode
                </SelectItem>
                <SelectItem value="test" className="rounded-lg">
                    Test Mode
                </SelectItem>
                <SelectItem value="drive" className="rounded-lg">
                    Driving Mode
                </SelectItem>
            </SelectContent>
        </Select>
    )
}
