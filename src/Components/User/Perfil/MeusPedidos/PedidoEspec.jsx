import React, { Component } from 'react';
import Perfil from '../Perfil';

class PedidoEspec extends Component {
    constructor(props) {
        super(props);
        this.state = {
            compra: {
                "venda_id": 0,
                "produto_id": 0,
                "users_id": 0
            },
            produto: false,
            redirect: false,
            lembrar: "off",
            erro: null,
            status: false
        }
    }
    componentDidMount() {
        const id = this.props.match.params;
        let token = JSON.parse(sessionStorage.getItem('JWT_token'));
        let array = [];
        fetch("http://localhost:8000/api/CompraVenda/" + id.id, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token.data.access_token
            }
        }).then(data => data.json().then(data => {
            const prod = data.data;
            console.log(prod);
            if(prod && prod.length){
            prod.map((item) => {
                fetch("http://localhost:8000/api/ProdutoCopy/"+ item.produto_id)
                    .then(data => data.json().then(data => { 
                        array.push(data.data)
                        console.log(array.length);
                        this.setState({produto:array})
                        this.setState({status:data.status})
                    }))
                    
            })
        }

        }));


    }
    headTabela() {
        const head = (
            <thead className="thead-dark ">
                <tr>
                <th scope="col">Quantidade</th>
                    <th scope="col">Nome do Produto</th>
                    <th scope="col">Descrição</th>
                    <th scope="col">valor</th>
                </tr>
            </thead>
        )
        return head;
    }
     tableProd = () => {
        const status = this.state.status;
        const produtos = this.state.produto;
        if (produtos && status===200) {
            const ProdRow = produtos.map((item, indice) => (
                <tr key={indice}>
                    <td>{item.quantidade}</td>
                    <td >{item.nomeProd}</td>
                    <td>{item.descricao}</td>
                    <td>R$ {item.valor.toFixed(2).replace(".", ",")} </td>
                </tr>

            )
            )
            return ProdRow
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
        return (
            <div>
                <Perfil />
                <table className="table">
                    {this.headTabela()}
                    <tbody>
                        {this.tableProd()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default PedidoEspec;