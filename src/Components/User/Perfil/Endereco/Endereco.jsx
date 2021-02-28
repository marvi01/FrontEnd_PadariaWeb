import React, { Component } from 'react';
import Perfil from '../Perfil'
import { Redirect } from 'react-router-dom';
import TabelaEndereco from './TabelaEndereco';
//https://viacep.com.br/ws/35570-496/json
class Endereco extends Component {
    constructor(props) {
        super(props);
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
            redirect: false,
            lembrar: "off",
            erro: null,
        }
    }
    componentDidMount(){
        let id = sessionStorage.getItem('idSession');
        this.setState(prevState => ({
            data: { ...prevState.data, users_id: id }
        }));
    }
    htmlForm = () => {
        
        return (
            <form onSubmit={this.handleSubmit} className="needs-validation">
                <div >


                    <div className="col-12 posicao-endereco ">
                        <div className="  card mb-4 bg-middle-brown ">
                            <div className="bg-card row no-gutters bg-middle-brown"></div>
                            <div className="form-row">
                            <div className="col-md-3 mb-3">
                                    <label htmlFor="validationCustom01">Nome do Endereço</label>
                                    <input onChange={this.handleInputChange} name="nomeend" type="text" className="form-control" id="validationCustom08" required />
                                    <div className="valid-feedback">
                                        Looks good!
                                        </div>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label htmlFor="validationCustom01">Rua/Logradouro</label>
                                    <input onChange={this.handleInputChange} name="logradouro" type="text" className="form-control" id="validationCustom01" required />
                                    <div className="valid-feedback">
                                        Looks good!
                                        </div>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label htmlFor="validationCustom03">Bairro</label>
                                    <input name="bairro" onChange={this.handleInputChange} type="text" className="form-control" id="validationCustom07" required />
                                    <div className="invalid-feedback">
                                        Coloque um Bairro Valido
                                        </div>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label htmlFor="validationCustom06">Cidade</label>
                                    <input name="localidade" onChange={this.handleInputChange} type="text" className="form-control" id="validationCustom03" required />
                                    <div className="invalid-feedback">
                                        Coloque uma Cidade Valida
                                        </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-md-3 mb-3">
                                    <label htmlFor="validationCustom02">Numero</label>
                                    <input name="unidade" onChange={this.handleInputChange} min="0" type="number" className="form-control" id="validationCustom02" required />
                                    <div className="valid-feedback">
                                        Looks good!
                                        </div>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label htmlFor="validationCustom04">Estado</label>
                                    <select onChange={this.handleInputChange} name="uf" className="custom-select" id="validationCustom04" required>
                                        <option value="">Selecione</option> <option value="AC">Acre</option><option value="AL">Alagoas</option><option value="AP">Amapá</option><option value="AM">Amazonas</option><option value="BA">Bahia</option><option value="CE">Ceará</option><option value="DF">Distrito Federal</option><option value="ES">Espirito Santo</option><option value="GO">Goiás</option><option value="MA">Maranhão</option><option value="MS">Mato Grosso do Sul</option><option value="MT">Mato Grosso</option><option value="MG">Minas Gerais</option><option value="PA">Pará</option><option value="PB">Paraíba</option><option value="PR">Paraná</option><option value="PE">Pernambuco</option><option value="PI">Piauí</option><option value="RJ">Rio de Janeiro</option><option value="RN">Rio Grande do Norte</option><option value="RS">Rio Grande do Sul</option><option value="RO">Rondônia</option><option value="RR">Roraima</option><option value="SC">Santa Catarina</option><option value="SP">São Paulo</option><option value="SE">Sergipe</option><option value="TO">Tocantins</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        Please select a valid state.
                                        </div>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label htmlFor="validationCustom05">CEP</label>
                                    <input name="cep" onChange={this.handleInputChange} type="text" className="form-control" id="validationCustom05" required />
                                    <div className="invalid-feedback">
                                        Please provide a valid zip.
                                        </div>
                                    <span><a href="http://www.buscacep.correios.com.br/sistemas/buscacep/buscaCep.cfm" className="badge badge-light float-right">Não sabe seu CEP?</a></span>
                                </div>
                            </div>
                            <button className="btn btn-primary" type="submit" href="/Perfil/Endereco">Cadastrar novo Endereço</button>
                        </div>
                    </div>

                </div>
            </form>
        );
    }
    handleSubmit = event => {
        
        let token = JSON.parse(sessionStorage.getItem('JWT_token'));
        fetch("http://localhost:8000/api/Endereco", {
            method: "post",
            body: JSON.stringify(this.state.data),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+token.data.access_token
              }
        })
            .then(data => {
                if (data.ok) {
                    alert('Endereço cadastrado com sucesso');
                    window.location.reload();
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
    render() {
        console.log(this.state.data);
        const { redirect } = this.state;

        if (redirect) {
            return (
                <div>
                    <Redirect to="/Perfil/" />
                </div>
            );
        } else {
            return (
                <div>
                    <Perfil />
                    <TabelaEndereco/>
                    {this.htmlForm()}
                </div>
            )
        }
    }
}

export default Endereco;