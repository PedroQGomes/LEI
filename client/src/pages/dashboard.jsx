import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { Select} from "@chakra-ui/react"
import SalesNreturns from '../components/charts/salesNreturns'
import Totalsales from '../components/charts/totalsales'
import './css/dashboard.css';
import { BarChart ,XAxis,Tooltip,CartesianGrid,YAxis,Legend,Bar,AreaChart,Area,ResponsiveContainer} from "recharts";
const Dashboard = () => {

    const [receita, setreceita] = useState(null);
    const [vendas, setvendas] = useState(null);

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
        console.log(val)
        axios.get('/api/sales/year/'+ val).then((res) => {
                //console.log(res.data)
                setreceita(res.data.receita);
                setvendas(res.data.vendas);
                
        }).catch((error) => {
            //console.log(error)
        });
        
    }

    if(receita === null || vendas === null){
        return(
            <div>
             loading
        </div>
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
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="mes" />
                        <YAxis allowDecimals={false}/>
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
                                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                                        </linearGradient>
                                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="mes" />
                                    <YAxis  allowDecimals={false} />
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <Tooltip />
                                    <Legend />
                                    <Area type="monotone" data={vendas} dataKey="vendas" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                                    <Area type="monotone" dataKey="retornos" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
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
                     <option value="2021">2021</option>
                     <option value="2020">2020</option>
                     <option value="2019">2019</option>
                     <option value="2018">2018</option>
                </Select>
             </div> 
        </div>
        </div>
        
        
    )
}

export default Dashboard
