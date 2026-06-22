
import { ProbeMode } from "./AdminPanel/ProbeMode";
import { SignalButtons } from "./AdminPanel/SignalButtons";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"



export const AdminBar = () => {
    return (
        <Card className="pt-0 w-full flex flex-col items-center">
           <CardHeader className="flex items-center border-b w-full pt-2">
                <CardTitle className="text-center w-full">Zephyr Command Panel</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-1 flex-row items-center justify-between px-6 py-2 min-h-0">
                <div className="w-1/2 flex justify-end pr-2">
                    <SignalButtons/>
                </div>
                <div className="w-1/2 flex justify-start pl-2">
                    <ProbeMode/>
                </div>
            </CardContent>
        </Card>
    )
}