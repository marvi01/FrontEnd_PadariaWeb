/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import Pao from '../../imagens/Pao.jpg';
import Carro from '../../imagens/carro.png';
import './EspProd.css'
import { Link, Redirect } from 'react-router-dom';

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
      categoria_id: 0
    }
  };

  }


  componentDidMount() {
    const { id } = this.props.match.params;
    const url = `http://localhost:8000/api/Produtos/` + id;
    fetch(url)
      .then(data => data.json().then(data => this.setState({ data })))
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
    let precoG = 16.00 / 1000;
    let valortotal = qde * precoG;
    console.log(valortotal);
  }

  adicionarCarrinho() {
    alert('Adicionado no carrinho')
  }

  formulario() {
    var { dados } = this.state.data;
    console.log(this.state.data);
    return (

      <div>
        <div className="formula">
          <div className="imagem direita">
            <figure className="figure  ">
              <img src={Pao} className="figure-img img-fluid rounded" alt="Responsive image" />
              <figcaption className="figure-caption text-right"></figcaption>
            </figure>
          </div>
        </div>

        <div className="titulos">
          <fieldset className="border">
            <div className="posicao">
              <h1 className=" ">dados.nomeProd</h1>
              <h3 className="">farinha de trigo, água, sal, fermento biológico e melhorador de farinha</h3>
              <div className="form-row">
                <form action="">
                  <label className="h4">Quantidade: </label>
                  <input ref={this.handleInputRef} onInput={this.preco} id="qde" type="number" className="form-control inputss" placeholder="Peso em grama" />
                  <small id="emailHelp" className="form-text text-muted">R$ {}/Kg</small>
                  <label className="h4">Valor total:R$ {}</label>
                  <div className=" ima"><br></br>
                    <Link to="/Carrinho" onClick={this.adicionarCarrinho} className="btn btn-success ">
                      <img src={Carro} className=" img-fluid carro " />
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </fieldset>
        </div>
        {}
      </div>

    )
  }

  render() {
    return (

      <div>
        {this.componentDidMount}
        <div>{this.exibeErro() || this.formulario()}</div>
      </div>
    );
  }
}
export default index;