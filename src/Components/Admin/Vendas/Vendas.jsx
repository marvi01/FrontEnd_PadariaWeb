import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Vendas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            venda:{
               "venda_id": 0,
               "produto_id": 0,
               "users_id":0
               },
           redirect: false,
           lembrar: "off",
           erro: null,
           status: false
       }
        
    }
    componentDidMount() {
        let token = JSON.parse(sessionStorage.getItem('JWT_token'));
        fetch("http://localhost:8000/api/Vendas" , {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token.data.access_token
            }
        }).then(data => data.json().then(data => {
            console.log(data);
            this.setState({ venda: data.data })
            this.setState({ status: data.status });
            console.log(this.state.data);
        }));

    }
    headTabela() {
        const head = (
            <thead className="thead-dark ">
                <tr>
                    <th scope="col">Numero da venda</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Pagamento</th>
                    <th scope="col">Observacoes</th>
                    <th scope="col"></th>
                </tr>
            </thead>
        )
        return head;
    }
    tableVenda = () => {
        const Prod = this.state;
        const End = this.state.venda;
        console.log(this.state);
        if (End && Prod.status === 200) {
            const ProdutoCarrinho = End.map((item, indice) => {
            let pag;
            if(item.cartao===1){
               pag=( <td>Cartão de Credito</td>)
            }else{
                pag=( <td>Dinheiro</td>)
            }
              return  (
                <tr key={indice}>
                <td >{item.id}</td>
                <td >R$ {item.valor.toFixed(2).replace(".", ",")}</td>
                {pag}
                <td >{item.observacoes}</td>
                <td >
                    <Link to={"/Admin/Venda/"+ item.id} className="btn btn-primary">Saber Mais</Link>
                </td>
            </tr>
                )
            })
            return ProdutoCarrinho
        } else if (!this.state.status) {
            return (
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>)
        } else {
            return (<div>
                Nenhum Pedido encontrado
            </div>)
        }
    }

    render() {
        return (
            <div>
                <table className="table">
                    {this.headTabela()}
                    <tbody>
                        {this.tableVenda()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Vendas;