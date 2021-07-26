import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import "./Cadastro.css";
class Cadastro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        "name": "",
        "email": "",
        "password": "",
        "password_confirmation": "",
        "admin": "0"
      },
      redirect: false
    }
  }


  htmlCadastro = () => {

    const html = (
      <div className="meio" >
        <form className="layout"  onSubmit={this.handleSubmit}>
        <h3 align="center">Cadastrar</h3>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label >Nome </label>
              <input onChange={this.handleInputChange} name="name" type="text" className="form-control" id="name" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label >Email</label>
              <input onChange={this.handleInputChange} name="email" type="email" className="form-control" id="inputEmail4" />
            </div>

          </div>
      
          <div className="form-row">
            <div className="col col-md-4">
              <label >Senha</label>
              <input onChange={this.handleInputChange} name="password" type="password" className="form-control" id="inputPassword4" />
            </div>
            <div className="col col-md-4">
              <label>Confirme sua senha</label>
              <input onChange={this.handleInputChange} name="password_confirmation" type="password" className="form-control" id="inputConfirmPassword4" />
            </div>
          </div>
          <br/>
          <button type="submit" className="btn btn-primary">Cadastrar</button>
        </form>
      </div>

    )
    return html;

  }
  handleInputChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState(prevState => ({
      data: { ...prevState.data, [name]: value }
    }));
    console.log(this.state.data);
  };
  handleSubmit = event => {
    console.log(this.state.data);
    fetch("http://localhost:8000/api/auth/register", {
      method: "post",
      body: JSON.stringify(this.state.data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(data => {
        if (data.ok) {
          this.setState({ redirect: true });
          console.log(data);
          alert('Cadastrado com sucesso')
          return data.json();

        } else {
          data.json().then(data => {
            if (data.error) {
              this.setState({ erro: data.error });
            }
          });
        }
      }).catch(erro => this.setState({ erro: erro }));
    event.preventDefault();
  };

  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to="/" />;
    } else {
      console.log(this.state.erro)
      return (
        <div>
          {this.htmlCadastro()}
        </div>
      );
    }
  }
}

export default Cadastro;

