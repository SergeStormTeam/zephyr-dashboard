import { useEffect, useState } from "react"
import {AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { AreaLine, } from "./AreaLine"
import { useWebSocket } from "@/context/SocketContext"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select" 


const chartConfig = {
  temperature: {
    label: "Temperature (°C)",
    color: "#3b82f6",
  },  
  pressure: {
    label: "Pressure (hPa)",
    color: "#63508f",
  },
  wind_speed: {
    label: "Wind Speed (mph)",
    color: "#c485c4",
  },
  humidity: {
    label: "Humidity (RH)",
    color: "#2c218f",
  },
  wind_direction: {
    label: "Wind Direction (???)",
    color: "#436e1f",
  },
  co2: {
    label: "CO2 Levels (???)",
    color: "#5e1616",
  },
  voc: {
    label: "VOC Levels (???)",
    color: "#d45b2b",
  },
} satisfies ChartConfig

const HOURS = 24
const MINUTES = 60
const SECONDS = 60

let secondsToSubtract: number = 90 * HOURS * MINUTES * SECONDS

type DataPoint = {
  timestamp: number,
  temperature: number | null,
  pressure: number | null,
  wind_speed: number | null,
  humidity: number | null,
  wind_direction: number | null,
  co2: number | null,
  voc: number | null,
}

export function ChartAreaInteractive() {
	const [chartData, setChartData] = useState<DataPoint[]>([])
	const [timeRange, setTimeRange] = useState("5m")
	const {subscribe} = useWebSocket()

	const now = Math.floor(Date.now() / 1000)

	let tagDisplay = "90 days"

	const filteredData = chartData.filter((item) => {
		if (timeRange === "1m") {
			secondsToSubtract = MINUTES
			tagDisplay = "1 minute"
		} else if (timeRange === "3m") {
			secondsToSubtract = 3 * MINUTES
			tagDisplay = "3 minutes"
		} else if (timeRange === "5m") {
			secondsToSubtract = 5 * MINUTES
			tagDisplay = "5 minutes"
		} else if (timeRange === "10m") {
			secondsToSubtract = 10 * MINUTES
			tagDisplay = "10 minutes"
		} else if (timeRange === "30m") {
			secondsToSubtract = 30 * MINUTES
			tagDisplay = "30 minutes"
		} else if (timeRange === "60m") {
			secondsToSubtract = 60 * MINUTES
			tagDisplay = "1 hour"
		}

		return item.timestamp >= now - secondsToSubtract
	})

	useEffect(() => {
		const unsubData = subscribe("probe_data", (payload) => {
			if (payload) {
				setChartData(prev => [...prev.slice(-5000), payload])
			}
		})

		return () => {
			unsubData()
		}
	})

    return (
        <Card className="pt-0 h-full w-full flex flex-col">
            
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1">
                    <CardTitle>Probe Data</CardTitle>
                    <CardDescription>
                        Showing probew data for the last {tagDisplay}.
                    </CardDescription>
                </div>

                <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger
                        className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
                        aria-label="Select a value"
                    >
                    <SelectValue placeholder="Last 5 Minutes" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="1m" className="rounded-lg">
                            Last Minute
                        </SelectItem>
                        <SelectItem value="3m" className="rounded-lg">
                            Last 3 Minutes
                        </SelectItem>
                        <SelectItem value="5m" className="rounded-lg">
                            Last 5 Minutes
                        </SelectItem>
                         <SelectItem value="10m" className="rounded-lg">
                            Last 10 Minutes
                        </SelectItem>
                    </SelectContent>
                </Select>

            </CardHeader>

        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6 flex flex-col flex-1 min-h-0 ">
            <ChartContainer
                config={chartConfig}
                className="aspect-auto h-full w-full" min-h-0
            >
                <AreaChart data={filteredData}>
                    <defs>

                    {/* <GraphGradient id="temperature"/>
                    <GraphGradient id="pressure"/>
                    <GraphGradient id="humidity"/>


                    <GraphGradient id="co2"/>
                    <GraphGradient id="voc"/>

                    <GraphGradient id="wind_speed"/>
                    <GraphGradient id="wind_direction"/>
                    <GraphGradient id="precipitation"/> */}

                    </defs>
                    <CartesianGrid vertical={false} />

                    <XAxis
                        dataKey="timestamp"
                        type="number"
                        scale="time"
                        domain={["dataMin", "dataMax"]}
                        tickFormatter={(value) =>
                            new Date(value * 1000).toLocaleTimeString([], {
                                hour: "numeric",
                                minute: "2-digit",
                            })
                        }
                    />
                    <YAxis yAxisId="temperature" />
                    <YAxis yAxisId="pressure" orientation="right" />
                    <ChartTooltip
                        cursor={false}
                        content={
                            <ChartTooltipContent
                            labelFormatter={(value) => {
                                return new Date(value * 1000).toLocaleTimeString([], {
                                    hour: "numeric",
                                    minute: "2-digit",
                                })
                            }}
                            indicator="dot"
                            />
                        }
                    />
                    <AreaLine id="temperature"/>
                    <AreaLine id="pressure"/>
                    <AreaLine id="humidity"/>


                    <AreaLine id="co2"/>
                    <AreaLine id="voc"/>

                    <AreaLine id="wind_speed"/>
                    <AreaLine id="wind_direction"/>
                    <AreaLine id="precipitation"/>          
                              
                    <ChartLegend content={<ChartLegendContent />} />
                </AreaChart>
            </ChartContainer>
        </CardContent>
    </Card>
  )
}