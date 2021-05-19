import React from 'react'
import { Image,Box,Spinner,TabList,Tabs,Tab,TabPanels,TabPanel,Table,Thead,Tr,Th,Td,Tbody,TableCaption,Tfoot  } from "@chakra-ui/react"


const StockTabs = (props) => {
    return (
        <Tabs variant="soft-rounded" size ="lg">
                        <TabList overflowX="auto"  bg="#A3CFEC">
                            {props.stock.map((tab, index) => (
                                <Tab key={index}>{tab.cor}</Tab>
                            ))}
                        </TabList>

                        <TabPanels>
                           {props.stock.map((tab, index) => (
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
    )
}

export default StockTabs
