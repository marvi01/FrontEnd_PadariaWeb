import React, { Component } from 'react';
import './Login.css';
import { Link, Redirect } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
          "grant_type":"password",
          "client_id":"3",
          "client_secret":"bsCVjzZCefKl2T6NNw3whNCCWRePKchYwQVE4hfm",
          "username":"",  
          "password":"",
          "scope":"usuario"
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
      <div>
        <form onSubmit={this.handleSubmit}>
          <fieldset className="layout">

            <div className="form-group">
              <h3 align="center">Logar</h3>
              <label for="exampleInputEmail1">Email </label>
              <input onChange={this.handleInputChange} name="username" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>

            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Senha</label>
              <input onChange={this.handleInputChange} name="password" type="password" className="form-control" id="exampleInputPassword1"></input>
            </div>
            <div className="form-group form-check ">
              <input onChange={this.handleInputCheck} type="checkbox" className="form-check-input" id="exampleCheck1"></input>
              <div className="">
                <label className="form-check-label" for="exampleCheck1">Lembre-se de mim</label>
                <p><Link to="/Cadastro" className="form-check-label texto">Cadastre-se </Link></p>
              </div>
            </div>
            <button type="submit" className="btn btn-outline-success">Submit</button>

          </fieldset>
        </form>
      </div>


    );
  }
  handleSubmit = event => {
    fetch("http://localhost:8000/oauth/token", {
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
        console.log(token.access_token)
        console.log(token)
        sessionStorage.setItem("oAuth",token);
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
      return <Redirect to="/" />;
    } else {
      console.log(this.state.erro)
      return (
        <div>
          {  this.htmlLogin()}
        </div>
      );
    }
  }
}

export default Login;





