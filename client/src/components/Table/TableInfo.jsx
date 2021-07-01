import React,{useState} from 'react'
import { TabPanel,Table,Thead,Tr,Th,Td,Tbody } from "@chakra-ui/react"

const TableInfo = (props) => {
    const [artigo, setArtigo] = useState(props.artigo)
    const [totalStock, setTotalStock] = useState(props.totalStock)
    const [size, setsize] = useState(props.size) 


    return (
        
            <Table size={size} variant="simple">
              
                             <Tbody>
                                        <Tr>
                                            <Td>Referencia</Td>
                                            <Td isNumeric>{artigo.ref}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Nome</Td>
                                            <Td isNumeric>{artigo.design}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Categoria</Td>
                                            <Td isNumeric>{artigo.usr1}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Fornecedor</Td>
                                            <Td isNumeric>{artigo.fornecedor} {artigo.desc2}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Composiçao</Td>
                                            <Td isNumeric>{artigo.usr5}</Td>
                                            
                                        </Tr>
                                        <Tr>
                                            <Td>Stock Total</Td>
                                            <Td isNumeric>{totalStock}</Td>
                                        </Tr>
                                </Tbody>
            </Table>
    )
}

export default TableInfo
