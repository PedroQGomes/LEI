import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Select, Box, Spinner } from "@chakra-ui/react"
import { DataGrid } from '@material-ui/data-grid';
import './css/inventory.css';
import SalesNreturns from '../components/charts/salesNreturns'
import Totalsales from '../components/charts/totalsales'


const Inventory = ({ match }) => {

    const [vendas, setvendas] = useState([])
    const [receita, setreceita] = useState([])
    const [stock, setstock] = useState([])
    const [tabledata, settabledata] = useState([])
    const [loading, setloading] = useState(true)
    const [anosvendas, setanosvendas] = useState(null)
    const [PVstock, setPVstock] = useState(null)
    const [OIstock, setOIstock] = useState(null)

    const [graphSalesData, setgraphSalesData] = useState([])
    const [graphReceitaData, setgraphReceitaData] = useState([])



    useEffect(() => {
        axios.get('/api/stock/store/' + match.params.code).then((res) => {
            setPVstock(null)
            setOIstock(null)
            setstock(res.data);
            settabledata(res.data);
            var canvas2 = document.getElementById('select-collection-of-stock');
            if (canvas2 !== null) {
                document.getElementById('select-collection-of-stock').value = "Todas"
            }
            setloading(false);
        }).catch((error) => {

            setloading(false);
        });

        axios.get('/api/sales/store/' + match.params.code).then((res) => {
            var canvas = document.getElementById('select-year-of-stores');
            if (canvas !== null && res.data.sales.length > 0) {
                document.getElementById('select-year-of-stores').value = res.data.sales[0].ano
            }



            var salesMap = new Map();
            for (var i = 0; i < res.data.sales.length; i++) {
                salesMap.set(res.data.sales[i].ano, res.data.sales[i].arr);
            }
            var receitaMap = new Map();
            for (var j = 0; j < res.data.totalsales.length; j++) {
                receitaMap.set(res.data.totalsales[j].ano, res.data.totalsales[j].arr);
            }
            setanosvendas(res.data.sales);
            setvendas(salesMap);

            setreceita(receitaMap);

            if (res.data.sales.length > 0) {
                setgraphSalesData(salesMap.get(res.data.sales[0].ano))
                setgraphReceitaData(receitaMap.get(res.data.sales[0].ano))
            }


            setloading(false);
        }).catch((error) => {
            console.log(error)

            setloading(false);
        });


    }, [match.params.code])


    const receitasHandler = (event) => {
        let val = parseInt(event.target.value);



        if (vendas.get(val) !== undefined) {
            setgraphSalesData(vendas.get(val));
        } else {
            setgraphSalesData([])
        }


        if (receita.get(val) !== undefined) {
            setgraphReceitaData(receita.get(val));
        } else {
            setgraphReceitaData([])
        }
    }

    const collectionStockHandler = (event) => {
        
        if(event.target.value === "PV"){
            if(PVstock === null){
                settabledata(stock.filter(PVCollectionStock))
            }else{
                settabledata(PVstock)
            }

        }else if(event.target.value === "OI"){
            if(OIstock === null){
                settabledata(stock.filter(OICollectionStock))
            }else{
                settabledata(OIstock)
            }
        }else{
            settabledata(stock)
        }
    }

    if (loading) {
        return (<Spinner className="loading" size="xl" color="red.500" />);
    }


    if (anosvendas === null) {
        return (
            <Spinner className="loading" size="xl" color="red.500" />
        );
    };


    return (
        <Box className="inventory-page-wrapper">

            <Box className="sales-store-datagrid-wrapper">
                <Box className="store-info-and-select-wrapper">
                    <Box className="store-text-title">
                        Loja {getNameFromCode(match.params.code)}
                    </Box>
                    <Box className="filter-and-select-wrapper">
                       
                            <Box className="store-select-and-text-wrapper">
                                <Box>
                                    Ano Selecionado :
                                </Box>
                                <Select id="select-year-of-stores" type="text" name='localidade' onChange={receitasHandler} required defaultValue={anosvendas[0].ano}>
                                    {anosvendas.map((tab, index) => {
                                        return (
                                            <option key={tab.ano} value={tab.ano}>{tab.ano}</option>
                                        )
                                    })}
                                </Select>
                            
                            </Box>

                            <Box className="collection-select-and-text-wrapper">
                                <Box>
                                    Esta????o Selecionada :
                                </Box>
                                <Select id="select-collection-of-stock" type="text" name='localidade' onChange={collectionStockHandler} required defaultValue="Todas">
                                    <option key={0} value="Todas">Todas</option>
                                    <option key={1} value="PV">PV</option>
                                    <option key={2} value="OI">OI</option>
                                </Select>
                            
                            </Box>

                       
                        
                    </Box>
                    

                </Box>
                <Box>
                    <Box className="store-graph-qtt-and-returns-wrapper">
                        <Box className="text-desc-graph">
                            Quantidade anual de vendas e retornos
                        </Box>
                        <SalesNreturns vendas={graphSalesData} />
                    </Box>

                </Box>
                <Box className="store-graph-receita-wrapper">
                    <Box className="text-desc-graph">
                        Receita anual gerada
                    </Box>
                    <Totalsales vendas={graphReceitaData} />
                </Box>
            </Box>
            <Box >
                <Box className="stock-store-datagrid-wrapper">
                    {stock ? <DataGrid rows={tabledata} columns={columns} pageSize={20} onRowDoubleClick={e => {  window.open("/item/" + e.id) }}/> : <div>
                        Sem Encomendas realizadas
                    </div>}


                </Box>
            </Box>

        </Box>
    )
}

function getNameFromCode(code) {
    code = parseInt(code);
    if (code === 9) {
        return 'Barcelos';
    }
    if (code === 10) {
        return 'Viana';
    }
    if (code === 11) {
        return 'Guimar??es';
    }
    if (code === 132) {
        return 'Santander';
    }
    if (code === 200) {
        return 'Leiria';
    }
    if (code === 201) {
        return 'Caldas';
    }
    return ''
}

const columns = [
    { field: 'id', headerName: 'Ref', width: 200 },
    { field: 'stock', headerName: 'Stock', width: 200 },
]

function PVCollectionStock(value) {
  return value.id.substring(0, 2) === "PV";
}

function OICollectionStock(value) {
  return value.id.substring(0, 2) === "OI";
}

export default Inventory
