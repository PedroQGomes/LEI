import React, { useState,useEffect,useContext } from 'react';
import axios from 'axios';
import { Input,Button } from "@chakra-ui/react";
import '../App.css';
import { Link, useHistory } from "react-router-dom";


const Home = () => {
    const history = useHistory();


    const closeMobileMenu = () => {
        history.push("/login");
    }

    
    return (
    <body className = 'home'>
        <Button colorScheme='white' color='black' onClick={closeMobileMenu}>LogIn</Button>
    </body>
    );
}
export default Home;