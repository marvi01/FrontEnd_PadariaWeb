import React, { Component } from 'react';
import './Produto.css';
import { Link } from 'react-router-dom';

class AdminProduto extends Component {
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
                console.log(data);
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
            const Prod = data.map((item, indice) => (
                <div key={indice} className="card tamanho group" >
                    <img className="card-img-top img-fluid " src={"data:imagem/png;base64, " + item.imagem} alt="alt" />
                    <div align="center" className="body card-body">
                        <h4 className="card-title">{item.nomeProd}</h4>
                        <h3 className="card-text"> R${item.valor.toFixed(2).replace(".", ",")}</h3>
                        <Link to={`AtualizarProduto/${item.id}`} className="btn btn-warning ">Editar</Link>
                        <Link onClick={() => {
                            let token = JSON.parse(sessionStorage.getItem('JWT_token'));
                            fetch("http://localhost:8000/api/Produtos/" + item.id, {
                                method: "delete",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": "Bearer " + token.data.access_token
                                }
                            }).then(() => data.json().then(data => {
                                    console.log(data);
                                    
                                }))
                                .catch(erro => this.setState(erro));
                                alert("Deletado com sucesso ");
                                window.location.reload();
                        }} className="btn btn-danger ">Excluir</Link>
                    </div>
                </div>
            )
            )
            return Prod;
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
    addProd = () => {
        return (
            <div>
                <div align="center" className="card tamanho group" >
                    <Link to="/AdicionarProduto">
                        <div className="card-img-top img-fluid "  ><i className=" fa-10x fas fa-plus-circle "></i> </div>
                        <div align="center" className="body card-body">
                            <h4 className="card-title">Adicionar Produto</h4>
                        </div>
                    </Link>
                </div>

            </div>
        )
    }
    //
    render() {
        return (


            <div>
                {this.exibeErro() || this.exibeProduto()}
                {this.addProd()}
            </div>
        );
    };


};

export default AdminProduto;