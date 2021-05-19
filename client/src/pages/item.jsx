import React,{useEffect,useState} from 'react'
import { useLocation } from "react-router-dom";
import axios from 'axios';
import './css/item.css';
import { Image,Box,Divider} from "@chakra-ui/react"
import SalesNreturns from '../components/charts/salesNreturns'
import Totalsales from '../components/charts/totalsales'
import StockTabs from '../components/Tabs/StockTabs'
import DatePicker from '../components/DatePicker/myDatePicker'

const Item = ({ match }) => {
    const [artigo, setartigo] = useState(null);
    const [vendas, setvendas] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    
    useEffect(() => {

        axios.get('/api/item/'+ match.params.id + "/fullstats").then((res) => {

            setartigo(res.data);
            setvendas(res.data.sales);
            
        }).catch((error) => {
            setartigo(null);
        });
        
    }, [])

    if(artigo === null){
        return(
            <div>
            loading....
        </div>
        );
        
    };

    

     
    return (
        <Box>
            <Box className="first-half-item-fullstats">
                <Box>
                    <Box className="first-half-item-FirstTextBox">
                        {artigo.info.ref}
                    </Box>
                    <Box className="first-half-item-FirstTextBox">
                        {artigo.info.design}
                    </Box>
                    <Box>
                        {artigo.info.fornecedor} {artigo.info.desc2}
                    </Box>
                    <Box>
                         {artigo.info.usr1}
                    </Box>
                    <Box>
                         {artigo.info.usr2}
                    </Box>
                    <Box>
                         {artigo.info.usr3}
                    </Box>
                    <Box>
                         {artigo.info.usr4}
                    </Box>
                    <Box>
                         {artigo.info.usr5}
                    </Box>

                </Box>
                
                <Image src={process.env.PUBLIC_URL + '/android-chrome-192x192.png'} className="first-half-image"/>
                
                <Box className="first-half-item-SecondTextBox">
                     <StockTabs stock={artigo.stock}/>
                </Box>
            </Box>
            <Box className="second-half-sales-statistics">
                <Box >
                    <DatePicker/>
                    <Box className="second-half-sales-return-graph">
                         <SalesNreturns vendas={vendas}/>
                    </Box>
                </Box>
                <Box className="second-half-sales-graph">
                     <Totalsales vendas={artigo.sales}/>   
                </Box>
            </Box>
        </Box>
    )
}
export default Item