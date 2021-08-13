import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Select, Spinner } from "@chakra-ui/react"
import './css/dashboard.css';
import { XAxis, Tooltip, CartesianGrid, YAxis, Legend, AreaChart, Area, ResponsiveContainer } from "recharts";

const Dashboard = () => {

    const [receita, setreceita] = useState(null);
    const [vendas, setvendas] = useState(null); 
    const [years, setyears] = useState(()=>{
        var atual = new Date();
        var arr = [];
        for(var i = atual.getFullYear(); i > 2019  ; i--){
            arr.push(i);
        }
        return arr;
    })
    useEffect(() => {
        axios.get('/api/sales/year/2021').then((res) => {
            //console.log(res.data)
            setreceita(res.data.receita);
            setvendas(res.data.vendas);

        }).catch((error) => {
            //console.log(error)
        });

    }, []);


    const myChangeHandler = (event) => {
        let val = parseInt(event.target.value);
        //console.log(val)
        axios.get('/api/sales/year/' + val).then((res) => {
            //console.log(res.data)
            setreceita(res.data.receita);
            setvendas(res.data.vendas);

        }).catch((error) => {
            //console.log(error)
        });
    }

    if (receita === null || vendas === null) {
        return (
            <Spinner className="loading" size="xl" color="red.500" />
        )
    }


    return (
        <div>
            <div className="title-dashboard">
                Graficos de Receitas e Vendas anuais
            </div>
            <div className="graphs-and-selected-wrapper">
                <div>
                    <div className="graph-receitas-year">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={receita}>
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
                    </div>
                    <div className="graph-receitas-year">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart>
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
                                <Area type="monotone" data={vendas} dataKey="vendas" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="select-year-box-dashboard">
                    <div className="select-year-text-dashboard">
                        Ano Selecionado
                    </div>
                    <Select id="grid-cidade" type="text" name='localidade' onChange={myChangeHandler} required>
                        <option value="" disabled>Selecione uma opção</option>
                        {years.map((ano,index)=>{
                            return (
                                <option key={index} value={ano}>{ano}</option>)
                        })}
                    </Select>
                </div>
            </div>
        </div>


    )
}

export default Dashboard
