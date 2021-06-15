import React,{useState} from 'react'
import { ComposedChart ,XAxis,Tooltip,CartesianGrid,YAxis,Legend,Bar,ResponsiveContainer,Line,Area} from "recharts";
const SalesNreturns = (props) => {

    

 console.log(props.vendas)
    return (
        <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={props.retornos}>
                <XAxis dataKey="mes" />
                <YAxis  allowDecimals={false} />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="retornos" stroke="#ff7300" />
                <Area type="monotone"  data={props.vendas} dataKey="vendas" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
            </ComposedChart>
        </ResponsiveContainer>
    )
}

export default SalesNreturns
