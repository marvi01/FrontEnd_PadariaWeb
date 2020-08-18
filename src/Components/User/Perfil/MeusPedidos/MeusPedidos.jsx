import React, { Component } from 'react';
import Perfil from '../Perfil'

class MeusPedidos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "data": {
                "produtos": "",
                "cartao": 0,
                "observacoes": null,
                "Endereco_id": 75,
                "users_id": 0
            },
            redirect: false,
            lembrar: "off",
            erro: null,
            status: false
        }
    }
    componentDidMount() {
        let id = sessionStorage.getItem('idSession');
        let token = JSON.parse(sessionStorage.getItem('JWT_token'));
        fetch("http://localhost:8000/api/VendaList/" + id, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token.data.access_token
            }
        }).then(data => data.json().then(data => {
            console.log(data);
            this.setState({ data: data.data })
            this.setState({ status: data.status });
            console.log(this.state.data);
        }));

    }
    tableEndereco = () => {
        const Prod = this.state;
        const End = this.state.data;
        console.log(this.state);
        if (End && Prod.status === 200) {
            const ProdutoCarrinho = End.map((item, indice) => {
                let produ =  JSON.parse(item);

              return  (
                    <div key={indice}>
                        {produ.nomeProd}
                    </div>
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
                Nenhum Endreço encontrado
            </div>)
        }
    }

    render() {
        return (
            <div>
                <Perfil></Perfil>
                {this.tableEndereco()}
            </div>
        );
    }
}

export default MeusPedidos;