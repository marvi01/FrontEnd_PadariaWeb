import React, { Component } from 'react';
import Perfil from '../Perfil'
//https://viacep.com.br/ws/35570-496/json
class Endereco extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
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
            redirect: false,
            lembrar: "off",
            erro: null,
        }
    }
    componentDidMount() {
        fetch("http://localhost:8000/api/Endereco")
            .then(data => data.json().then(data => this.setState({ data })))
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

    htmlForm = () => {
        return (
            <form onSubmit={this.handleSubmit} className="needs-validation">
                <div >


                    <div className="col-12 posicao-endereco ">
                        <div className="  card mb-4 bg-middle-brown ">
                            <div className="bg-card row no-gutters bg-middle-brown"></div>
                            <div className="form-row">
                                <div className="col-md-4 mb-3">
                                    <label for="validationCustom01">Rua/Logradouro</label>
                                    <input onChange={this.handleInputChange} name="logradouro" type="text" className="form-control" id="validationCustom01" required />
                                    <div className="valid-feedback">
                                        Looks good!
                                        </div>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label for="validationCustom03">Bairro</label>
                                    <input name="bairro" onChange={this.handleInputChange} type="text" className="form-control" id="validationCustom03" required />
                                    <div className="invalid-feedback">
                                        Coloque um Bairro Valido
                                        </div>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label for="validationCustom03">Cidade</label>
                                    <input name="localidade" onChange={this.handleInputChange} type="text" className="form-control" id="validationCustom03" required />
                                    <div className="invalid-feedback">
                                        Coloque uma Cidade Valida
                                        </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-md-3 mb-3">
                                    <label for="validationCustom02">Numero</label>
                                    <input name="unidade" onChange={this.handleInputChange} min="0" type="number" className="form-control" id="validationCustom02" required />
                                    <div className="valid-feedback">
                                        Looks good!
                                        </div>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label for="validationCustom04">Estado</label>
                                    <select onChange={this.handleInputChange} name="uf" className="custom-select" id="validationCustom04" required>
                                        <option value="">Selecione</option> <option value="AC">Acre</option><option value="AL">Alagoas</option><option value="AP">Amapá</option><option value="AM">Amazonas</option><option value="BA">Bahia</option><option value="CE">Ceará</option><option value="DF">Distrito Federal</option><option value="ES">Espirito Santo</option><option value="GO">Goiás</option><option value="MA">Maranhão</option><option value="MS">Mato Grosso do Sul</option><option value="MT">Mato Grosso</option><option value="MG">Minas Gerais</option><option value="PA">Pará</option><option value="PB">Paraíba</option><option value="PR">Paraná</option><option value="PE">Pernambuco</option><option value="PI">Piauí</option><option value="RJ">Rio de Janeiro</option><option value="RN">Rio Grande do Norte</option><option value="RS">Rio Grande do Sul</option><option value="RO">Rondônia</option><option value="RR">Roraima</option><option value="SC">Santa Catarina</option><option value="SP">São Paulo</option><option value="SE">Sergipe</option><option value="TO">Tocantins</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        Please select a valid state.
                                        </div>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label for="validationCustom05">CEP</label>
                                    <input name="cep" onChange={this.handleInputChange} type="text" className="form-control" id="validationCustom05" required />
                                    <div className="invalid-feedback">
                                        Please provide a valid zip.
                                        </div>
                                    <span><a href="http://www.buscacep.correios.com.br/sistemas/buscacep/buscaCep.cfm" className="badge badge-light float-right">Não sabe seu CEP?</a></span>
                                </div>
                            </div>
                            <button className="btn btn-primary" type="submit">Submit form</button>
                        </div>
                    </div>

                </div>
            </form>
        );
    }
    handleSubmit = event => {
        fetch("http://localhost:8000/api/Endereco", {
            method: "post",
            body: JSON.stringify(this.state.data),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(data => {
                if (data.ok) {
                    this.setState({ redirect: true });
                    alert('Endereço cadastrado com sucesso');
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
    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState(prevState => ({
            data: { ...prevState.data, [name]: value }
        }));
        console.log(this.state.data);
    };
    headTabela() {
        const head = (
            <thead className="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Rua</th>
                    <th scope="col">Bairro</th>
                    <th scope="col">Numero</th>
                    <th scope="col">Cidade</th>
                    <th scope="col">CEP</th>
                    <th scope="col">Editar / Deletar</th>
                </tr>
            </thead>
        )
        return head;
    }
    exibiCarrinho = () => {
        const Prod = this.state.data;
        if (Prod && Prod.length) {
            const ProdutoCarrinho = Prod.map((item, indice) =>
                (

                    <tr key={indice}>
                        <th scope="row">{indice + 1}</th>
                        <td scope="col">{item.logradouro}</td>
                        <td scope="col">{item.bairro}</td>
                        <td scope="col">{item.unidade}</td>
                        <td scope="col">{item.localidade}</td>
                        <td scope="col">{item.cep}</td>
                        <td scope="col">
                            <button className="btn btn-warning">Editar</button>
                            <button className="btn btn-danger">Deletar</button>
                        </td>


                    </tr>
                )
            )
            return ProdutoCarrinho
        }
    }
    render() {
        console.log(this.state.data);
        return (
            <div>
                <Perfil />
                <table className="table">
                    {this.headTabela()}
                    <tbody>
                        {this.exibiCarrinho()}
                    </tbody>
                </table>
                {this.htmlForm()}
            </div>
        )
    }
}

export default Endereco;