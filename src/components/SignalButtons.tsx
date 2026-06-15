import { ButtonGroup } from "./ui/button-group";
import { Button } from "./ui/button";
import { toast } from "sonner"

export const SignalButtons = () => {
    return (
        <ButtonGroup>
            <Button variant="outline" size={"lg"}
                onClick={() =>
                    toast("Event has been created", {
                    description: "Sunday, December 03, 2023 at 9:00 AM",
                    action: {
                        label: "Undo",
                        onClick: () => console.log("Undo"),
                    },
                })
            }>
            Start Session
            </Button>
            <Button variant="outline" size={"lg"}
                onClick={() =>
                    toast("Event has been created", {
                    description: "Sunday, December 03, 2023 at 9:00 AM",
                    action: {
                        label: "Undo",
                        onClick: () => console.log("Undo"),
                    },
                })
            }>
            Stop Session
            </Button>
        </ButtonGroup>
    )
}