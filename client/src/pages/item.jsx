import React,{useEffect,useState} from 'react'
import { useLocation } from "react-router-dom";
import axios from 'axios';
import './css/item.css';
import { Image,Box,OrderedList,ListItem,tab,Table,Thead,Tr,Th,Td,Tbody} from "@chakra-ui/react"
import SalesNreturns from '../components/charts/salesNreturns'
import Totalsales from '../components/charts/totalsales'
import StockTabs from '../components/Tabs/StockTabs'
import DatePicker from '../components/DatePicker/myDatePicker'
import moment from 'moment';

const Item = ({ match }) => {
    
    const [artigo, setartigo] = useState(null);
    const [vendas, setvendas] = useState(null);
    const [retornos, setretornos] = useState(null);
    const [lucro, setlucro] = useState(null);
    const [topVendas, settopVendas] = useState(null);

    const [stockLoading, setstockLoading] = useState(false);
    const [salesLoading, setsalesLoading] = useState(false);
    
    const [startDate, setstartDate] = useState(null);
    const [endDate, setendDate] = useState(null);

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
            
            setstartDate(moment(res.data.sales[0].datalc.toString(), "DD/MM/YYYY").toDate());
            setendDate(moment(res.data.sales[res.data.sales.length - 1].datalc.toString(), "DD/MM/YYYY").toDate());
            setsalesLoading(false);
            
        }).catch((error) => {
            console.log(error)
            setvendas(null);
            setretornos(null);
            setsalesLoading(false);
        });
        
    }, [])

    /*
    useEffect(() => {
        axios.get('file://192.168.1.1/FOTOS/PV18SN90024.jpg').then((res) => {
                console.log("works")
                
            }).catch((error) => {
                console.log(error)
            });

    }, []); */



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
                    <Box className="first-half-item-text">
                        
                        {artigo.info.ref}
                    </Box>
                    <Box className="first-half-item-text">
                        
                        {artigo.info.design}
                    </Box>
                    <Box className="first-half-item-text">
                        
                        {artigo.info.fornecedor} {artigo.info.desc2}
                    </Box>
                    <Box className="first-half-item-text">
                        
                         {artigo.info.usr1}
                    </Box>
                    <Box className="first-half-item-text">
                        
                         {artigo.info.usr5}
                    </Box>
                    <Box className="first-half-item-saldo">
                         Stock total: {artigo.totalStock}
                    </Box>

                </Box>
                
                <Image src={process.env.PUBLIC_URL + '/fotos/'+'OI20SN91333'+'.jpg'} className="first-half-image"/>
                
                <Box className="first-half-item-SecondTextBox" overflowY="auto" >
                     <StockTabs stock={artigo.stock}/>
                </Box>
            </Box>
           
          
            <Box className="second-half-sales-statistics">
                {(topVendas.length  !== 0) ? <Box  overflowY="auto" className="second-half-1st-box"  borderWidth="2px" borderRadius="lg" >
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
                    </Table>
                    
                </Box>: <div>
                    o artigo nao tem vendas
                </div>}
                {vendas ? <Box className="second-half-2st-box"  borderWidth="2px" borderRadius="lg" >
                    <DatePicker data={startDate} onClick={setstartDate}/>
                    <DatePicker data={endDate} onClick={setendDate}/>
                    <Box className="second-half-sales-return-graph">
                        <SalesNreturns vendas={vendas} retornos={retornos}/>
                    </Box>
                    
                </Box> : <div>
                    
                </div>}
                
                { (lucro.length !== 0) ? <Box className="second-half-3st-box"  borderWidth="2px" borderRadius="lg" >
                    <Box className="second-half-sales-graph">
                     <Totalsales vendas={lucro}/>   
                    </Box>
                </Box> : <div>
                    
                </div>
                }
                
                
            </Box>
            

        </Box>
    )
}
 

const formatTopVendasEntry = (entry) =>{
    /*
    return(
        <ListItem>Tamanho : {entry.tam} Cor : {entry.cor} Quantidade : {entry.qtt}</ListItem>
    )*/

    return(
         <Tr>
            <Td>{entry.tam}</Td>
            <Td>{entry.cor}</Td>
            <Td isNumeric>{entry.qtt}</Td>
        </Tr>
    )
}



export default Item