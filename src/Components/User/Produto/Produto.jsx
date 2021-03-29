/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import './Produto.css';
import { Link } from 'react-router-dom';
import AdminProduto from './AdminProduto';


class Produto extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {
        id: 0,
        nomeProd: "",
        descricao: "",
        valor: 0,
        imagem: "",
        quantidade: 0,
        created_at: "",
        updated_at: "",
        categoria_id: 0,
        valorfinal: null
      },
      status: false
    };
  };

  componentDidMount() {
    fetch("http://localhost:8000/api/Produtos")
      .then(data => data.json().then(data => {
        this.setState({ data: data });
        this.setState({ status: data.status })
      }))
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
  exibeProduto = () => {
    const { data } = this.state.data;
    const obj = this.state.status;
    if (data && obj === 200) {
      let admin = sessionStorage.getItem('admin');
      if (admin === '1') {
        return (
          <div>
            <AdminProduto />
          </div>
        )
      } else {
        const Prod = data.map((item, indice) => (

          <div key={indice} className="card tamanho group" >
            <img className="card-img-top img-fluid " src={"data:imagem/png;base64, " + item.imagem} />
            <div align="center" className="body card-body">
              <h4 className="card-title">{item.nomeProd}</h4>
              <h3 className="card-text"> R${item.valor.toFixed(2).replace(".", ",")}</h3>
              <Link to={`Produtos/${item.id}`} className="btn btn-warning bg-light-brown ">Comprar</Link>
            </div>
          </div>
        )
        )
        return Prod;
      }
    } else if (!this.state.status) {
      return (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>)
    } else {
      return (<div>
        Nenhum Produto encontrado
      </div>)
    }
  }
  //
  render() {
    return (
      <div>
        {this.exibeErro() || this.exibeProduto()}

      </div>
    );
  };


};
export default Produto;
//  <img className="card-img-top img-fluid " src={"https://i.ibb.co/"+item.imagem} />