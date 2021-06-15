import React,{useEffect,useState} from 'react'
import { useLocation } from "react-router-dom";
import axios from 'axios';
import './css/item.css';
import { Image,Box,Stack,Select,tab,Table,Thead,Tr,Th,Td,Tbody} from "@chakra-ui/react"
import SalesNreturns from '../components/charts/salesNreturns'
import Totalsales from '../components/charts/totalsales'
import StockTabs from '../components/Tabs/StockTabs'
import TableInfo from '../components/Table/TableInfo'
import moment from 'moment';

const Item = ({ match }) => {
    
    const [artigo, setartigo] = useState(null);
    const [vendas, setvendas] = useState(null);
    const [retornos, setretornos] = useState(null);
    const [lucro, setlucro] = useState(null);
    const [topVendas, settopVendas] = useState(null);

    const [stockLoading, setstockLoading] = useState(false);
    const [salesLoading, setsalesLoading] = useState(false);
    const [salesYear, setsalesYear] = useState(0);

    const [graphSalesData, setgraphSalesData] = useState([])
    const [graphReturnsData, setgraphReturnsData] = useState([])
    const [graphReceitaData, setgraphReceitaData] = useState([])


    useEffect(() => {
        setstockLoading(true);
        setsalesLoading(true);
        axios.get('/api/stock/'+ match.params.id + "/fullstats").then((res) => {
            setartigo(res.data);
            setstockLoading(false);
        }).catch((error) => {
            //console.log(error)
            setstockLoading(false);
            setartigo(null);
        });

        axios.get('/api/sales/'+ match.params.id).then((res) => {

            setvendas(res.data.sales);
            setretornos(res.data.retornos);
            setlucro(res.data.totalsales);
            settopVendas(res.data.topvendas);
            
            if(res.data.sales.length > 0){
                setgraphSalesData(res.data.sales[0].arr)
            }
            if(res.data.retornos.length > 0){
                setgraphReturnsData(res.data.retornos[0].arr)
            }
            if(res.data.totalsales.length > 0){
                setgraphReceitaData(res.data.totalsales[0].arr)
            }


            setsalesLoading(false);
            
        }).catch((error) => {
            //console.log(error)
            setvendas([]);
            setretornos([]);
            setlucro([]);
            setsalesLoading(false);
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

        if(val < lucro.length){
            setgraphReceitaData(lucro[val].arr);
        }else{
            setgraphReceitaData([])
        }
        
    }


    if(stockLoading === true || salesLoading === true){
        return(
            <div>
            loading....
        </div>
        );
    };
   
 
    if(artigo === null){
        return(
            <div>
            artigo inexistente
        </div>
        );
    };
   
    
    return (
        <Box>
            <Box className="first-half-item-fullstats"  borderWidth="2px" borderRadius="lg" overflow="hidden">
                <Box className="first-half-item-FirstTextBox" >
                    <TableInfo artigo={artigo.info} totalStock={artigo.totalStock} size="sm" fornecedor={true}/>
                </Box>
                <Box className="first-half-image">
                    <Image src={process.env.PUBLIC_URL + artigo.info.imagem.substring(13)} fallbackSrc={process.env.PUBLIC_URL + "/No_image_available.png"}/>    
                </Box>
                
                
                <Box className="first-half-item-SecondTextBox" overflowY="auto" >
                    {artigo.stock.length !== 0 ? <StockTabs stock={artigo.stock}/>:<Box>
                        Stock nao encontrado do artigo
                    </Box>}
                     
                </Box>
            </Box>
           
          
            <Box className="second-half-sales-statistics">
                <Box  overflowY="auto" className="second-half-1st-box"  borderWidth="2px" borderRadius="lg" >
                    {(topVendas.length != 0) ?
                    <Table size="x-sm" variant="simple" className="tabela-top-vendas" >
                        <Thead>
                            <Tr>
                                <Th>Tamanho</Th>
                                <Th>Cor</Th>
                                <Th isNumeric>Vendas</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {topVendas.map((tab,index) => (formatTopVendasEntry(topVendas[index])))}
                        </Tbody>
                        </Table>: <div>
                        o artigo nao tem top vendas
                    </div>}
                </Box>
                <Box className="second-half-2st-box"  borderWidth="2px" borderRadius="lg" >
                    <Box> 
                        <Box className="select-year-and-loja-wrapper"> 
                            <Box>
                                <Box className="select-year-text-item">
                                    Ano Selecionado :
                                </Box>
                                <Box className="select-item">
                                    <Select id="grid-cidade" type="text" name='localidade' onChange={receitasHandler} required>
                                        {vendas.map((tab,index) => {
                                            return(
                                                <option value={index}>{vendas[index].ano}</option>
                                            )
                                        })}
                                    </Select> 
                                    
                                </Box>
                            </Box>
                            

                            <Box className="select-store-box-wrapper ">
                                <Box className="select-stor-text-item">
                                    Loja Selecionada :
                                </Box>
                                <div className="select-store">
                                    <Select id="grid-cidade" type="text" name='localidade' required>
                                        <option value="Todas">Todas</option>
                                        <option value="Barcelos">Barcelos</option>
                                        <option value="Viana">Viana</option>
                                        <option value="Guima">Guima</option>
                                        <option value="Online">Online</option>
                                        <option value="Santander">Santander</option>
                                        <option value="Leiria">Leiria</option>
                                        <option value="Caldas">Caldas</option>
                                </Select> 
                                </div>
                                
                                
                            </Box>
                            
  
                        </Box>
                        
                        <Box className="sales-graphs-wrapper">
                            {retornos[salesYear] ?
                            
                            <Box className="second-half-sales-return-graph">
                                <Box className="text-desc-graph">
                                    Quantidade de vendas e retornos    
                                </Box>
                                <SalesNreturns vendas={graphSalesData} retornos={graphReturnsData} />
                            </Box> : 
                            
                            <Box className="second-half-sales-return-graph">
                                <Box className="text-desc-graph">
                                    Quantidade anual de vendas e retornos    
                                </Box>
                                <SalesNreturns vendas={graphSalesData} retornos={[]} />
                            </Box>}
                            

                            <Box className="second-half-sales-graph">
                                <Box className="text-desc-graph">
                                    Receita anual gerada    
                                </Box>
                                <Totalsales vendas={graphReceitaData}/>   
                            </Box>
                        </Box>
                        
                    </Box>
                   
                </Box> 
                
            </Box>
            

        </Box>
    )
}
 

const formatTopVendasEntry = (entry) =>{

    return(
         <Tr>
            <Td>{entry.tam}</Td>
            <Td>{entry.cor}</Td>
            <Td isNumeric>{entry.qtt}</Td>
        </Tr>
    )
}





export default Item