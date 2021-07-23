import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './css/item.css';
import { Image, Box, Spinner, Select, Table, Thead, Tr, Th, Td, Tbody } from "@chakra-ui/react"
import SalesNreturns from '../components/charts/salesNreturns'
import Totalsales from '../components/charts/totalsales'
import StockTabs from '../components/Tabs/StockTabs'
import TableInfo from '../components/Table/TableInfo'
import ErrorMessage from '../components/messages/ErrorMessage';
import { Scrollbars }  from 'react-custom-scrollbars'

const Item = ({ match }) => {

    const [artigo, setartigo] = useState(null);
    const [vendas, setvendas] = useState(null);
    const [lucro, setlucro] = useState(null);
    const [topVendas, settopVendas] = useState(null);
    const [anosvendas, setanosvendas] = useState(null);

    const [storeSales, setstoreSales] = useState(new Map())
    const [storeReceita, setstoreReceita] = useState(new Map())
    const [yearSales, setyearSales] = useState(0);
    const [selectedStore, setselectedStore] = useState(0);

    const [stockLoading, setstockLoading] = useState(false);
    const [salesLoading, setsalesLoading] = useState(false);


    const [graphSalesData, setgraphSalesData] = useState([])
    const [graphReceitaData, setgraphReceitaData] = useState([])


    useEffect(() => {
        setstockLoading(true);
        setsalesLoading(true);
        axios.get('/api/stock/' + match.params.id + "/fullstats").then((res) => {
            setartigo(res.data);
            setstockLoading(false);
        }).catch((error) => {
            //console.log(error)
            setstockLoading(false);
            setartigo(null);
        });


        axios.get('/api/sales/' + match.params.id).then((res) => {
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
            setlucro(receitaMap);
            settopVendas(res.data.topvendas);


            if (res.data.sales.length > 0) {
                setyearSales(res.data.sales[0].ano);
                setgraphSalesData(salesMap.get(res.data.sales[0].ano))
                setgraphReceitaData(receitaMap.get(res.data.sales[0].ano))
            }

            setsalesLoading(false);

        }).catch((error) => {
            //console.log(error)
            setvendas([]);
            setlucro([]);
            setsalesLoading(false);
        });

    }, [])



    const receitasHandler = (event) => {
        let val = parseInt(event.target.value);
        setyearSales(val);
        if (selectedStore === 0) {
            if (vendas.get(val) !== undefined) {
                setgraphSalesData(vendas.get(val));
            } else {
                setgraphSalesData([])
            }

            if (lucro.get(val) !== undefined) {
                setgraphReceitaData(lucro.get(val));
            } else {
                setgraphReceitaData([])
            }
        } else {
            if (storeSales.get(selectedStore).get(val) === undefined) {
                setgraphSalesData([]);
            } else {
                setgraphSalesData(storeSales.get(selectedStore).get(val));
            }
            if (storeReceita.get(selectedStore).get(val) === undefined) {
                setgraphReceitaData([]);
            } else {
                setgraphReceitaData(storeReceita.get(selectedStore).get(val));
            }

        }


    }

    const handleloja = (event) => {
        let val = parseInt(event.target.value);
        setselectedStore(val);
        if (val === 0) {
            if (vendas.get(yearSales) !== undefined) {

                setgraphSalesData(vendas.get(yearSales));
            } else {
                setgraphSalesData([])
            }

            if (lucro.get(yearSales) !== undefined) {
                setgraphReceitaData(lucro.get(yearSales));
            } else {
                setgraphReceitaData([])
            }
            return;
        }

        if (storeSales.get(val) === undefined) {
            axios.get('/api/sales/' + artigo.info.ref + "/store/" + val).then((res) => {
                console.log(res.data)
                var salesMap = new Map();
                for (var i = 0; i < res.data.sales.length; i++) {
                    salesMap.set(res.data.sales[i].ano, res.data.sales[i].arr);
                }
                var receitaMap = new Map();
                for (var j = 0; j < res.data.totalsales.length; j++) {
                    receitaMap.set(res.data.totalsales[j].ano, res.data.totalsales[j].arr);
                }




                storeSales.set(val, salesMap);
                storeReceita.set(val, receitaMap)
                setstoreSales(storeSales);
                setstoreReceita(storeReceita);

                if (salesMap.get(yearSales) === undefined) {
                    setgraphSalesData([]);
                } else {
                    setgraphSalesData(salesMap.get(yearSales));

                }
                if (receitaMap.get(yearSales) === undefined) {
                    setgraphReceitaData([]);
                } else {

                    setgraphReceitaData(receitaMap.get(yearSales));
                }

            }).catch((error) => {
                console.log(error)
            });
        } else {
            if (storeSales.get(val).get(yearSales) === undefined) {
                setgraphSalesData([]);
            } else {
                setgraphSalesData(storeSales.get(val).get(yearSales));
            }
            if (storeReceita.get(val).get(yearSales) === undefined) {
                setgraphReceitaData([]);
            } else {
                setgraphReceitaData(storeReceita.get(val).get(yearSales));
            }
        }

    };




    if (stockLoading === true || salesLoading === true) {
        return (
            <Spinner className="loading" size="xl" color="red.500" />
        );
    };


    if (artigo === null) {
        return (
            <div marginTop="40vh" marginleft="30vw">
                <ErrorMessage message="Artigo inexistente" />
            </div>
        );
    };




    return (
        <Box>
            <Box className="first-half-item-fullstats" >
                <Box className="first-half-item-FirstTextBox" >
                    <TableInfo artigo={artigo.info} totalStock={artigo.totalStock} size="sm" fornecedor={true} />
                </Box>
                <Box className="first-half-image">
                    <Image src={process.env.PUBLIC_URL + artigo.info.imagem.substring(13)} fallbackSrc={process.env.PUBLIC_URL + "/No_image_available.png"} />
                </Box>


                <Box className="first-half-item-SecondTextBox" overflowY="auto">
                    {artigo.stock.length !== 0 ?<Scrollbars autoHide autoHideTimeout={500} autoHideDuration={200}> <StockTabs stock={artigo.stock} /> </Scrollbars> : <Box marginTop="10vh">
                        <ErrorMessage message="Artigo sem stock" />
                    </Box>}


                </Box>
            </Box>


            <Box className="second-half-sales-statistics">
                <Box overflowY="auto" className="second-half-1st-box" borderWidth="2px" borderRadius="lg" >
                    <Scrollbars autoHide autoHideTimeout={500} autoHideDuration={200}>
                    <Table size="x-sm" variant="simple" className="tabela-top-vendas" >
                        <Thead>
                            <Tr>
                                <Th>Tam</Th>
                                <Th>Cor</Th>
                                <Th isNumeric>Vendas</Th>
                            </Tr>
                        </Thead>
                        
                        {(topVendas.length !== 0) ?
                            <Tbody>
                                {topVendas.map((tab, index) => (formatTopVendasEntry(topVendas[index])))}
                            </Tbody> : <Tbody>
                            </Tbody>}
                    </Table>
                    </Scrollbars>
                </Box>
                <Box className="second-half-2st-box" borderWidth="2px" borderRadius="lg" >
                    <Box>
                        <Box className="select-year-and-loja-wrapper">
                            <Box>
                                <Box className="select-year-text-item">
                                    Ano Selecionado:
                                </Box>
                                <Box className="select-item">
                                    <Select id="grid-cidade" type="text" name='localidade' onChange={receitasHandler} required>
                                        {anosvendas.map((tab, index) => {
                                            return (
                                                <option key={anosvendas[index].ano} value={anosvendas[index].ano}>{anosvendas[index].ano}</option>
                                            )
                                        })}
                                    </Select>

                                </Box>
                            </Box>


                            <Box className="select-store-box-wrapper ">
                                <Box className="select-stor-text-item">
                                    Loja Selecionada:
                                </Box>
                                <div className="select-store">
                                    <Select id="grid-cidade" type="text" name='localidade' onChange={handleloja} required>
                                        <option key={0} value={0}>Todas</option>
                                        <option key={9} value={9}>Barcelos</option>
                                        <option key={10} value={10}>Viana</option>
                                        <option key={11} value={11}>Guimarães</option>
                                        <option key={900} value={900}>Online</option>
                                        <option key={132} value={132}>Santander</option>
                                        <option key={200} value={200}>Leiria</option>
                                        <option key={201} value={201}>Caldas</option>
                                    </Select>
                                </div>


                            </Box>


                        </Box>

                        <Box className="sales-graphs-wrapper">
                            <Box className="second-half-sales-return-graph">
                                <Box className="text-desc-graph">
                                    Quantidade anual de vendas e retornos
                                </Box>
                                <SalesNreturns vendas={graphSalesData} />
                            </Box>


                            <Box className="second-half-sales-graph">
                                <Box className="text-desc-graph">
                                    Receita anual gerada
                                </Box>
                                <Totalsales vendas={graphReceitaData} />
                            </Box>
                        </Box>

                    </Box>

                </Box>

            </Box>


        </Box >
    )
}


const formatTopVendasEntry = (entry) => {

    return (
        <Tr key={entry.tam + entry.cor}>
            <Td>{entry.tam}</Td>
            <Td>{entry.cor}</Td>
            <Td isNumeric>{entry.qtt}</Td>
        </Tr>
    )
}





export default Item