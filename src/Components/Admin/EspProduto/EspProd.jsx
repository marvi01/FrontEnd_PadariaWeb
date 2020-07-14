/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import './EspProd.css'
import {  Redirect } from 'react-router-dom';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:{
      id: 0,
      nomeProd: "",
      descricao: "",
      valor: 0,
      imagem: "",
      quantidade: 0,
      created_at: "",
      updated_at: "",
      categoria_id: 0,
      valorfinal:0
    },
    redirect:false
  };


  }


  componentDidMount() {
    const { id } = this.props.match.params;
    const url = `http://localhost:8000/api/Produtos/` + id;
    fetch(url)
      .then(data => data.json().then(data => this.setState({data: data.data })))
      .catch(erro => this.setState(erro));
  }

  exibeErro() {
    const { erro } = this.state;

    if (erro) {
      return (
        <div className="alert alert-danger" role="alert">
          Erro de conexão com o servidor
        </div>
      );
    }
  }
  handleInputRef = (input) => {
    this.input = input;
  };
  preco = () => {
    let qde = `${this.input.value}`;
    console.log(qde)
    let valortotal = qde * this.state.data.valor;
    this.setState(prevState => ({
      data: { ...prevState.data, valorfinal: valortotal }
    }));
    this.setState(prevState => ({
      data: { ...prevState.data, quantidade: qde }
    }));
    console.log(this.state.data);
  }

  carrinho =() => {
    let qde = this.state.data.quantidade;
    if(qde === 0){
      alert("Digite algum valor na quantidade ");}
    else if(qde !== 0){
        console.log(qde);
    let prod = JSON.stringify(this.state.data);
    sessionStorage.setItem(sessionStorage.length,prod);
    console.log(prod);
    this.setState({ redirect: true });
    alert("Adicionado no Carrinho com sucesso")}
    }

  formulario() {
    return (
      <div>

      </div>

    )
  }

  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to="/" />;
    } else {
    return (

      <div>
        <div>{this.exibeErro() || this.formulario()}</div>
      </div>
    );
    }
  }
}
export default index;