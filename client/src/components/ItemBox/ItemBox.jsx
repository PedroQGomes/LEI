import React from 'react'
import { Box,Image,FormLabel,Button } from "@chakra-ui/react"
import { Link, useHistory } from "react-router-dom";
import './ItemBox.css';

const ItemBox = (props) => {

  const history = useHistory();

  const moreInfo = () =>{
      history.push("/item/" + props.artigo.ref);
  }

    return (
        <Box className="itemBox" borderWidth="7px" borderRadius="lg" overflow="hidden" bg="#C0C2C2">
          <Image src={process.env.PUBLIC_URL + '/android-chrome-192x192.png'} className="image"/>
          <Box className="textbox">
            <Box className="firstTextBox">
              <FormLabel className="text">
                Referencia : {JSON.stringify(props.artigo.ref).split('"').join('')}
              </FormLabel>
              <FormLabel className="text">
                Design : {JSON.stringify(props.artigo.design).split('"').join('')}
              </FormLabel>
              <FormLabel className="text"> 
                Fornecedor : {JSON.stringify(props.artigo.fornecedor).split('"').join('')}
              </FormLabel>
              <FormLabel className="text">
                Descrição : {JSON.stringify(props.artigo.desc2).split('"').join('')}
              </FormLabel>
              <FormLabel className="text">
                  Modelo : {JSON.stringify(props.artigo.usr1).split('"').join('')}
              </FormLabel>
              
            </Box>
              <Box className="secondTextBox">
                <FormLabel className="text">
                  Estação : {JSON.stringify(props.artigo.usr2).split('"').join('')}
                </FormLabel>
                <FormLabel className="text">
                  Ano : {JSON.stringify(props.artigo.usr3).split('"').join('')}
                </FormLabel>
                <FormLabel className="text">
                  Tipo : {JSON.stringify(props.artigo.usr4).split('"').join('')}
                </FormLabel>
                <FormLabel className="text">
                  Composição : {JSON.stringify(props.artigo.usr5).split('"').join('')}
                </FormLabel> 
            </Box> 
            <Button className="plusbutton" colorScheme='blue' color='white' onClick={moreInfo}>+</Button>
          </Box>
        </Box> 
     
    )
}

export default ItemBox
