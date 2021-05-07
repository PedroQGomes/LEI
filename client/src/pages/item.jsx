import React,{useEffect,useState} from 'react'
import { useLocation } from "react-router-dom";
import axios from 'axios';


const Item = ({ match }) => {
    const [artigo, setartigo] = useState(null)

    useEffect(() => {
        axios.get('/item/'+ match.params.id + "/fullstats").then((res) => {
            setartigo(res.data);
            
        }).catch((error) => {
          
        });
        
    }, [])

     
    return (
        <div>
            {JSON.stringify(artigo)}
        </div>
    )
}

export default Item