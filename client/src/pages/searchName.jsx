import React,{useState,useEffect} from 'react'
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import ItemBox from "../components/ItemBox/ItemBox";
import { Input,Button,Box,FormLabel,Spinner } from "@chakra-ui/react"
import './css/pagingSearch.css';
const SearchName = () => {
    const [nome, setnome] = useState("")
    const [currPage, setcurrPage] = useState(0)
    const [data, setData] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [errormessage, seterrormessage] = useState(false);
    const [loading, setloading] = useState(false);

    const searchCat = () =>{
      setloading(true);
       axios.get('/api/stock/name/'+ nome).then((res) => {
         setPageCount(res.data.totalpages);
            var artigos = res.data.content;
             const postData = artigos.map(pd => <div>
                    <ItemBox artigo={pd}/> : 
            </div>)
         setData(postData);
         seterrormessage(false);
         setloading(false);
         
        }).catch((error) => {
          seterrormessage(true);
          setData(null);
          setloading(false);
        });
    }

    useEffect(() => {
        if(nome !== ""){

            axios.get('/api/stock/name/'+ nome +"?page=" + currPage).then((res) => {
            setPageCount(res.data.totalpages);
            var artigos = res.data.content;
             const postData = artigos.map(pd => <div>
                    <ItemBox artigo={pd}/> : 
            </div>)
            setData(postData);
            seterrormessage(false);
         
            }).catch((error) => {
                seterrormessage(true);
                setData(null);
            
            });
        }
         
    }, [currPage])
    
        
    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setcurrPage(selectedPage);
    };


    if(loading){
      return(<Spinner className="loading" size="xl" color="red.500" />);
    }

    if(data === null){
        return(
        <Box className="page" >

            <Box className="input-and-button-wrapper">
                <Input isInvalid={errormessage} errorBorderColor="crimson" variant="outline" placeholder="Nome" onChange={(e) => setnome(e.target.value)}/>

                <Button className="button" colorScheme='blue' color='white' onClick={searchCat}>Pesquisar</Button>
            </Box> 
            {errormessage ? 
                <FormLabel className="error-message">0 Artigos Encontrados</FormLabel> 
                : <FormLabel className="error-message">Faça uma pesquisa de um artigo por nome, ex: CALÇA 10403</FormLabel>
            }
      </Box>);
    }


    return (
        <Box className="page" >

            <Box className="input-and-button-wrapper">
                <Input isInvalid={errormessage} errorBorderColor="crimson" variant="outline" placeholder="Nome" onChange={(e) => setnome(e.target.value)}/>

                <Button className="button" colorScheme='blue' color='white' onClick={searchCat}>Pesquisar</Button>
            </Box>

            <Box className="dataGrid"  overflowY="auto" borderWidth="2px" borderRadius="lg" >
                {data}    
            </Box>
            
            <Box  className="pagesBox">
                <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                    />
            </Box>
        
      </Box>
    )
}

export default SearchName
