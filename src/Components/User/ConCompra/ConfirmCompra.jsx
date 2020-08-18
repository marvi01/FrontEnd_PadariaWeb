import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './ConfirmCompra.css'

class Confirmvenda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endereco: {
        "nomeend": "",
        "cep": "",
        "logradouro": "",
        "complemento": null,
        "bairro": "",
        "localidade": "",
        "uf": "",
        "unidade": "",
        "ibge": "",
        "gia": null,
        "users_id": 0,
      },
      "venda": {
        "valor": 0,
        "cartao": 0,
        "observacoes": null,
        "Endereco_id": 0,
        "users_id": 0,

      },
      compra: {
        "venda_id": 0,
        "produto_id": 0,
        "users_id": 0,
        "updated_at": null,
        "created_at": null
      },
      produtos: [],
      valorfinal: [],
      redirect: false,
      lembrar: "off",
      erro: null,
      status: false
    }
  }
  componentDidMount() {
    let id = sessionStorage.getItem('idSession');
    let token = JSON.parse(sessionStorage.getItem('JWT_token'));
    fetch("http://localhost:8000/api/EnderecoList/" + id, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token.data.access_token
      }
    }).then(data => data.json().then(data => {
      console.log(data);
      this.setState({ endereco: data.data })
      this.setState({ status: data.status })
    }));
    var array = []
    var array2 = []
    for (let i = 0; i < 99; i++) {
      let tranformador = sessionStorage.getItem(i);
      if (tranformador != null) {
        let tranformado = JSON.parse(tranformador);
        array2.push(tranformado.valorfinal);
        array.push(tranformado);
      }
    }
    console.log(array);
    this.setState({ produtos: array });
    this.setState({ valorfinal: array2 });
    this.setState(prevState => ({
      venda: { ...prevState.venda, users_id: parseInt(id) }
    }));
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
  Endereco = () => {
    const Prod = this.state.endereco;
    if (Prod && this.state.status === 200) {
      const ProdutoCarrinho = Prod.map((item, indice) =>
        (
          <div key={indice} className="form-check form-check-inline">
            <div className="form-check">
              <input onChange={() => {
                this.setState(prevState => ({
                  venda: { ...prevState.venda, Endereco_id: item.id }
                }));
                console.log(this.state.venda);
              }} className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" />
              <label className="form-check-label" htlmlfor="exampleRadios1">
                {item.nomeend}<br />
                {item.logradouro}, {item.unidade}{" " + item.bairro}<br />
                {item.localidade}/{item.uf}
              </label>
            </div>
          </div>
        )
      );
      return ProdutoCarrinho
    } else if (!this.state.status) {
      return (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>)
    } else {
      return (<div>
        Nenhum Endreço encontrado
      </div>)
    }
  }
  produtos = () => {
    const Prod = this.state.produtos;
    const Valor = this.state.valorfinal;
    var ProdutoCarrinho;
    var recebe = 0;
    if (Valor && Valor.length) {
      var valor
      const colunaFinal = Valor.reduce(function (total, numero) {
        valor = total + numero;
        return valor;
      }, 0);
      recebe = colunaFinal + 0;
    };
    
    const HtmlTotal = (
      <tr>
        
        <th scope="row">Total</th>
        <td ref={this.handleInputRef} >R${recebe.toFixed(2).replace(".", ",")}</td>
      </tr>
    )
    if (true) {
      if (Prod && Prod.length) {
        ProdutoCarrinho = Prod.map((item, indice) =>
          (
            <tr key={indice}>
              <th scope="row">{item.nomeProd}</th>
              <td>R${item.valorfinal.toFixed(2).replace(".", ",")}</td>
            </tr>
          )
        )
      }
      return (

        <table className="table" style={{ width: 18 + "em" }}>
          <thead className="thead-light">
            <tr>
              <th scope="col">Produtos</th>
              <th scope="col"></th>
            </tr>
          </thead>
          {ProdutoCarrinho}
          {HtmlTotal}
        </table>)
    }
  }
  formPagamento = () => {
    return (
      <div>
        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
          <li className="nav-item" role="presentation">
            <a onClick={() => {
              this.setState(prevState => ({
                venda: { ...prevState.venda, cartao: false }
              }));
              console.log(this.state.venda);
            }
            } className="nav-link  " id="pills-home-tab" venda-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="false">
              <i className="far fa-money-bill-alt"></i> Dinheiro</a>
          </li>
          <li className="nav-item" role="presentation">
            <a onClick={() => {
              this.setState(prevState => ({
                venda: { ...prevState.venda, cartao: true }
              }));
              console.log(this.state.venda);
            }
            } className="nav-link" id="pills-profile-tab" venda-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">
              <i className="far fa-credit-card"> Cartão</i>
            </a>
          </li>
        </ul>
      </div>
    )
  }
  obs = () => {
    return (
      <div className="input-group" style={{ width: 25 + "em" }}>
        <textarea ref={this.handleInputRef} onInput={this.handleInputChange} value={this.state.venda.observacoes} name="observacoes" className="form-control" aria-label="With textarea" placeholder="Adicione aqui qualquer observação"></textarea>
      </div>
    )
  }
  handleInputRef = (input) => {
    this.input = input;
  };
  handleInputChange = () => {
    let qde = `${this.input.value}`;
    this.setState(prevState => ({
      venda: { ...prevState.venda, observacoes: qde }
    }));
  }
  handleSubmit = event => {

    let token = JSON.parse(sessionStorage.getItem('JWT_token'));
    const confirm = window.confirm("Deseja Finalizar a venda?");
    if (confirm) {
      fetch("http://localhost:8000/api/Venda", {
        method: "post",
        body: JSON.stringify(this.state.venda),
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token.venda.access_token
        }
      })
        .then(venda => {
          if (venda.ok) {
            alert('venda finalizada com sucesso');
            this.setState({ redirect: true });
            for (let i = 0; i < 99; i++) {
              sessionStorage.removeItem(i);
            }
            return venda.json();
          } else {
            venda.json().then(venda => {
              if (venda.error) {
                this.setState({ erro: venda.error });
              }
            });
          }
        }).catch(erro => { this.setState({ erro: erro }); console.log(erro); });
      event.preventDefault()
    }
  };
  htmlConfirmavenda = () => {
    return (
      <form onSubmit={this.handleSubmit} >
        <div>
          {this.Endereco()}
          <Link to="/Perfil/Endereco"><i className="fas fa-plus-circle"></i>Criar novo Endereço</Link>
        </div>
        {this.produtos()}
        {this.formPagamento()}
        {this.obs()}
        <button type="submit" className="btn btn-success mb-6" >Success</button>
      </form>
    )
  }
  render() {
    const redirect = this.state.redirect;
    if (redirect) {
      return (
        <Redirect to="/"></Redirect>
      )
    }
    return (
      <div>
        {this.htmlConfirmavenda()}
      </div>
    );
  }
}
export default Confirmvenda;