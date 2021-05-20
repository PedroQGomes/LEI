import React,{useEffect,useState} from 'react'
import { useLocation } from "react-router-dom";
import axios from 'axios';
import './css/item.css';
import { Image,Box,OrderedList,ListItem} from "@chakra-ui/react"
import SalesNreturns from '../components/charts/salesNreturns'
import Totalsales from '../components/charts/totalsales'
import StockTabs from '../components/Tabs/StockTabs'
import DatePicker from '../components/DatePicker/myDatePicker'


const Item = ({ match }) => {
    const [artigo, setartigo] = useState(null);
    const [vendas, setvendas] = useState(null);
    
    
    useEffect(() => {

        axios.get('/api/item/'+ match.params.id + "/fullstats").then((res) => {

            setartigo(res.data);
            setvendas(res.data.sales);
            
        }).catch((error) => {
            setartigo(null);
        });
        
    }, [])

    if(artigo === null || vendas === null){
        return(
            <div>
            loading....
        </div>
        );
        
    };

    

     
    return (
        <Box>
            <Box className="first-half-item-fullstats"  borderWidth="5px" borderRadius="lg" overflow="hidden">
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
                
                <Image src={process.env.PUBLIC_URL + '/android-chrome-192x192.png'} className="first-half-image"/>
                
                <Box className="first-half-item-SecondTextBox">
                     <StockTabs stock={artigo.stock}/>
                </Box>
            </Box>
           
          
            <Box className="second-half-sales-statistics">
                <Box  overflowY="auto" className="second-half-1st-box"  borderWidth="5px" borderRadius="lg" overflow="hidden">
                    <OrderedList >
                        <ListItem>Lorem ipsum dolor sit amet</ListItem>
                        <ListItem>Consectetur adipiscing elit</ListItem>
                        <ListItem>Integer molestie lorem at massa</ListItem>
                        <ListItem>Facilisis in pretium nisl aliquet</ListItem>
                         <ListItem>Lorem ipsum dolor sit amet</ListItem>
                        <ListItem>Consectetur adipiscing elit</ListItem>
                        <ListItem>Integer molestie lorem at massa</ListItem>
                        <ListItem>Facilisis in pretium nisl aliquet</ListItem>
                         <ListItem>Lorem ipsum dolor sit amet</ListItem>
                        <ListItem>Consectetur adipiscing elit</ListItem>
                        <ListItem>Integer molestie lorem at massa</ListItem>
                        

                    </OrderedList>
                    
                </Box>
                <Box className="second-half-2st-box"  borderWidth="5px" borderRadius="lg" overflow="hidden">
                    <DatePicker startDate={vendas[0].datalc.toString()}/>
                    <DatePicker startDate={vendas[vendas.length - 1].datalc.toString()}/>
                    <Box className="second-half-sales-return-graph">
                         <SalesNreturns vendas={vendas}/>
                    </Box>
                </Box>
                <Box className="second-half-3st-box"  borderWidth="5px" borderRadius="lg" overflow="hidden">
                    <Box className="second-half-sales-graph">
                     <Totalsales vendas={artigo.sales}/>   
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
export default Item