import React, {useState} from 'react';
import axios from 'axios';
import { Input,Button } from "@chakra-ui/react";
import '../App.css';

const Login = (props) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.log(username);
    console.log(password);
    axios.post('/user/login',{
        username: username,
	      password: password
    }).then((res) => {
        console.log(res);
        props.history.push('/');
    
    });

  };


  const handleChange = (event) =>{
      if(event.target.name === 'username'){
        setUsername(event.target.value);

      }else if(event.target.name === 'password'){
        setPassword(event.target.value);
      }

  };

 
    return (
      <form onSubmit={handleSubmit}> 
        <div className="DottedBox"> 
            <Input placeholder="username" name="username" onChange={handleChange}/>
        </div>
        
        <div className="DottedBox"> 
            <Input placeholder="password" type='password' name="password" onChange={handleChange}/>
        </div>

        <div className="DottedBox"> 
            <Button colorScheme="blue" onClick={handleSubmit}>Log In</Button>
        </div>
      </form>
      
    );
  
};

export default Login;