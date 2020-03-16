import React, { Component } from 'react';
import Pao from '../../imagens/Pao.jpg';
import './Produto.css';
import { Link } from 'react-router-dom';


class Produto extends Component {

    constructor(props) {
        super(props);
        this.state = {
            "Nome": null,
            "Descricao": null,
            "Valor": 0,
            "Imagem": Pao,
        };
    };
    componentDidMount(){
        fetch({"Nome": "Pão",
        "Descricao": "Produto1",
        "Valor": 15,
        "Imagem": Pao,
    }).then(resultado => resultado.json().then(dados =>this.setState({dados})));   
    }
    render() {
        return (
            <div>
                <div class="card tamanho" >
                    <img class="card-img-top " src={this.state.Imagem} alt="Imagem de capa do card" />
                    <div class="card-body">
                        <h5 class="card-title">{this.state.Nome}</h5>
                        <p class="card-text">{this.state.Descricao}</p>
                        <Link href="./Produto" class="btn btn-dark ">Comprar</Link>
                        {this.state.Valor}
                    </div>
                </div>
            </div>

        );
    };


};

export default Produto;