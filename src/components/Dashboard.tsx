import { ChartAreaInteractive } from "./Graph/ProbeGraph"
import { Reading } from "./Reading"
import { Header } from "./Header"
import { AdminBar } from "./AdminBar"

export const Dashboard = () => {
    return (
        <div className="h-screen grid grid-rows-[auto_auto_minmax(0,1fr)_minmax(0,1fr)]">
            <div className="flex flex-row w-full p-[1vh] border">
                <Header/>
            </div>
            <div className="flex flex-row w-full p-[1vh] justify-center items-center pt-[4vh] gap-4">                
                <div className="w-1/2 flex flex-row justify-between items-center">
                    <AdminBar/>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-[1vh] p-[2vh] min-h-0">
                <Reading title="Temperature"    data_reading="temperature"      label="Celsius"/>
                <Reading title="Humidity"       data_reading="humidity"         label="Relative Humidity"/>
                <Reading title="Pressure"       data_reading="pressure"         label="Barometric Pressure"/>
                <Reading title="Wind Speed"     data_reading="wind_speed"       label="MPH"/>
                <Reading title="Wind Direction" data_reading="wind_direction"   label="???"/>
                <Reading title="Precipitation"  data_reading="precipitation"    label="???"/>
                <Reading title="CO2"            data_reading="co2"              label="Parts Per Million"/>
                <Reading title="VOC"            data_reading="voc"              label="Parts Per Billion"/>
            </div>
            <div className="p-[2vh] min-h-0 overflow-hidden">
                <div className="h-full w-full min-h-0">
                    <ChartAreaInteractive />
                </div>
            </div>
        </div>
    )
}