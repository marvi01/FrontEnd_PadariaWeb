/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import './EspProd.css'
import { Redirect } from 'react-router-dom';

class index extends Component {
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
        valorfinal: 0
      },
      status: false,
      redirect: false
    };


  }


  componentDidMount() {
    const { id } = this.props.match.params;
    const url = `http://localhost:8000/api/Produtos/` + id;
    fetch(url)
      .then(data => data.json().then(data => {
        this.setState({ data: data.data });
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
  handleInputRef = (input) => {
    this.input = input;
  };
  preco = () => {
    let qde = `${this.input.value}`;
    let valortotal = qde * this.state.data.valor;
    this.setState(prevState => ({
      data: { ...prevState.data, valorfinal: valortotal }
    }));
    this.setState(prevState => ({
      data: { ...prevState.data, quantidade: qde }
    }));
  }

  carrinho = () => {
    let qde = this.state.data.quantidade;
    let verific = sessionStorage.getItem(this.state.data.id)
    JSON.parse(verific);
    if (qde === 0) {
      alert("Adicione alguma quantidade de item");
    }
    else {
      if (verific === null) {
        let prod = JSON.stringify(this.state.data);
        sessionStorage.setItem(this.state.data.id, prod);
        console.log(prod);
        this.setState({ redirect: true });
        alert("Adicionado no Carrinho com sucesso")
      } else {
        const permite = window.confirm('Atualizar o Produto: ' + this.state.data.nomeProd);
        if (permite) {
          let prod = JSON.stringify(this.state.data);
          sessionStorage.setItem(this.state.data.id, prod);
          console.log(prod);
          this.setState({ redirect: true });
          alert("Adicionado no Carrinho com sucesso")
        }
      }
    }
  }
  botaoCompra = () => {
    let auth = sessionStorage.getItem('JWT_token');
    if (auth && auth.length) {
      return (
        <button type="submit" onClick={this.carrinho} className="btn btn-success ">
          Adicionar no Carrinho
        </button>
      )
    } else {
      return (
        <div>
        <button type="submit" onClick={this.carrinho} className="btn btn-success " disabled>
          Adicionar no Carrinho
        </button>
        </div>
      )
    }
  }
  //IMAGENS DE TAMANHO MAIORES OU PROPORCIONAIS A 350x350px
  formulario() {
    if (this.state.status === 200) {
      return (
        <div className="geral ">
          <div className="  card mb-3 ">
            <div className="bg-card row no-gutters bg-middle-brown">
              <div className="col-md-4">
                <img src={"data:imagem/png;base64," + this.state.data.imagem} className="card-img" alt="..." />
              </div>
              <div className="col-md-8">
                <div className="card-body" style={{ width: 540 + "px" }}>
                  <h1 className=" ">{this.state.data.nomeProd}</h1>
                  <p className="h4">{this.state.data.descricao}</p>
                  <div className="form-row">
                    <label className="h4">Quantidade: </label><br></br>
                    <input ref={this.handleInputRef} onInput={this.preco} maxLength="3" id="qde" className="form-control inputss col-md-4" placeholder="Quantidade unitária" />
                    <label className="h4">Valor total:R$ {this.state.data.valorfinal.toFixed(2).replace(".", ",")}</label>
                    <div className="ima"><br></br>
                      {this.botaoCompra()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
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
/**
 * <div className="geral" >
        <div className="formula">
          <div className="imagem esquerda">
            <figure className="figure  ">
              <img src={"https://i.ibb.co/"+this.state.data.imagem}  className="figure-img img-fluid rounded" alt="Responsive image" />
              <figcaption className="figure-caption text-right"></figcaption>
            </figure>
          </div>
        </div>

        <div className="titulos">

            <div className="posicao">
    <h1 className=" ">{this.state.data.nomeProd}</h1>
    <h3 className="">{this.state.data.descricao}</h3>
              <div className="form-row">
                  <label className="h4">Quantidade: </label>
                  <input ref={this.handleInputRef} onInput={this.preco} maxLength="3" id="qde" className="form-control inputss" placeholder="Quantidade unitária" />
                  <label className="h4">Valor total:R$ {this.state.data.valorfinal.toFixed(2).replace(".", ",")}</label>
                  <div className=" ima"><br></br>
                    <button type="submit" onClick={this.carrinho} className="btn btn-success ">
                      Adicionar no Carrinho
                    </button>
                  </div>
              </div>
            </div>
        </div>
      </div>
 *
 */