import { ChartAreaInteractive } from "./Graph/DashboardGraph"
import { Header } from "./Header"

export const Dashboard = () => {
    return (
        <div className="h-screen flex flex-col">
            <div className="flex flex-row w-full p-4 border">
                <Header/>
            </div>
            <div className="flex flex-row w-full flex-1 p-6">
                <div className="flex justify-between items-center w-full">
                    {/* <SignalButtons></SignalButtons>
                    <SignalButtons></SignalButtons> */}
                </div>
            </div>
            <div className="flex-1 p-6 min-h-0">
                <div className="h-full w-full">
                    <ChartAreaInteractive />
                </div>
            </div>
        </div>
    )
}