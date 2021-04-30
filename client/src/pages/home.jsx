import React, { useState,useEffect,useContext } from 'react';
import axios from 'axios';
import { Input,Button,Box } from "@chakra-ui/react";
import '../App.css';
import { Link, useHistory } from "react-router-dom";
import './css/home.css';

const Home = () => {
    const history = useHistory();


    const pushToLogin = () => {
        history.push("/login");
    }

    
    return (
    <div className = 'home'>
        <Button pos="absolute" top="60%" left="50%" colorScheme='blue' color='white' onClick={pushToLogin}>Join now</Button>
        <div className = 'ferrache'>
            Ferrache
        </div>
        <div className = 'title'>
            Managing made easy
        </div>
        <div className = 'subtitle'>
            Dashboards, searches and more.
        </div>
        <img className='homeImg' src={process.env.PUBLIC_URL + '/homeImg.png'} /> 
    </div>
    );
}
export default Home;