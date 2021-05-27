import React from 'react'
import { BarChart ,XAxis,Tooltip,CartesianGrid,YAxis,Legend,Bar,AreaChart,Area,ResponsiveContainer} from "recharts";
const Totalsales = (props) => {

    if(props.vendas.length > 1){
        return(
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={props.vendas}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="datalc" />
                    <YAxis allowDecimals={false}/>
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="ETT" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                </AreaChart>
        </ResponsiveContainer>
        )
    }



    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={props.vendas}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="datalc" />
                <YAxis allowDecimals={false}/>
                <Tooltip />
                <Legend />
                <Bar dataKey="ETT" fill="#1E5CC2" />
            </BarChart>
        </ResponsiveContainer>
    )
}



export default Totalsales
