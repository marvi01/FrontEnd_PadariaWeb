import React, { Component } from 'react';
import './Login.css';
import { Link, Redirect } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
          
          "email":"",  
          "password":"",
      },
      redirect: false,
      lembrar: "off",
      erro: null,
    }
  }
  exibeErro() {
    const { erro } = this.state;

    if (erro) {
      return (
        <div className="alert alert-danger" role="alert">
          
        </div>
      );
    }
  }

  htmlLogin() {

    return (
      <div className="layout">
        <form onSubmit={this.handleSubmit}>
          <fieldset >

            <div className="form-group">
              <h3 align="center">Logar</h3>
              <label for="exampleInputEmail1">Email </label>
              <input onChange={this.handleInputChange} name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>

            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Senha</label>
              <input onChange={this.handleInputChange} name="password" type="password" className="form-control" id="exampleInputPassword1"></input>
            </div>          
              <div className="">     
                <p><Link to="/Cadastro" className="form-check-label texto">Cadastre-se </Link></p>
              </div>

            <button type="submit" className="btn btn-outline-success">Logar</button>

          </fieldset>
        </form>
      </div>


    );
  }
  handleSubmit = event => {
    fetch("http://localhost:8000/api/auth/login", {
      method: "post",
      body: JSON.stringify(this.state.data),
      headers: {
        "Content-Type": "application/json"
      } 
    })
      .then(data => {
        if (data.ok) {
            this.setState({ redirect: true });
            return data.json();

        } else {
          data.json().then(data => {
            if (data.error) {
              this.setState({ erro: data.error });
            }
          });
        }
      }).then(token =>{ 
        console.log(token.data.user.admin);
        sessionStorage.setItem("JWT_token",JSON.stringify(token) );
        sessionStorage.setItem("idSession",token.data.user.id);
        sessionStorage.setItem("admin",parseInt(token.data.user.admin));
        //token.data.user.admin
        window.location.reload();
      })
      .catch(erro => this.setState({ erro: erro }));
    event.preventDefault();
  };
  handleInputChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState(prevState => ({
      data: { ...prevState.data, [name]: value }
    }));
    console.log(this.state.data);
  };
  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to="/"/>;
    } else {
      return (
        <div>
          {  this.htmlLogin()}
        </div>
      );
    }
  }
}

export default Login;





