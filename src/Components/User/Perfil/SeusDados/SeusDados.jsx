import React, { Component } from 'react';
import Perfil from '../Perfil'
import { Redirect } from 'react-router-dom';

class SeusDados extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "data": {
        "id": 17,
        "name": "",
        "email": "",
        "email_verified_at": null,
        "admin": 0,
        "created_at": "",
        "updated_at": ""
      },
      status:false,
      redirect: false
    }
  }
  async componentDidMount() {
    let id = sessionStorage.getItem('idSession');
    let token = JSON.parse(sessionStorage.getItem('JWT_token'));
    console.log(token.data.access_token);
    fetch('http://localhost:8000/api/users/' + id, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token.data.access_token
      }
    }).then(data => data.json().then(data => {this.setState({ data: data.data });
  this.setState({status:data.status})}))
      .catch(erro => this.setState(erro));
  }
  htmlCadastro = () => {
    if (this.state.data && this.state.status===200) {
      const html = (<div >
        <form onSubmit={this.handleSubmit}>
          <div className="form-row">
            <div className="form-group col-md-3">
              <label >Nome </label>
              <input value={this.state.data.name} onChange={this.handleInputChange} name="name" type="text" className="form-control" id="name" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-3">
              <label >Email</label>
              <input value={this.state.data.email} onChange={this.handleInputChange} name="email" type="email" className="form-control" id="inputEmail4" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-2">
              <label >Senha</label>
              <input value={this.state.data.password} onChange={this.handleInputChange} name="password" type="password" className="form-control" id="inputPassword4" />
            </div>
          </div>
          <div className="form-group">
          </div>
          <button type="submit" className="btn btn-primary">Sign in</button>
        </form>
        <a onClick={() => {
          sessionStorage.setItem("authTeste", 'logado')
          console.log(sessionStorage.getItem("authTeste"));
        }} href="/">Teste</a>
      </div>
      )
      return html;
    } else if (!this.state.status) {
      return (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>)
    } else {
      return (<div>
        Nenhum Usuario encontrado
      </div>)
    }
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
    fetch("http://localhost:8000/api/cadastro", {
      method: "post",
      body: JSON.stringify(this.state.data),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        "Content-Type": "application/json"
      }
    })
      .then(data => {
        if (data.ok) {
          this.setState({ redirect: true });
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
    console.log(this.state.data);
    if (redirect) {
      return <Redirect to="/" />
    } else {
      console.log(this.state.erro)
      return (
        <div>
          <Perfil />
          {this.htmlCadastro()}
        </div>
      );
    }
  }
}


export default SeusDados;