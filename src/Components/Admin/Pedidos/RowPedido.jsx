import React, { Component } from 'react';

class RowPedido extends Component {
    constructor(props) {
        super(props);
        const { id } = props;
        this.state = {
            produto: false,
            teste: id,
            status: false
        }
    }

    componentDidMount(props) {

        const id = this.state.teste;
        let token = JSON.parse(sessionStorage.getItem('JWT_token'));
        let array = [];
        fetch("http://localhost:8000/api/CompraVenda/" + id, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token.data.access_token
            }
        }).then(data => data.json().then(data => {
            const prod = data.data
            prod.map((item) => {
                fetch("http://localhost:8000/api/ProdutoCopy/" + item.produto_id)
                    .then(data => data.json().then(data => {
                        array.push(data.data)
                        this.setState({ produto: array })
                        this.setState({ status: data.status })
                    }))
                    return true;
            })



            /*        prod.map((item) => {
                       fetch("http://localhost:8000/api/Produtos/" + item.produto_id)
                           .then(data => data.json().then(data => {
                               let prod = data.data;
                               console.log(prod);
                               array.push(prod);
                           }))
                           this.setState({ produto: array });
                           return true;
                   })*/
        }));


    }
    teste = () => {
        const produto = this.state.produto;
        const status = this.state.status
        if (status === 200) {
            const prod = produto.map((item, indice) => {

                return (
                    <div key={indice}>
                        {item.nomeProd} - {item.quantidade}x
                    </div>
                )
            })
            return prod
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
                {this.teste()}
            </div>
        );
    }
}

export default RowPedido;