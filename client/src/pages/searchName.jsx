import React, { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import ItemBox from "../components/ItemBox/ItemBox";
import { Input, Button, Box, Spinner,Checkbox,Select } from "@chakra-ui/react"
import './css/pagingSearch.css';
import MyDatePicker from '../components/DatePicker/myDatePicker';
import CustomScrollbars from 'react-custom-scrollbars'
import { useQuery } from "../urlquery"; 
import { useHistory } from "react-router-dom";

const SearchName = () => {

    const history = useHistory();
    const query = useQuery();
    
    const [nome, setnome] = useState("")
    const [currPage, setcurrPage] = useState(0)
    const [data, setData] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [errormessage, seterrormessage] = useState(false);
    const [loading, setloading] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [isboxChecked, setisboxChecked] = useState(false);
    const [ordertype, setordertype] = useState("DESC");

    const searchCat = () => {
        setloading(true);

        var query ="";
    
        if(isboxChecked){
            query = "&year=" + startDate.getFullYear()
        }
        axios.get('/api/stock/name/' + nome +"?type=" + ordertype + query ).then((res) => {
            setPageCount(res.data.totalpages);
            var artigos = res.data.content;
            const postData = artigos.map(pd => <div>
                <ItemBox artigo={pd} />
            </div>)
            setData(postData);
            var tmpnome = nome
            history.push("/search/name?name="+tmpnome);
            seterrormessage(false);
            setloading(false);

        }).catch((error) => {
            seterrormessage(true);
            setData(null);
            setloading(false);
        });
    }

    useEffect(() => {
        var tmpnome = query.get("name");
        if(tmpnome !== null){
            axios.get('/api/stock/name/' + tmpnome).then((res) => {
                setPageCount(res.data.totalpages);
                var artigos = res.data.content;
                const postData = artigos.map(pd => <div>
                    <ItemBox artigo={pd} />
                </div>)
                setData(postData);
                setnome(tmpnome);
                seterrormessage(false);
                setloading(false);
                
            }).catch((error) => {
                seterrormessage(true);
                setData(null);
                setloading(false);
            });

        }
        
    }, []);


    useEffect(() => {
        if (nome !== "") {

            var query ="";
    
            if(isboxChecked){
                query = "&year=" + startDate.getFullYear()
            }
            axios.get('/api/stock/name/' + nome + "?page=" + currPage + query + "&type=" + ordertype).then((res) => {
                setPageCount(res.data.totalpages);
                var artigos = res.data.content;
                const postData = artigos.map(pd => <div>
                    <ItemBox artigo={pd} />
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

    const onFormSubmit = e => {
        e.preventDefault();
        searchCat();

    }

    const myChangeHandler =(e)=> {
      let val = (e.target.value);
      
      setordertype(val)
    }

    const handleBoxChange = (e)=> {
        setisboxChecked(!isboxChecked);
    }

    if (loading) {
        return (<Spinner className="loading" size="xl" color="red.500" />);
    }

    if (data === null) {
        return (
            <Box className="page" >

                <Box className="input-and-button-wrapper">
                    

                    <form onSubmit={onFormSubmit} className="input-search-size">
                        <Input isInvalid={errormessage} errorBorderColor="crimson" variant="outline" placeholder="Nome" onChange={(e) => setnome(e.target.value)} />
                    </form>

                    <Box className="select-type-seatch-ref">
                        <Select id="ORDERNAR" type="text" name='ordenar' value={ordertype} onChange={myChangeHandler} required>
                                    <option value="" disabled>Ordernar por referencia</option>
                                    <option value="DESC">Descendente</option>
                                    <option value="ASC">Ascendente</option>
                        </Select>
                    </Box>

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
                    : <div className="error-message">Fa??a uma pesquisa de um artigo por nome, ex: CAL??A 10403</div>
                }
            </Box>);
    }


    return (
        <Box className="page" >

            <Box className="input-and-button-wrapper">
                <form onSubmit={onFormSubmit} className="input-search-size">
                        <Input isInvalid={errormessage} errorBorderColor="crimson" variant="outline" placeholder="Nome" onChange={(e) => setnome(e.target.value)} />
                </form>
                
                <Box className="select-type-seatch-ref">
                    <Select id="ORDERNAR" type="text" name='ordenar' value={ordertype} onChange={myChangeHandler} required>
                                <option value="" disabled>Ordernar por referencia</option>
                                 <option value="DESC">Descendente</option>
                                <option value="ASC">Ascendente</option>
                    </Select>
                </Box>

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

export default SearchName
