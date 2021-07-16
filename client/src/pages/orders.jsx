import React, { useEffect, useState } from 'react'
import { NumberDecrementStepper, Box, Textarea, Input, Button, NumberInputField, NumberInput, NumberInputStepper, NumberIncrementStepper, Divider, Alert, AlertIcon,useToast } from "@chakra-ui/react"
import './css/orders.css';
import axios from 'axios';
import { DataGrid } from '@material-ui/data-grid';

const Orders = () => {
    const [historico, sethistorico] = useState([]);
    const [quantidade, setquantidade] = useState(10);
    const [desc, setdesc] = useState("");
    const [ref, setref] = useState("");


    const toast = useToast()

    useEffect(() => {
        axios.get('/api/orders/user/').then((res) => {
            sethistorico(res.data)
        }).catch((error) => {
            console.log(error)
        });
    }, [])

    
    const postOrder = () => {
        const body = {
            "ref": ref,
            "quantidade": quantidade,
            "descriçao": desc
        }
        axios.post('/api/orders/', body).then((res) => {
            setdesc("");
            setref("");
            setquantidade(0);

            const newEnc = {
                "id":res.data.id_encomenda,
                "id_artigo": body.ref,
                "id_fornecedor": res.data.fornec,
                "dataEncomenda": res.data.data,
                "quantidade": body.quantidade
            }
                    sethistorico(oldArray => [...oldArray, newEnc])
            toast({
                title: "Encomenda criada com sucesso",
                description: "",
                status: "success",
                duration: 4000,
                isClosable: true,
            })

        }).catch((error) => {
            console.error(error)
            toast({
                title: "Artigo inexistente",
                description: "Encomenda não realizada",
                status: "error",
                duration: 4000,
                isClosable: true,
            })
        });
    }

    // { field: 'id', headerName: 'id', width: 90 },
    const columns = [
        { field: 'id_artigo', headerName: 'Ref', width: 120 },
        { field: 'id_fornecedor', headerName: 'Fornecedor', width: 150 },
        { field: 'dataEncomenda', headerName: 'Data', width: 170 },
        { field: 'quantidade', headerName: 'Qtt', type: 'number', width: 100 },
    ]


    return (
        <Box className="orders-fullbox">
            <Box className="orders-new-order-box">
                <Box className="orders-title">
                    Reforço de stock de artigos
                </Box>
                <Box className="orders-ref-input-box">
                    <Input errorBorderColor="crimson" value={ref} variant="outline" placeholder="Referencia" onChange={(e) => { setref(e.target.value) }} />
                </Box>
                <Box className="orders-qtt-input-box">

                    <NumberInput step={5} min={0} max={3000} value={quantidade} onChange={(e) => { setquantidade(e) }}>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </Box>
                <Box className="orders-desc-input-box">
                    <Textarea placeholder="Descrição da encomenda" value={desc} onChange={(e) => { setdesc(e.target.value) }} />
                </Box>
                <Box className="orders-submit-button">
                    <Button className="button" colorScheme='blue' color='white' onClick={postOrder}>Encomendar</Button>
                </Box>

            </Box>
            <Divider orientation="vertical" />
            <Box className="orders-history-order-box">
                {historico ? <DataGrid rows={historico} columns={columns} pageSize={10} /> : <div>
                    Sem Encomendas realizadas
                </div>}


            </Box>
        </Box>
    )
}

export default Orders
