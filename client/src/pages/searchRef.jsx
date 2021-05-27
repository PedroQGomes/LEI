import React,{useState} from 'react'
import { Input,Button,Box,FormLabel,Spinner } from "@chakra-ui/react"
import axios from 'axios';
import { Link, useHistory } from "react-router-dom";
import ItemBox from "../components/ItemBox/ItemBox";
import './css/search.css';


const SearchRef = () => {
    const [referencia, setreferencia] = useState("");
    const [artigo, setartigo] = useState(null);
    const [errormessage, seterrormessage] = useState(false);
    const [loading, setloading] = useState(false);

    const searchRef = () =>{
      setloading(true);
       axios.get('/api/stock/'+ referencia).then((res) => {
         console.log(res.data);
         setartigo(res.data);
         seterrormessage(false);
         setloading(false);
         
        }).catch((error) => {
          seterrormessage(true);
          setartigo(null);
          setloading(false);
        });
    }

    if(loading){
      return(<Spinner className="loading" size="xl" color="red.500" />);
    }

    
    return (
     <Box className="box">
          <Box className="input-and-button-wrapper">
            <Input isInvalid={errormessage} errorBorderColor="crimson" variant="outline" placeholder="Referencia" onChange={(e) => setreferencia(e.target.value)}/>

            <Button className="button" colorScheme='blue' color='white' onClick={searchRef}>Search</Button>
          </Box>
          {artigo ? 
           <ItemBox artigo={artigo}/> : 
          <FormLabel className="error-message">0 Artigos Encontrados</FormLabel>
          
          }
      </Box>
  );
}

export default SearchRef


