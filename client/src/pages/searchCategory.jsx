import React, { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import ItemBox from "../components/ItemBox/ItemBox";
import { Input, Button, Box, Spinner,Checkbox } from "@chakra-ui/react"
import './css/pagingSearch.css';
import CustomScrollbars from 'react-custom-scrollbars'
import MyDatePicker from '../components/DatePicker/myDatePicker';
import { useQuery } from "../urlquery"; 
import { useHistory } from "react-router-dom";


const SearchCategory = () => {

    const history = useHistory();
    const query = useQuery();

    const [categoria, setcategoria] = useState("")
    const [currPage, setcurrPage] = useState(0)
    const [data, setData] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [errormessage, seterrormessage] = useState(false);
    const [loading, setloading] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [isboxChecked, setisboxChecked] = useState(false);

    const searchCat = () => {
        setloading(true);
        var query ="";
    
        if(isboxChecked){
            query = "?year=" + startDate.getFullYear()
        }
        axios.get('/api/stock/category/' + categoria +query ).then((res) => {
            setPageCount(res.data.totalpages);
            var artigos = res.data.content;
            const postData = artigos.map(pd => <div> <ItemBox artigo={pd} /></div>)
            setData(postData);
            var tmpcat = categoria;
            history.push("/search/category?cat="+tmpcat);

            seterrormessage(false);
            setloading(false);
        }).catch((error) => {
            seterrormessage(true);
            setData(null);
            setloading(false);
        });
    }

    useEffect(() => {
        var tmpcat = query.get("cat");
        if(tmpcat !== null){
            axios.get('/api/stock/category/' + tmpcat ).then((res) => {
                setPageCount(res.data.totalpages);
                var artigos = res.data.content;
                const postData = artigos.map(pd => <div> <ItemBox artigo={pd} /></div>)
                setData(postData);
                setcategoria(tmpcat);
                
                seterrormessage(false);
                setloading(false);
            }).catch((error) => {
                seterrormessage(true);
                setData(null);
                setloading(false);
            });
        }
        
    }, [])



    useEffect(() => {
        if (categoria !== "") {

            var query ="";
    
            if(isboxChecked){
                query = "&year=" + startDate.getFullYear()
            }

            axios.get('/api/stock/category/' + categoria +"?page=" + currPage + query).then((res) => {
                setPageCount(res.data.totalpages);
                var artigos = res.data.content;
                const postData = artigos.map(pd => <div>
                    <ItemBox artigo={pd} />
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

    const handleBoxChange = (e)=> {
        setisboxChecked(!isboxChecked);
    }

     const onFormSubmit = e => {
        e.preventDefault();
        searchCat();

    }

    if (loading) {
        return (<Spinner className="loading" size="xl" color="red.500" />);
    }

    if (data === null) {
        return (
            <Box className="page" >

                <Box className="input-and-button-wrapper">
                    <form onSubmit={onFormSubmit} className="input-search-size">
                         <Input isInvalid={errormessage} errorBorderColor="crimson" variant="outline" placeholder="Categoria" onChange={(e) => setcategoria(e.target.value)} />
                    </form>
                    
                    <Box className="checked-box">
                        <Checkbox defaultIsChecked={isboxChecked} onChange={handleBoxChange} >Pesquisa anual</Checkbox>    
                    </Box>
                    
                    <Box className ="my-date-picker">
                        <MyDatePicker valid={isboxChecked} data={startDate} onChange={(date) => setStartDate(date)}/>  
                    </Box>
       
       
                
                    <Button className="button" colorScheme='blue' color='white' onClick={searchCat}>Pesquisar</Button>
                </Box>
                {errormessage ?
                    <div className="error-message">0 Artigos Encontrados</div>
                    : <div className="error-message">Faça uma pesquisa de um artigo por categoria, ex: CALÇAS - 0400</div>
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
                <form onSubmit={onFormSubmit} className="input-search-size">
                         <Input isInvalid={errormessage} errorBorderColor="crimson" variant="outline" placeholder="Categoria" onChange={(e) => setcategoria(e.target.value)} />
                 </form>
                 <Box className="checked-box">
                        <Checkbox defaultIsChecked={isboxChecked} onChange={handleBoxChange} >Pesquisa anual</Checkbox>    
                </Box>
                <Box className ="my-date-picker">
                    <MyDatePicker valid={isboxChecked} data={startDate} onChange={(date) => setStartDate(date)}/>  
                </Box>
       
                <Button className="button" colorScheme='blue' color='white' onClick={searchCat}>Pesquisar</Button>
            </Box>



            <Box className="dataGrid" overflowY="auto" borderWidth="2px" borderRadius="lg" >
                <CustomScrollbars autoHide autoHideTimeout={500} autoHideDuration={200}>
                {data}
                </CustomScrollbars>
            </Box>

            <Box className="pagesBox">
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
export default SearchCategory
