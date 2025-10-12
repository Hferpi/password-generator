"use client"
import * as React from "react"
import { Lightbulb } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"
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

import { ViewAnalyticsChartsProps } from "./ViewAnalyticsCharts.types";



export function ViewAnalyticsCharts(props: ViewAnalyticsChartsProps) {
    const { creditCards, work, shopping, entreteniment, social } = props;
  
    const chartConfig = {
      creditCards: { label: "Credit Cards", color: "var(--chart-1)" },
      work: { label: "Work", color: "var(--chart-2)" },
      shopping: { label: "Shopping", color: "var(--chart-3)" },
      entreteniment: { label: "Entertainment", color: "var(--chart-4)" },
      social: { label: "Social", color: "var(--chart-5)" },
    } satisfies ChartConfig;
  
    const chartData = [
      { name: "Credit Cards", value: creditCards, fill: chartConfig.creditCards.color },
      { name: "Work", value: work, fill: chartConfig.work.color },
      { name: "Shopping", value: shopping, fill: chartConfig.shopping.color },
      { name: "Entertainment", value: entreteniment, fill: chartConfig.entreteniment.color },
      { name: "Social", value: social, fill: chartConfig.social.color },
    ];
  
    const totalPasswords = React.useMemo(() => {
      return creditCards + work + shopping + entreteniment + social;
    }, [creditCards, work, shopping, entreteniment, social]);
  
    return (
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Where is your password</CardTitle>
          <CardDescription>Segment your saved data</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalPasswords.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Passwords
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 leading-none font-medium">
          Did you know where all your passwords came from? <Lightbulb className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground leading-none">
          It is recommended to change them every 3 months
          </div>
        </CardFooter>
      </Card>
    );
  }
  
