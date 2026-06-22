import { ButtonGroup } from "../ui/button-group";
import { Button } from "../ui/button";
import { useWebSocket } from "@/context/SocketContext";
import { toast } from "sonner"

export const SignalButtons = () => {

    const {isConnected, send} = useWebSocket()

    return (
        <ButtonGroup className="pr-1">
            <Button variant="outline" size={"lg"}
                onClick={() => {
                    if (isConnected) {
                        send("start_probe")
                    }
                    else {
                        toast("Cannot Start, The Probe Is Not Connected!")
                    }
                }}>
            Start Session
            </Button>
            <Button variant="outline" size={"lg"}
                onClick={() => {
                    if (isConnected) {
                        send("stop_probe")
                    }
                    else {
                        toast("Cannot Stop, The Probe Is Not Connected!")
                    }
                }}>
            Stop Session
            </Button>
        </ButtonGroup>
    )
}