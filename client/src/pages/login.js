import React, { Component } from 'react';
import axios from 'axios';
import { Input,Button } from "@chakra-ui/react";
import '../App.css'

class Login extends Component {
  state = {
    username: "",
    password : ""
  };


  handleSubmit = () => {
    console.log(this.state);
    axios.post('/user/login',{
        username: this.state.username,
	    password: this.state.password
    }).then((res) => {
        console.log("bouas irmaos");
    
    });

  }


  handleChange = (event) =>{
      this.setState({
        [event.target.name]: event.target.value
      });

  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}> 
        <div className="DottedBox"> 
            <Input placeholder="username" name="username" onChange={this.handleChange}/>
        </div>
        
        <div className="DottedBox"> 
            <Input placeholder="password" type='password' name="password" onChange={this.handleChange}/>
        </div>

        <div className="DottedBox"> 
            <Button colorScheme="blue" onClick={this.handleSubmit}>Log In</Button>
        </div>
      </form>
      
    );
  }
}

export default Login;