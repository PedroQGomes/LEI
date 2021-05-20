import React from 'react'
import { BarChart ,XAxis,Tooltip,CartesianGrid,YAxis,Legend,Bar,ResponsiveContainer} from "recharts";
const SalesNreturns = (props) => {

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={props.vendas} >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="datalc" />
                <YAxis allowDecimals={false}/>
                <Tooltip />
                <Legend />
                <Bar dataKey="vendas" stackId="a" fill="#35AD1A" />
                <Bar dataKey="retornos"stackId="a"  fill="#EE0C0C" />
            </BarChart>
        </ResponsiveContainer>
    )
}

export default SalesNreturns
