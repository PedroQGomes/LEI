import React from 'react'
import { BarChart ,XAxis,Tooltip,CartesianGrid,YAxis,Legend,Bar} from "recharts";
const Totalsales = (props) => {
    return (
        <BarChart width={800} height={300} data={props.vendas} barSize="1">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="datalc" />
            <YAxis allowDecimals={false}/>
            <Tooltip />
            <Legend />
            <Bar dataKey="ETT" fill="#1E5CC2" />
        </BarChart>
    )
}

export default Totalsales
