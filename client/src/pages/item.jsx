import React,{useEffect,useState} from 'react'
import { useLocation } from "react-router-dom";
import axios from 'axios';
import './css/item.css';
import { Image,Box,FormLabel,Spinner,TabList,Tabs,Tab,TabPanels,TabPanel,Table,Thead,Tr,Th,Td,Tbody,TableCaption,Tfoot  } from "@chakra-ui/react"

const Item = ({ match }) => {
    const [artigo, setartigo] = useState(null);

    
    useEffect(() => {
        console.log("useeffect");
        axios.get('/item/'+ match.params.id + "/fullstats").then((res) => {
            setartigo(res.data);
            
        }).catch((error) => {
          
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
                    <Box>
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
                
                <Image src={process.env.PUBLIC_URL + '/android-chrome-192x192.png'}/>
                
                <Box className="first-half-item-SecondTextBox">
                     <Tabs variant="soft-rounded" size ="lg">
                        <TabList overflowX="auto"  bg="#A3CFEC">
                            {artigo.stock.map((tab, index) => (
                                <Tab key={index}>{tab.cor}</Tab>
                            ))}
                        </TabList>

                        <TabPanels>
                           {artigo.stock.map((tab, index) => (
                                <TabPanel p={4} key={index}>
                                    <Table size="x-sm" variant="simple">
                                        <Thead>
                                            <Tr>
                                            <Th>Loja</Th>
                                            <Th>Tamanhos</Th>
                                            <Th isNumeric>Stock</Th>
                                        </Tr>
                                        </Thead>
                                        <Tbody>
                                        <Tr>
                                            <Td>Barcelos</Td>
                                            <Td>{tab.lojas.barcelos}</Td>
                                            <Td isNumeric>{tab.lojas.totalStockBarcelos}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Viana</Td>
                                            <Td>{tab.lojas.viana}</Td>
                                            <Td isNumeric>{tab.lojas.totalStockViana}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Guimaraes</Td>
                                            <Td>{tab.lojas.guima}</Td>
                                            <Td isNumeric>{tab.lojas.totalStockBGuima}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Santander</Td>
                                            <Td >{tab.lojas.santander}</Td>
                                            <Td isNumeric>{tab.lojas.totalStockSantander}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Leiria</Td>
                                            <Td>{tab.lojas.leiria}</Td>
                                            <Td isNumeric>{tab.lojas.totalStockLeiria}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Caldas</Td>
                                            <Td>{tab.lojas.caldas}</Td>
                                            <Td isNumeric>{tab.lojas.totalStockCaldas}</Td>
                                        </Tr>
                                        </Tbody>
                                    </Table>
                                </TabPanel>
                            ))}
                        </TabPanels>
                    </Tabs>
                </Box>
            </Box>
             <Box>
                 bouas
            </Box>
        </Box>
    )
}
export default Item