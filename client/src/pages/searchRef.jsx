import React, { useState,useEffect } from 'react'
import { Input, Button, Box, Spinner } from "@chakra-ui/react"
import axios from 'axios';
import ItemBox from "../components/ItemBox/ItemBox";
import './css/search.css';
import './css/pagingSearch.css';
import ReactPaginate from 'react-paginate';
import CustomScrollbars from 'react-custom-scrollbars'




const SearchRef = () => {
  const [referencia, setreferencia] = useState("");
  const [data, setData] = useState(null);
  const [errormessage, seterrormessage] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [currPage, setcurrPage] = useState(0);
  const [loading, setloading] = useState(false);
  const searchRef = () => {
    setloading(true);
  
    axios.get('/api/stock/' + referencia).then((res) => {
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
        if (referencia !== "") {
            axios.get('/api/stock/' + referencia + "?page=" + currPage).then((res) => {
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
    }, [currPage]);

  const onFormSubmit = e => {
    e.preventDefault();
    searchRef();

  }


  const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setcurrPage(selectedPage);
    };

  if (loading) {
    return (<Spinner className="loading" size="xl" color="red.500" />);
  }

 
  if (data === null) {
    return (
      <Box className="box">
        <Box className="input-and-button-wrapper">
          <form onSubmit={onFormSubmit} className="input-search-size">
               <Input isInvalid={errormessage} errorBorderColor="crimson" variant="outline" placeholder="Referencia" onChange={(e) => setreferencia(e.target.value)} />
          </form>

          <Button className="button" colorScheme='blue' color='white' onClick={searchRef}>Pesquisar</Button>
        </Box>
        {errormessage ?
          <div className="error-message">0 Artigos Encontrados</div>
          : <div className="error-message">Faça uma pesquisa de um artigo por referencia, ex: PV21SN10403</div>
        }

      </Box>
    );
  }

  if(data.length === 1){
    return(
    <Box className="box">
      <Box className="input-and-button-wrapper">
        <form onSubmit={onFormSubmit} className="input-search-size">
               <Input isInvalid={errormessage} errorBorderColor="crimson" variant="outline" placeholder="Referencia" onChange={(e) => setreferencia(e.target.value)} />
        </form>
          

        <Button className="button" colorScheme='blue' color='white' onClick={searchRef}>Pesquisar</Button>
      </Box>
      
      {data}

    </Box>
  )
}


  return (
    <Box className="box">
      <Box className="input-and-button-wrapper">
        <form onSubmit={onFormSubmit} className="input-search-size">
               <Input isInvalid={errormessage} errorBorderColor="crimson" variant="outline" placeholder="Referencia" onChange={(e) => setreferencia(e.target.value)} />
        </form>
      
        <Button className="button" colorScheme='blue' color='white' onClick={searchRef}>Pesquisar</Button>
       
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
  );
}

export default SearchRef


