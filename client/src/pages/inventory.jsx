import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { Select,Box,Textarea ,Input,Button,NumberInputField,NumberInput,NumberInputStepper,NumberIncrementStepper,Divider,Alert,AlertIcon} from "@chakra-ui/react"
import { DataGrid } from '@material-ui/data-grid';
import './css/inventory.css';
import SalesNreturns from '../components/charts/salesNreturns'
import Totalsales from '../components/charts/totalsales'


const Inventory = () => {

    const [vendas, setvendas] = useState([])
    const [retornos, setretornos] = useState([]);
    const [receita, setreceita] = useState([])
    const [stock, setstock] = useState([])
    const [loading, setloading] = useState(true)
    const [salesYear, setsalesYear] = useState(0);
    
    const [graphSalesData, setgraphSalesData] = useState([])
    const [graphReturnsData, setgraphReturnsData] = useState([])
    const [graphReceitaData, setgraphReceitaData] = useState([])
    

    useEffect(() => {
        axios.get('/api/stock/store/200').then((res) => {
            setstock(res.data);
            setloading(false);
        }).catch((error) => {
            
            setloading(false);
        });

        axios.get('/api/sales/store/200').then((res) => {
            setvendas(res.data.sales);
            setretornos(res.data.retornos);
            setreceita(res.data.totalsales);

            if(res.data.sales.length > 0){
                setgraphSalesData(res.data.sales[0].arr)
            }
            if(res.data.retornos.length > 0){
                setgraphReturnsData(res.data.retornos[0].arr)
            }
            if(res.data.totalsales.length > 0){
                setgraphReceitaData(res.data.totalsales[0].arr)
            }

            setloading(false);
        }).catch((error) => {
          
            setloading(false);
        });


    }, [])


    const receitasHandler = (event) => {
        let val = parseInt(event.target.value);

        
        if(val < vendas.length ){
            setgraphSalesData(vendas[val].arr);
        }else{
            setgraphSalesData([])
        }

        if(val < retornos.length){
            setgraphReturnsData(retornos[val].arr);
        }else{
            setgraphReturnsData([])
        }

        if(val < receita.length){
            setgraphReceitaData(receita[val].arr);
        }else{
            setgraphReceitaData([])
        }
        
    }



    return (
        <Box className="inventory-page-wrapper">
            
            <Box className="sales-store-datagrid-wrapper">
                <Box className="store-info-and-select-wrapper">
                    <Box className="store-text-title">
                        Loja Barcelos
                    </Box>
                    <Box className="store-select-and-text-wrapper">
                        <Box>
                            Ano Selecionado :
                        </Box>
                        <Select id="grid-cidade" type="text" name='localidade' onChange={receitasHandler} required>
                                        {vendas.map((tab,index) => {
                                            return(
                                                <option value={index}>{vendas[index].ano}</option>
                                            )
                                        })}
                        </Select> 
                    </Box>
                    
                </Box>
                <Box>
                    {retornos[salesYear] ?
                            
                            <Box className="store-graph-qtt-and-returns-wrapper">
                                <Box className="text-desc-graph">
                                    Quantidade anual de vendas e retornos    
                                </Box>
                                <SalesNreturns vendas={graphSalesData} retornos={graphReturnsData} />
                            </Box> : 
                            
                            <Box className="store-graph-qtt-and-returns-wrapper">
                                <Box className="text-desc-graph">
                                    Quantidade anual de vendas e retornos    
                                </Box>
                                <SalesNreturns vendas={graphSalesData} retornos={[]} />
                            </Box>
                    }
                    
                </Box>
                <Box className="store-graph-receita-wrapper">
                    <Box className="text-desc-graph">
                                    Receita anual gerada   
                    </Box>
                      <Totalsales vendas={graphReceitaData}/>
                </Box>
            </Box>
            <Box >
                <Box className="stock-store-datagrid-wrapper">
                {stock ? <DataGrid rows={stock} columns={columns} pageSize={20} />: <div>
                    Sem Encomendas realizadas
                </div>}
                
                
                </Box>
            </Box>

        </Box>
    )
}

const columns = [
  { field: 'id', headerName: 'Ref', width: 200 },
  { field: 'stock', headerName: 'Stock', width: 200 },
]


export default Inventory
