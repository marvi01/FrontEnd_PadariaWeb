import React, { Component } from 'react';

class teste extends Component {
    constructor(props) {
        super(props);
        this.state = {
            venda: {
                "id": 0,
                "valor": 0,
                "Endereco_id": 0,
                "users_id": 0,
                "updated_at": null,
                "created_at": null
            },
            compra: {
                "venda_id": 1,
                "produto_id": 2,
                "updated_at": null,
                "created_at": null
            },
            produtos: {
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
    async componentDidMount() {
        await fetch('http://localhost:8000/api/VendaUser/17')
            .then(data => data.json().then(data => {
                this.setState({ venda: data.data });
            }))
            .catch(erro => this.setState(erro));
        await fetch('http://localhost:8000/api/CompraUser/17')
            .then(data => data.json().then(data => {
                this.setState({ compra: data.data });
            }))
            .catch(erro => this.setState(erro));
            const data = this.state.compra;
        if (data && data.length) {
             var arrayteste = []
            data.map((item) => {
                fetch('http://localhost:8000/api/Produtos/' + item.produto_id)
                    .then(data => data.json().then(data => {
                        arrayteste.push(data.data);
                        this.setState({ status: data.status });
                    }))
                    return true
            });
            this.setState({ produtos:arrayteste});
            
        }
    }
    htmlteste = () => {
        const data = this.state.produtos;
        const obj = this.state.status;
        const compra = this.state.compra;
        const venda = this.state.venda;
        console.log(venda);
        console.log(compra);
        if (obj === 200) {
            const Prod = data.map((item, indice) => (
               
                <div key={indice} >
                    {item.nomeProd}

                </div>
                
            )
            )
            return Prod;
        }
    }
    render() {
        return (
            <div>
                {this.htmlteste()}
            </div>
        );
    }
}

export default teste;