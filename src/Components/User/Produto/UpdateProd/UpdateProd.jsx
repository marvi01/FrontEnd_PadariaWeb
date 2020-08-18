import React, { Component } from 'react';
import '../EspProduto/EspProd.css'
import { Redirect } from 'react-router-dom';

class UpdateProd extends Component {
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
    //IMAGENS DE TAMANHO MAIORES OU PROPORCIONAIS A 350x350px
    formulario() {
        if (this.state.status === 200) {
            return (
                <div className="geral ">
                    <div className="  card mb-3 ">
                        <div className="bg-card row no-gutters bg-middle-brown">
                            <div className="col-md-4">
                                <img src={"https://i.ibb.co/" + this.state.data.imagem} className="card-img" alt="..." />
                            </div>
                            <div className="col-md-8">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputEmail4">Nome do Produto</label>
                                            <input name="nomeProd" onChange={this.handleInputChange} defaultValue={this.state.data.nomeProd} type="text" className="form-control" id="inputEminputText2" />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputPassword4">Preço</label>
                                            <input name="valor" onChange={this.handleInputChange} type="number" className="form-control" defaultValue={this.state.data.valor} id="inputText3" />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputPassword4">Descrição</label>
                                            <textarea name="descricao" onChange={this.handleInputChange} type="text" className="form-control" defaultValue={this.state.data.descricao} id="inputText4" />
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-success">Atualizar Produto</button>
                                </form>
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
        let token = JSON.parse(sessionStorage.getItem('JWT_token'));
        fetch("http://localhost:8000/api/Produtos/"+this.state.data.id, {
          method: "put",
          body: JSON.stringify(this.state.data),
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+token.data.access_token
          }
        })
          .then(data => {
            if (data.ok) {
              this.setState({ redirect: true });
              console.log(data);
              alert('Produto atualizado com sucesso')
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
            return (

                <div>
                    <div>{this.exibeErro() || this.formulario()}</div>
                </div>
            );
        }
    }
}

export default UpdateProd;