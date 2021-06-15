import React,{useState,useEffect} from 'react'
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import ItemBox from "../components/ItemBox/ItemBox";
import { Input,Button,Box,FormLabel,Spinner } from "@chakra-ui/react"
import './css/pagingSearch.css';
import { DataGrid } from '@material-ui/data-grid';

const SearchCategory = () => {
    const [categoria, setcategoria] = useState("")
    const [currPage, setcurrPage] = useState(0)
    const [data, setData] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [errormessage, seterrormessage] = useState(false);
    const [loading, setloading] = useState(false);
    const [pageSize, setpageSize] = useState(5)

    const searchCat = () =>{
      setloading(true);
       axios.get('/api/stock/category/'+ categoria).then((res) => {
        setPageCount(res.data.totalpages);
        var artigos = res.data.content;
        const postData = artigos.map(pd => <div> <ItemBox artigo={pd}/></div>)
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
        if(categoria !== ""){
            axios.get('/api/stock/category/'+ categoria +"?page=" + currPage).then((res) => {
            setPageCount(res.data.totalpages);
            var artigos = res.data.content;
             const postData = artigos.map(pd => <div>
                    <ItemBox artigo={pd}/> : 
            </div>)
            setData(postData);
            seterrormessage(false);
            }).catch((error) => {
                setData(null);
                seterrormessage(true);
            
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
                <Input isInvalid={errormessage} errorBorderColor="crimson" variant="outline" placeholder="Categoria" onChange={(e) => setcategoria(e.target.value)}/>

                <Button className="button" colorScheme='blue' color='white' onClick={searchCat}>Pesquisar</Button>
            </Box> 
            {errormessage ? 
                <FormLabel className="error-message">0 Artigos Encontrados</FormLabel> 
                : <FormLabel className="error-message">Faça uma pesquisa de um artigo por categoria, ex: CALÇAS - 0400</FormLabel>
            }
      </Box>);
    }

    /**
     * <DataGrid
                pageSize={pageSize}
                onPageSizeChange={handlePageSizeChange}
                rowsPerPageOptions={[5, 10, 20]}
                pagination
                {...data}
                />
     */


    return (
        <Box className="page" >

            <Box className="input-and-button-wrapper">
                <Input isInvalid={errormessage} errorBorderColor="crimson" variant="outline" placeholder="Categoria" onChange={(e) => setcategoria(e.target.value)}/>

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

function handlePageSizeChange() {
    
}
export default SearchCategory
