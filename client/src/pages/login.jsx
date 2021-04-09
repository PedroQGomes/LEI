import React, {useState,useContext,useEffect} from 'react';
import { Input,Button } from "@chakra-ui/react";
import '../App.css';
import { useAuth } from '../context/AuthContext';
import { Link, useHistory } from "react-router-dom";

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const { login } = useAuth();


  async function handleSubmit(e) {

      try {
      await login(username, password);
      history.push("/");
    } catch {
      console.log("Failed to log in");
    }

  };


  const handleChange = (event) =>{
      if(event.target.name === 'username'){
        setUsername(event.target.value);

      }else if(event.target.name === 'password'){
        setPassword(event.target.value);
      }

  };


  if(loading){
    return (
      <div > 
            loading...
      </div>
    );
  }else{
 
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
  }
  
};
//
export default Login;