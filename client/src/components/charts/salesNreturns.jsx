import React from 'react'
import { BarChart ,XAxis,Tooltip,CartesianGrid,YAxis,Legend,Bar,ResponsiveContainer} from "recharts";
const SalesNreturns = (props) => {

    return (
        <BarChart width={800} height={300} data={props.vendas}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="datalc" />
                <YAxis allowDecimals={false}/>
                <Tooltip />
                <Legend />
                <Bar dataKey="vendas" stackId="a" fill="#35AD1A" />
                <Bar dataKey="retornos"stackId="a"  fill="#EE0C0C" />
        </BarChart>
        
    )
}

export default SalesNreturns
