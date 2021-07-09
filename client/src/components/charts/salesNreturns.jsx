import React from 'react'
import { ComposedChart, XAxis, Tooltip, CartesianGrid, YAxis, Legend, ResponsiveContainer, Line, Area } from "recharts";
const SalesNreturns = (props) => {


    if (props.vendas.length === 0) {
        var tmp = [{ mes: 1, vendas: 0, retornos: 0 }, { mes: 2, vendas: 0, retornos: 0 }, { mes: 3, vendas: 0, retornos: 0 }, { mes: 4, vendas: 0, retornos: 0 }, { mes: 5, vendas: 0, retornos: 0 }, { mes: 6, vendas: 0, retornos: 0 },
        { mes: 7, vendas: 0, retornos: 0 }, { mes: 8, vendas: 0, retornos: 0 }, { mes: 9, vendas: 0, retornos: 0 }, { mes: 10, vendas: 0, retornos: 0 }, { mes: 11, vendas: 0, retornos: 0 }, { mes: 12, vendas: 0, retornos: 0 }
        ];
        return (
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={tmp}>
                    <XAxis dataKey="mes" />
                    <YAxis allowDecimals={false} />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="vendas" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                    <Line type="monotone" dataKey="retornos" stroke="#ff7300" />

                </ComposedChart>
            </ResponsiveContainer>
        )

    }

    return (
        <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={props.vendas}>
                <XAxis dataKey="mes" />
                <YAxis allowDecimals={false} />
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
