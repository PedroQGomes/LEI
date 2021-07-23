import React, { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import ItemBox from "../components/ItemBox/ItemBox";
import { Input, Button, Box, Spinner,Checkbox } from "@chakra-ui/react"
import './css/pagingSearch.css';
import MyDatePicker from '../components/DatePicker/myDatePicker';
import CustomScrollbars from 'react-custom-scrollbars'

const SearchName = () => {
    const [nome, setnome] = useState("")
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
        axios.get('/api/stock/name/' + nome + query ).then((res) => {
            setPageCount(res.data.totalpages);
            var artigos = res.data.content;
            const postData = artigos.map(pd => <div>
                <ItemBox artigo={pd} />
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
        if (nome !== "") {

            var query ="";
    
            if(isboxChecked){
                query = "&year=" + startDate.getFullYear()
            }
            axios.get('/api/stock/name/' + nome + "?page=" + currPage + query).then((res) => {
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
                    : <div className="error-message">Faça uma pesquisa de um artigo por nome, ex: CALÇA 10403</div>
                }
            </Box>);
    }


    return (
        <Box className="page" >

            <Box className="input-and-button-wrapper">
                <form onSubmit={onFormSubmit} className="input-search-size">
                        <Input isInvalid={errormessage} errorBorderColor="crimson" variant="outline" placeholder="Nome" onChange={(e) => setnome(e.target.value)} />
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

export default SearchName
