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
    const [anosvendas, setanosvendas] = useState(null);

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
            var salesMap = new Map();
            for(var i=0; i < res.data.sales.length; i++ ){
                salesMap.set(res.data.sales[i].ano,res.data.sales[i].arr);
            }
            var retrunsMap = new Map();
            for(var i=0; i < res.data.retornos.length; i++ ){
                retrunsMap.set(res.data.retornos[i].ano,res.data.retornos[i].arr);
            }
            var receitaMap = new Map();
            for(var i=0; i < res.data.totalsales.length; i++ ){
                receitaMap.set(res.data.totalsales[i].ano,res.data.totalsales[i].arr);
            }
            setanosvendas(res.data.sales);
            setvendas(salesMap);
            setretornos(retrunsMap);
            setlucro(receitaMap);
            settopVendas(res.data.topvendas);
            
            
            if(res.data.sales.length > 0){
                setsalesYear(res.data.sales[0].ano)
                setgraphSalesData(salesMap.get(res.data.sales[0].ano))
                setgraphReceitaData(receitaMap.get(res.data.sales[0].ano))
            }
            if(retrunsMap.get(res.data.sales[0].ano) !== undefined){
                setgraphReturnsData(retrunsMap.get(res.data.sales[0].ano))
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
        

        
        if(vendas.get(val) !== undefined){
            setgraphSalesData(vendas.get(val));
        }else{
            setgraphSalesData([])
        }

        
        if(retornos.get(val) !== undefined){
            setgraphReturnsData(retornos.get(val));
        }else{
            setgraphReturnsData([])
        }

        if(lucro.get(val) !== undefined){
            setgraphReceitaData(lucro.get(val));
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
                                        {anosvendas.map((tab,index) => {
                                            return(
                                                <option value={anosvendas[index].ano}>{anosvendas[index].ano}</option>
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
                                        <option value="Guima">Guimarães</option>
                                        <option value="Online">Online</option>
                                        <option value="Santander">Santander</option>
                                        <option value="Leiria">Leiria</option>
                                        <option value="Caldas">Caldas</option>
                                </Select> 
                                </div>
                                
                                
                            </Box>
                            
  
                        </Box>
                        
                        <Box className="sales-graphs-wrapper">
                            <Box className="second-half-sales-return-graph">
                                <Box className="text-desc-graph">
                                    Quantidade anual de vendas e retornos    
                                </Box>
                                <SalesNreturns vendas={graphSalesData} retornos={graphReturnsData} />
                            </Box>
                            

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