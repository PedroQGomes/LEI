import React,{useEffect,useState} from 'react'
import { NumberDecrementStepper,Box,Textarea ,Input,Button,NumberInputField,NumberInput,NumberInputStepper,NumberIncrementStepper,Divider,Alert,AlertIcon} from "@chakra-ui/react"
import './css/orders.css';
import axios from 'axios';
import { DataGrid } from '@material-ui/data-grid';

const Orders = () => {
    const [historico, sethistorico] = useState([]);
    const [quantidade, setquantidade] = useState(10);
    const [desc, setdesc] = useState("");
    const [ref, setref] = useState("");
    const [orderSuccess, setorderSuccess] = useState(false);
    const [orderFail, setorderFail] = useState(false);


    useEffect(() => {
        axios.get('/api/orders/user/').then((res) => {
            const postData = res.data.map(pd => <div> {JSON.stringify(pd)}</div>)
            sethistorico(res.data)
        }).catch((error) => {
            console.log(error)
        });
    }, [])

    const setreferencia = () =>{

    }

    const postOrder = () =>{
        const body ={
            "ref":ref,
            "quantidade":quantidade,
            "descriçao":desc
        }
        axios.post('/api/orders/',body).then((res) => {
            setorderSuccess(true);
            setorderFail(false);
            setdesc("");
            setref("");
            setquantidade(0);
            //sethistorico(historico.push(body))
        }).catch((error) => {
            setorderFail(true);
            setorderSuccess(false);
            //console.log(error)
        });
    }

    const columns = [
  { field: 'id', headerName: 'id', width: 90 },
  { field: 'id_artigo', headerName: 'Ref', width: 120 },
  { field: 'id_fornecedor', headerName: 'Fornecedor', width: 160 },
  { field: 'dataEncomenda', headerName: 'Data', width: 240 },
  { field: 'quantidade', headerName: 'Qtt', type: 'number',width: 110},
]



    return (
        <Box className="orders-fullbox">
            <Box className="orders-new-order-box">
                <Box className="orders-title">
                     Reforço de stock de artigos    
                </Box>
                <Box className="orders-ref-input-box">
                    <Input  errorBorderColor="crimson" variant="outline" placeholder="Referencia" onChange={(e) => {setref(e.target.value)}}/>    
                </Box>
                <Box className="orders-qtt-input-box">
                
                    <NumberInput step={5} min={0} max={3000} value={quantidade} onChange={(e)=>{setquantidade(e)}}>
                        <NumberInputField />
                        <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput> 
                </Box>
                <Box className="orders-desc-input-box">
                    <Textarea placeholder="Descrição da encomenda" onChange={(e) => {setdesc(e.target.value)}}/>    
                </Box>
                <Box className="orders-submit-button">
                    <Button className="button" colorScheme='blue' color='white' onClick={postOrder}>Encomendar</Button>    
                </Box>
                {orderSuccess ? <Alert status="success">
                    <AlertIcon />
                    Encomenda registada com sucesso
                </Alert>: <div>
                    
                </div>}
                 
                {orderFail ? 
                <Alert status="error">
                    <AlertIcon />
                    Erro na Encomenda, tente denovo
                </Alert>: <div>
                    
                </div>}
                
            </Box>
            <Divider orientation="vertical" />
            <Box className="orders-history-order-box">
                {historico ? <DataGrid rows={historico} columns={columns} pageSize={10} />: <div>
                    Sem Encomendas realizadas
                </div>}
                
                
            </Box>
        </Box>
    )
}

export default Orders
