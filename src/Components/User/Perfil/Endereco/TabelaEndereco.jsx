import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//https://viacep.com.br/ws/35570-496/json
class tabelaEndereco extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataget: {
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
                "users_id": 1,
            },
            status:false,
            redirect: false,
            lembrar: "off",
            erro: null,
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
            this.setState({ dataget: data.data })
            this.setState({status: data.status})
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
    headTabela() {
        const head = (
            <thead className="thead-dark ">
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Rua</th>
                    <th scope="col">Bairro</th>
                    <th scope="col">Numero</th>

                    <th scope="col">Editar / Deletar</th>
                </tr>
            </thead>
        )
        return head;
    }
    tableEndereco = () => {
        const Prod = this.state;
        const End = this.state.dataget;
        console.log(this.state);
        if (End && Prod.status===200) {
            const ProdutoCarrinho = End.map((item, indice) =>
                (

                    <tr key={indice}>
                        <td >{item.nomeend}</td>
                        <td >{item.logradouro}</td>
                        <td >{item.bairro}</td>
                        <td >{item.unidade}</td>

                        <td >
                            <Link to={"Endereço/AlterarEnderco/" + item.id} className="btn btn-warning">Editar</Link>
                            <button onClick={() => {
                                let token = JSON.parse(sessionStorage.getItem('JWT_token'));
                                fetch("http://localhost:8000/api/Endereco/" + item.id, {
                                    method: "delete",
                                    headers: {
                                        "Content-Type": "application/json",
                                        "Authorization": "Bearer " + token.data.access_token
                                    }
                                })
                                    .then(() => { alert("Deletado com sucesso "); window.location.reload() })
                                    .catch(erro => this.setState(erro));
                            }} href="/Perfil" className="btn btn-danger">Deletar</button>
                        </td>
                    </tr>
                )
            )
            return ProdutoCarrinho
        } else if(!this.state.status) {
            return (
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>)
          }else{
            return( <div>
              Nenhum Endreço encontrado 
            </div>)
          }
    }
    render() {
        return (
                <table className="table">
                    {this.headTabela()}
                    <tbody>
                        {this.tableEndereco()}
                    </tbody>
                </table>
            
        )
    }
}

export default tabelaEndereco;