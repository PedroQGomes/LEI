import React,{useState} from 'react'
import { BarChart ,XAxis,Tooltip,CartesianGrid,YAxis,Legend,Bar,ResponsiveContainer,AreaChart,Area} from "recharts";
const SalesNreturns = (props) => {

    const [vendas, setvendas] = useState(()=>{
        if(props.vendas === null) {
            return []
        }

        if(props.vendas.length === 1){
            const Vendas = [];
            Vendas.push({
                datalc:0,
                vendas:0
            });
            Vendas.push(props.vendas[0])
            return Vendas;
        }
        return props.vendas;
    })

    const [retornos, setretornos] = useState(()=>{
        if(props.retornos === null) {
            return []
        }

        if(props.retornos.length === 1){
            const Retornos = [];
            Retornos.push({
                datalc:0,
                retornos:0
            });
            Retornos.push(props.retornos[0])
            return Retornos;
        }
        return props.retornos;

    })




    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart>
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
                <YAxis  allowDecimals={false} />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" data={vendas} dataKey="vendas" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                <Area type="monotone" data={retornos} dataKey="retornos" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
            </AreaChart>
        </ResponsiveContainer>
    )
}

export default SalesNreturns
