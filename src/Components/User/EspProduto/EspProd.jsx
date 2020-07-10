/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
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
    if(qde==0){
      alert("Digite algum valor na quantidade ");}
    else if(qde !=0){
        console.log(qde);
    let prod = JSON.stringify(this.state.data);
    sessionStorage.setItem(sessionStorage.length,prod);
    console.log(prod);
    this.setState({ redirect: true });
    alert("Adicionado no Carrinho com sucesso")}
    }

  formulario() {
    return (

      <div className="geral" >
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
                <form action="">
                  <label className="h4">Quantidade: </label>
                  <input ref={this.handleInputRef} onInput={this.preco} maxLength="3" id="qde" className="form-control inputss" placeholder="Quantidade unitária" />
                  <label className="h4">Valor total:R$ {this.state.data.valorfinal.toFixed(2).replace(".", ",")}</label>
                  <div className=" ima"><br></br>
                    <button type="submit" onClick={this.carrinho} className="btn btn-success ">
                      Adicionar no Carrinho
                    </button>
                  </div>
                </form>
              </div>
            </div>
        </div>
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