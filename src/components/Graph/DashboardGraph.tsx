import { useState } from "react"

import {AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { GraphGradient, } from "./Gradient"
import { AreaLine, } from "./AreaLine"

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

export const description = "An interactive area chart"

const generateChartData = ({
  days = 60,
  intervalSeconds = 3600, // 1 hour (change to 86400 for daily)
} = {}) => {
  const now = Math.floor(Date.now() / 1000);
  const points = Math.floor((days * 86400) / intervalSeconds);

  let temp = 72;
  let pressure = 1013.5;
  let humidity = 50;
  let windSpeed = 8;
  let windDir = 240;
  let co2 = 430;
  let voc = 110;

  const chartData = [];

  for (let i = points - 1; i >= 0; i--) {
    const timestamp = now - i * intervalSeconds;

    // simulate occasional sensor dropout
    const isNull = Math.random() < 0.03;

    // slow realistic drift + noise
    temp += (Math.random() - 0.5) * 0.6;
    pressure += (Math.random() - 0.5) * 0.2;
    humidity += (Math.random() - 0.5) * 0.8;
    windSpeed = Math.max(0, windSpeed + (Math.random() - 0.5) * 1.2);
    windDir = (windDir + (Math.random() - 0.5) * 10 + 360) % 360;
    co2 += (Math.random() - 0.5) * 3;
    voc += (Math.random() - 0.5) * 2;

    chartData.push({
      timestamp,
      temperature: isNull ? null : +temp.toFixed(1),
      pressure: isNull ? null : +pressure.toFixed(1),
      wind_speed: isNull ? null : +windSpeed.toFixed(1),
      humidity: isNull ? null : +humidity.toFixed(1),
      wind_direction: isNull ? null : Math.round(windDir),
      co2: isNull ? null : Math.round(co2),
      voc: isNull ? null : Math.round(voc),
    });
  }

  return chartData;
};

// usage
const chartData = generateChartData({ days: 60, intervalSeconds: 3600 });


const chartConfig = {
  visitors: {
    label: "Visitors",
  },

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

export function ChartAreaInteractive() {
  const [timeRange, setTimeRange] = useState("90d")
    
  const now = Math.floor(Date.now() / 1000)

  let tagDisplay = "90 days"
  
  const filteredData = chartData.filter((item) => {
    if (timeRange === "30d") {
      secondsToSubtract = 30 * HOURS * MINUTES * SECONDS
      tagDisplay = "30 days"
    } else if (timeRange === "7d") {
      secondsToSubtract = 7 * HOURS * MINUTES * SECONDS
      tagDisplay = "7 days"
    }

    return item.timestamp >= now - secondsToSubtract
  })

    return (
        <Card className="pt-0 h-full w-full">
            
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1">
                    <CardTitle>Probe Data</CardTitle>
                    <CardDescription>
                        Showing total visitors for the last {tagDisplay}.
                    </CardDescription>
                </div>
                <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger
                        className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
                        aria-label="Select a value"
                    >
                    <SelectValue placeholder="Last 3 months" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="90d" className="rounded-lg">
                            Last 3 months
                        </SelectItem>
                    <SelectItem value="30d" className="rounded-lg">
                        Last 30 days
                    </SelectItem>
                    <SelectItem value="7d" className="rounded-lg">
                        Last 7 days
                    </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>

        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6 flex flex-col flex-1 min-h-0">
            <ChartContainer
                config={chartConfig}
                className="aspect-auto h-full w-full"
            >
                <AreaChart data={filteredData}>
                    <defs>

                    <GraphGradient id="temperature"/>
                    <GraphGradient id="pressure"/>
                    <GraphGradient id="humidity"/>


                    <GraphGradient id="co2"/>
                    <GraphGradient id="voc"/>

                    <GraphGradient id="wind_speed"/>
                    <GraphGradient id="wind_direction"/>
                    <GraphGradient id="precipitation"/>

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