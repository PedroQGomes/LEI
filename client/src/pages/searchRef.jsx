import React,{useState} from 'react'
import { Input,Button,Box } from "@chakra-ui/react"
import axios from 'axios';
import { Link, useHistory } from "react-router-dom";

const SearchRef = () => {
    const [referencia, setreferencia] = useState("");
    const [artigo, setartigo] = useState(null);
    const history = useHistory();


    const searchRef = () =>{
       axios.get('/item/'+ referencia).then((res) => {
         history.push({
          pathname: '/artigo',
          state: {  // location state
            update: "bouas", 
          },
          }); 
         
        }).catch((error) => {
        });
    }

    if(artigo !== null){
      return(
        <Box>
        {JSON.stringify(artigo)}
      </Box>
      );
    }

    return (
     <div>
       <Input variant="flushed" placeholder="Flushed" onChange={(e) => setreferencia(e.target.value)}/>

       <Button pos="absolute" top="60%" left="50%" colorScheme='blue' color='white' onClick={searchRef}>Join now</Button>
     </div>
  );
}

export default SearchRef


