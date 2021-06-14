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

    useEffect(() => {
        setstockLoading(true);
        setsalesLoading(true);
        axios.get('/api/stock/'+ match.params.id + "/fullstats").then((res) => {
            setartigo(res.data);
            setstockLoading(false);
        }).catch((error) => {
            console.log(error)
            setstockLoading(false);
            setartigo(null);
        });

        axios.get('/api/sales/'+ match.params.id).then((res) => {

            setvendas(res.data.sales);
            setretornos(res.data.retornos);
            setlucro(res.data.totalsales);
            settopVendas(res.data.topvendas);
            
            setsalesLoading(false);
            
        }).catch((error) => {
            console.log(error)
            setvendas([]);
            setretornos([]);
            setlucro([]);
            setsalesLoading(false);
        });
        
    }, [])

   
    console.log(vendas)


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
                    {(vendas.length != 0) ?
                    <Box> 
                        <Box >
                            <Box className="select-year-text-item">
                                Ano Selecionado :
                            </Box>
                            <Box className="select-item">
                                <Select id="grid-cidade" type="text" name='localidade' onChange={receitasHandler} required>
                                    {vendas.map((tab,index) => {
                                        return(
                                            <option value={vendas[index]}>{vendas[index].ano}</option>
                                        )
                                    })}
                                </Select> 
                                
                            </Box>
                            
  
                        </Box>
                        {(retornos.length != 0) ? <Box className="second-half-sales-return-graph">
                            <SalesNreturns vendas={vendas[0].arr} retornos={retornos[0].arr}/>
                        </Box>  :
                        <Box className="second-half-sales-return-graph">
                            <SalesNreturns vendas={vendas[0].arr} />
                        </Box>   
                        }
                        
                    </Box>
                    : <div>
                         o artigo nao tem quantidade de vendas
                </div>}
                </Box> 
                
                <Box className="second-half-3st-box"  borderWidth="2px" borderRadius="lg" >
                    { (lucro .length != 0) ?
                    <Box>
                        <Box >
                            <Box className="select-year-text-item">
                                Ano Selecionado :
                            </Box>
                            <Box className="select-item">
                                <Select id="grid-cidade" type="text" name='localidade' onChange={receitasHandler} required>
                                    {vendas.map((tab,index) => {
                                        return(
                                            <option value={vendas[index]}>{vendas[index].ano}</option>
                                        )
                                    })}
                                </Select> 
                                
                            </Box>
                            
  
                        </Box> 
                        <Box className="second-half-sales-graph">
                            <Totalsales vendas={lucro[0].arr}/>   
                        </Box>
                    </Box>
                    : <div>
                    o artigo nao tem receitas de vendas
                </div>}
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

const receitasHandler = (event) => {
        
}




export default Item