"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { Area, AreaChart } from "recharts"
import CustomHook from "@/hooks/CustomHook"
import { tokenFromLocalStorage, userIdFromLocalStorage } from "@/global"

const chartData = [
    { browser: "pending", visitors: 210, fill: "var(--color-pending)" },
    { browser: "approved", visitors: 200, fill: "var(--color-approved)" },
    { browser: "rejected", visitors: 275, fill: "var(--color-rejected)" }
]

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    pending: {
        label: "pending",
        color: "#FEF9C2",
    },
    approved: {
        label: "approved",
        color: "#DBFCE7",
    },
    rejected: {
        label: "rejected",
        color: "#FFE2E2",
    }
} satisfies ChartConfig

export function ChartUser() {
    // for fetch the nameUser of user
    const { isLoading, data } = CustomHook({
        queryKey: ["userName"], url: `Applicants/GetApplicantByUserId/${userIdFromLocalStorage}`, config: {
            headers: {
                Authorization: `Bearer ${tokenFromLocalStorage}`,
            }
        }
    })

    return (
        <Card className="">
            <CardHeader>
                <CardTitle>{isLoading ? "Loading..." : data?.value?.fullName} - Active</CardTitle>
                <CardDescription>{isLoading ? "Loading..." : data?.value?.birthDate}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="browser"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) =>
                                chartConfig[value as keyof typeof chartConfig]?.label
                            }
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar
                            dataKey="visitors"
                            strokeWidth={2}
                            radius={8}
                            activeIndex={2}
                            activeBar={({ ...props }) => {
                                return (
                                    <Rectangle
                                        {...props}
                                        fillOpacity={0.8}
                                        stroke={props.payload.fill}
                                        strokeDasharray={4}
                                        strokeDashoffset={4}
                                    />
                                )
                            }}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total visitors for the last 6 months
                </div>
            </CardFooter>
        </Card>
    )
}

const chartDataTwo = [
    { month: "pending", desktop: 186, mobile: 80 },
    { month: "approved", desktop: 305, mobile: 200 },
    { month: "rejected", desktop: 237, mobile: 120 },
]

const chartConfigTwo = {
    desktop: {
        label: "Desktop",
        color: "green",
    },
    mobile: {
        label: "Mobile",
        color: "yellow",
    },
} satisfies ChartConfig

export function ChartUserTwo() {
    // for fetch the nameUser of user
    const { isLoading, data } = CustomHook({
        queryKey: ["userName"], url: `Applicants/GetApplicantByUserId/${userIdFromLocalStorage}`, config: {
            headers: {
                Authorization: `Bearer ${tokenFromLocalStorage}`,
            }
        }
    })
    return (
        <Card>
            <CardHeader>
                <CardTitle> {isLoading ? "Loading..." : data?.value?.fullName} - Stacked</CardTitle>
                <CardDescription>
                    Showing total visitors for the last 6 months
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfigTwo}>
                    <AreaChart
                        accessibilityLayer
                        data={chartDataTwo}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dot" />}
                        />
                        <Area
                            dataKey="mobile"
                            type="natural"
                            fill="var(--color-mobile)"
                            fillOpacity={0.4}
                            stroke="var(--color-mobile)"
                            stackId="a"
                        />
                        <Area
                            dataKey="desktop"
                            type="natural"
                            fill="var(--color-desktop)"
                            fillOpacity={0.4}
                            stroke="var(--color-desktop)"
                            stackId="a"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="flex items-center gap-2 leading-none text-muted-foreground">
                            {isLoading ? "Loading..." : data?.value?.birthDate}
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}
