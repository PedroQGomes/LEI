import React from 'react'
import { Box,Image } from "@chakra-ui/react"
import './ItemBox.css';

const ItemBox = (props) => {
    return (
        <Box className="itemBox" borderWidth="7px" borderRadius="lg" overflow="hidden" bg="#C0C2C2">
          <Image src={process.env.PUBLIC_URL + '/android-chrome-192x192.png'} className="image"/>
          <Box className="textbox">
            <Box className="firstTextBox">
              <Box className="text">
                Referencia : {JSON.stringify(props.artigo.ref).split('"').join('')}
              </Box>
              <Box className="text">
                Design : {JSON.stringify(props.artigo.design).split('"').join('')}
              </Box>
              <Box className="text"> 
                Fornecedor : {JSON.stringify(props.artigo.fornecedor).split('"').join('')}
              </Box>
              <Box className="text">
                Descriçao : {JSON.stringify(props.artigo.desc2).split('"').join('')}
              </Box>
              <Box className="text">
                  Modelo : {JSON.stringify(props.artigo.usr1).split('"').join('')}
              </Box>
              
            </Box>
              <Box className="secondTextBox">
                <Box className="text">
                  Estação : {JSON.stringify(props.artigo.usr2).split('"').join('')}
                </Box>
                <Box className="text">
                  Ano : {JSON.stringify(props.artigo.usr3).split('"').join('')}
                </Box>
                <Box className="text">
                  Tipo : {JSON.stringify(props.artigo.usr4).split('"').join('')}
                </Box>
                <Box className="text">
                  Composição : {JSON.stringify(props.artigo.usr5).split('"').join('')}
                </Box> 
            </Box> 
          </Box>
          </Box> 
     
    )
}

export default ItemBox
