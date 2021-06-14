import React,{useState} from 'react'
import { ComposedChart ,XAxis,Tooltip,CartesianGrid,YAxis,Legend,Bar,ResponsiveContainer,Line,Area} from "recharts";
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
            <ComposedChart data={retornos}>
                <XAxis dataKey="mes" />
                <YAxis  allowDecimals={false} />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="retornos" stroke="#ff7300" />
                <Area type="monotone"  data={vendas} dataKey="vendas" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
            </ComposedChart>
        </ResponsiveContainer>
    )
}

export default SalesNreturns
