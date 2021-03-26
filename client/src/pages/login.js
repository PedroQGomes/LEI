import React, { Component } from 'react';
import axios from 'axios'

class Login extends Component {
  state = {
    response: {}
  };
  
  componentDidMount() {
    axios.post('/user/login',{
        username:"Filipe",
	    password:"filipe"
    }).then((res) => {
        //console.log(document.cookie);
        axios.get('item/PV18SN91645').then((res)=> {
            const response = res.data;
            console.log(response);

            this.setState({response});
        });
      
    });
  }



  render() {
    return (
      <div className="App">
        <h1>Hello from the frontend!</h1>
        <h1>{JSON.stringify(this.state.response)}</h1>
      </div>
    );
  }
}

export default Login;