import React,{useState} from 'react'
import { Box,Image,FormLabel,Button,Table,Thead,Tr,Th,Td,Tbody,Text } from "@chakra-ui/react"
import { Link, useHistory } from "react-router-dom";
import './ItemBox.css';
import TableInfo from '../Table/TableInfo'

const ItemBox = (props) => {

  const history = useHistory();
  console.log(props.artigo.info)
  const [artigo, setartigo] = useState(props.artigo.info)
  const [totalStock, settotalStock] = useState(props.artigo.totalStock)
  const moreInfo = () =>{
      history.push("/item/" + props.artigo.info.ref);
  }

    return (
        <Box className="itemBox" borderWidth="7px" borderRadius="lg" overflow="hidden" bg="#A3CFEC">
          <div className="image">
            <Image src={process.env.PUBLIC_URL + props.artigo.info.imagem.substring(13)} fallbackSrc={process.env.PUBLIC_URL + "/No_image_available.png"}/>
          </div>
          <Box className="textbox">
            <Box className="firstTextBox">
              <Table size="sm" variant="simple">
              
                             <Tbody>
                                        <Tr>
                                            <Td>Referencia</Td>
                                            <Td isNumeric>{props.artigo.info.ref}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Nome</Td>
                                            <Td isNumeric>{props.artigo.info.design}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Categoria</Td>
                                            <Td isNumeric>{props.artigo.info.usr1}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Composiçao</Td>
                                            <Td isNumeric>{props.artigo.info.usr5}</Td>
                                            
                                        </Tr>
                                        <Tr>
                                            <Td>Stock Total</Td>
                                            <Td isNumeric>{props.artigo.totalStock}</Td>
                                        </Tr>
                                </Tbody>
            </Table>
            </Box>
             
            <Box className="tabela">
              <Table size="sm" variant="simple">
                <Thead>
                    <Tr>
                    <Th>Loja</Th>
                    <Th isNumeric>Stock</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Barcelos</Td>
                    <Td isNumeric>{props.artigo.stock.barcelos}</Td>
                  </Tr>
                  <Tr>
                    <Td>Viana</Td>
                    <Td isNumeric>{props.artigo.stock.viana}</Td>
                  </Tr>
                  <Tr>
                    <Td>Guimaraes</Td>
                    <Td isNumeric>{props.artigo.stock.guima}</Td>
                  </Tr>
                </Tbody>
            </Table>
            </Box>

            <Box className="tabela">
              <Table size="sm" variant="simple">
                <Thead>
                    <Tr>
                    <Th>Loja</Th>
                    <Th isNumeric>Stock</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Santander</Td>
                    <Td isNumeric>{props.artigo.stock.santander}</Td>
                  </Tr>
                  <Tr>
                    <Td>Leiria</Td>
                    <Td isNumeric>{props.artigo.stock.leiria}</Td>
                  </Tr>
                  <Tr>
                    <Td>Caldas</Td>
                    <Td isNumeric>{props.artigo.stock.caldas}</Td>
                  </Tr>
                </Tbody>
            </Table>
            </Box>
            <Box className="plusbutton">
              <Button colorScheme='blue' color='white' onClick={moreInfo}>+</Button>  
            </Box>
            
          </Box>
        </Box> 

    )
}

export default ItemBox
