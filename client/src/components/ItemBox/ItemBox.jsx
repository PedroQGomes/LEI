import React from 'react'
import { Box,Image,FormLabel,Button,Table,Thead,Tr,Th,Td,Tbody,Text } from "@chakra-ui/react"
import { Link, useHistory } from "react-router-dom";
import './ItemBox.css';

const ItemBox = (props) => {

  const history = useHistory();

  const moreInfo = () =>{
      history.push("/item/" + props.artigo.info.ref);
  }

    return (
        <Box className="itemBox" borderWidth="7px" borderRadius="lg" overflow="hidden" bg="#A3CFEC">
          <Image src={process.env.PUBLIC_URL + '/android-chrome-192x192.png'} className="image"/>
          <Box className="textbox">
            <Box className="firstTextBox">
              <Text className="text">
                Ref : {props.artigo.info.ref.split('"').join('')}
              </Text>
              <Text className="text">
                Nome: {props.artigo.info.design.split('"').join('')}
              </Text>
              <Text className="text">
                Cat: {props.artigo.info.usr1.split('"').join('')}
              </Text>
              <Text className="text">
                {JSON.stringify(props.artigo.info.usr5).split('"').join('')}
              </Text> 
              <Text className="text2">
                Stock Total : {props.artigo.totalStock}
              </Text> 
              <Text className="text">
                {props.artigo.info.opendata.substring(0, 10)}
              </Text> 
              
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
                    <Td isNumeric>{props.artigo.stock.satander}</Td>
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
            
            <Button className="plusbutton" colorScheme='blue' color='white' onClick={moreInfo}>+</Button>
          </Box>
        </Box> 

    )
}

export default ItemBox