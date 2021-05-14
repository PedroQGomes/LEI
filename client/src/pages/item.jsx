import React,{useEffect,useState} from 'react'
import { useLocation } from "react-router-dom";
import axios from 'axios';
import './css/item.css';
import { Image,Box,Spinner,TabList,Tabs,Tab,TabPanels,TabPanel,Table,Thead,Tr,Th,Td,Tbody,TableCaption,Tfoot  } from "@chakra-ui/react"
import DatePicker,{registerLocale,setDefaultLocale} from "react-datepicker";
import { AreaChart ,XAxis,Tooltip,CartesianGrid,YAxis,Area} from "recharts";
import "react-datepicker/dist/react-datepicker.css";
import pt from 'date-fns/locale/pt';
registerLocale('pt', pt);
setDefaultLocale('pt');

const Item = ({ match }) => {
    const [artigo, setartigo] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    
    const data = [
        {data:"05/10/2020",uv:10},
        {data:"06/10/2020",uv:15},
        {data:"07/10/2020",uv:12},
        {data:"08/10/2020",uv:6},
        {data:"09/10/2020",uv:20}
    ]
    useEffect(() => {

        axios.get('/api/item/'+ match.params.id + "/fullstats").then((res) => {
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
                                            <Td>{tab.lojas.barcelos.slice(0, -1)}</Td>
                                            <Td isNumeric>{tab.lojas.totalStockBarcelos}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Viana</Td>
                                            <Td>{tab.lojas.viana.slice(0, -1)}</Td>
                                            <Td isNumeric>{tab.lojas.totalStockViana}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Guimaraes</Td>
                                            <Td>{tab.lojas.guima.slice(0, -1)}</Td>
                                            <Td isNumeric>{tab.lojas.totalStockBGuima}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Santander</Td>
                                            <Td >{tab.lojas.santander.slice(0, -1)}</Td>
                                            <Td isNumeric>{tab.lojas.totalStockSantander}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Leiria</Td>
                                            <Td>{tab.lojas.leiria.slice(0, -1)}</Td>
                                            <Td isNumeric>{tab.lojas.totalStockLeiria}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Caldas</Td>
                                            <Td>{tab.lojas.caldas.slice(0, -1)}</Td>
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
             <Box className="second-half-sales-statistics">
                <DatePicker dateFormat="dd/MM/yyyy" selected={startDate} onChange={date => setStartDate(date)} />
                <Box className="second-half-sales-graph">
                    <AreaChart width={400} height={200} data={data}
                        omargin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="data" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                        <Area type="montone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                    </AreaChart>
                </Box>
            </Box>
        </Box>
    )
}
export default Item