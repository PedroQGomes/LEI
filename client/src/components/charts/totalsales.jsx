import React from 'react'
import { BarChart, XAxis, Tooltip, CartesianGrid, YAxis, Legend, Bar, AreaChart, Area, ResponsiveContainer } from "recharts";
const Totalsales = (props) => {

    if (props.vendas.length === 0) {
        var tmp = [{ mes: 1, receita: 0 }, { mes: 2, receita: 0 }, { mes: 3, receita: 0 }, { mes: 4, receita: 0 }, { mes: 5, receita: 0 }, { mes: 6, receita: 0 },
        { mes: 7, receita: 0 }, { mes: 8, receita: 0 }, { mes: 9, receita: 0 }, { mes: 10, receita: 0 }, { mes: 11, receita: 0 }, { mes: 12, receita: 0 }
        ];
        return (
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={tmp}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="mes" />
                    <YAxis allowDecimals={false} />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="receita" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                </AreaChart>
            </ResponsiveContainer>
        )

    }


    if (props.vendas.length > 1) {
        return (
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={props.vendas}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="mes" />
                    <YAxis allowDecimals={false} />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="receita" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                </AreaChart>
            </ResponsiveContainer>
        )
    }



    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={props.vendas}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="receita" fill="#1E5CC2" />
            </BarChart>
        </ResponsiveContainer>
    )
}



export default Totalsales
