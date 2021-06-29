import React,{useState} from 'react'
import { ComposedChart ,XAxis,Tooltip,CartesianGrid,YAxis,Legend,Bar,ResponsiveContainer,Line,Area} from "recharts";
const SalesNreturns = (props) => {

    

 //console.log(props.vendas)
    return (
        <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={props.vendas}>
                <XAxis dataKey="mes" />
                <YAxis  allowDecimals={false} />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="vendas" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                <Line type="monotone" dataKey="retornos" stroke="#ff7300" />
                
            </ComposedChart>
        </ResponsiveContainer>
    )
}

export default SalesNreturns
