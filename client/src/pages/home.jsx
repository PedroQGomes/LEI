import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Input,Button } from "@chakra-ui/react";
import '../App.css'

const Home = (props) => {

    const [user, setuser] = useState(() => {
        axios.get('/user/info').then((res) => {
            console.log(res);
            return res;
        }).catch((error) => {
            console.log(error);
            props.history.push('/login');
            return null;
        });
    })
    

    return (
    <div>
        <div>home</div>
    </div>
    );
}
export default Home;