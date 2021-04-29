import React,{useState} from 'react'
import { Input,Button,Box } from "@chakra-ui/react"
import axios from 'axios';
import { Link, useHistory } from "react-router-dom";
import ItemBox from "../components/ItemBox/ItemBox";
import './css/search.css';


const SearchRef = () => {
    const [referencia, setreferencia] = useState("");
    const [artigo, setartigo] = useState(null);
    const history = useHistory();


    const searchRef = () =>{
       axios.get('/item/'+ referencia).then((res) => {
         setartigo(res.data);
         
        }).catch((error) => {
           setartigo(null);
        });
    }

    
    return (
     <Box className="box">
          <Box className="input-and-button-wrapper">
            <Input variant="outline" placeholder="Referencia" onChange={(e) => setreferencia(e.target.value)}/>

            <Button className="button" colorScheme='blue' color='white' onClick={searchRef}>Search</Button>
          </Box>
          {artigo ? 
           <ItemBox artigo={artigo}/> : 
          <div>
            pesquisa por referencia
          </div>
          }
      </Box>
  );
}

export default SearchRef


