import React, { Component } from 'react';

class RowEnd extends Component {
    constructor(props) {
        super(props);
        const { id } = props;
        this.state = {
            data: {
                "nomeend":"",
                "cep": "",
                "logradouro": "",
                "complemento": null,
                "bairro": "",
                "localidade": "",
                "uf": "",
                "unidade": "",
                "ibge": "",
                "gia": null,
                "users_id": 0,
            },
            teste: id,
            status: false
        }
    }

    componentDidMount(props) {

        const id = this.state.teste;
        let token = JSON.parse(sessionStorage.getItem('JWT_token'));
        fetch("http://localhost:8000/api/Endereco/" + id, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token.data.access_token
            }
        }).then(data => data.json().then(data => {
            console.log(data.data);
            this.setState({ data: data.data })
            this.setState({ status: data.status })
        }));
    }
    teste=()=>{
        console.log(this.state.data);
        return(
        <p>{this.state.data.logradouro},{this.state.data.unidade}<br/>
        {this.state.data.bairro}</p>
        )   
    }
render() {
    return (
        <div>
            {this.teste()}
        </div>
    );
}
}

export default RowEnd;