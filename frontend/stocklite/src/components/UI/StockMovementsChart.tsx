import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
Legend,
} from "recharts";

interface StockMovement {
    date: string;
    entries: number;
    exits: number;
}

interface Props {
    data: StockMovement[];
}

function StockMovementsChart({ data }: Props) {

    return ( 
        <div className="h-95 w-full"> 
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{top: 10, right: 15, left: 0, bottom: 5}}
                > 
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#e5e7eb"
                    />

                    <XAxis
                        dataKey="date"
                        tick={{ fontSize: 11 }}
                    />

                    <YAxis
                        allowDecimals={false}
                        tick={{ fontSize: 11 }}
                    />

                    <Tooltip />
                    <Legend
                        verticalAlign="top"
                        align="right"
                        iconType="circle" />

                    <Line
                        type="monotone"
                        dataKey="entries"
                        name="Entrées"
                        stroke="#16a34a"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                    />

                    <Line
                        type="monotone"
                        dataKey="exits"
                        name="Sorties"
                        stroke="#ef4444"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
export default StockMovementsChart;
