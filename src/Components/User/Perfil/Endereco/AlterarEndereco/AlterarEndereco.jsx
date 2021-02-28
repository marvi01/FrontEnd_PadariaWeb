import React, { Component } from 'react';
import Perfil from '../../Perfil'
import { Redirect } from 'react-router-dom';
//https://viacep.com.br/ws/35570-496/json
class AleteraEndereco extends Component {
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
            status:false
        }
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        let token = JSON.parse(sessionStorage.getItem('JWT_token'));
        fetch("http://localhost:8000/api/Endereco/" + id, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token.data.access_token
            }
        }).then(data => data.json().then(data => {
            console.log(data);
            this.setState({ data: data.data })
            this.setState({status: data.status})
        }));
    }

    htmlForm = () => {
        const Prod = this.state;
        const End = this.state.data;
        console.log(this.state);
        if (End && Prod.status===200) {
        return (
            <form onSubmit={this.handleSubmit} className="needs-validation">
                <div >


                    <div className="col-12 posicao-endereco ">
                        <div className="  card mb-4 bg-middle-brown ">
                            <div className="bg-card row no-gutters bg-middle-brown"></div>
                            <div className="form-row">
                                <div className="col-md-4 mb-3">
                                    <label for="validationCustom01">Rua/Logradouro</label>
                                    <input value={this.state.data.logradouro} onChange={this.handleInputChange} name="logradouro" type="text" className="form-control" id="validationCustom01" required />
                                    <div className="valid-feedback">
                                        Looks good!
                                        </div>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label for="validationCustom03">Bairro</label>
                                    <input value={this.state.data.bairro} name="bairro" onChange={this.handleInputChange} type="text" className="form-control" id="validationCustom07" required />
                                    <div className="invalid-feedback">
                                        Coloque um Bairro Valido
                                        </div>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label for="validationCustom06">Cidade</label>
                                    <input value={this.state.data.localidade} name="localidade" onChange={this.handleInputChange} type="text" className="form-control" id="validationCustom03" required />
                                    <div className="invalid-feedback">
                                        Coloque uma Cidade Valida
                                        </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-md-3 mb-3">
                                    <label for="validationCustom02">Numero</label>
                                    <input value={this.state.data.unidade} name="unidade" onChange={this.handleInputChange} min="0" type="number" className="form-control" id="validationCustom02" required />
                                    <div className="valid-feedback">
                                        Looks good!
                                        </div>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label for="validationCustom04">Estado</label>
                                    <select onChange={this.handleInputChange} name="uf"  className="custom-select" id="validationCustom04" required>
                                        <option value={this.state.data.uf}>{this.state.data.uf}</option> <option value="AC">Acre</option><option value="AL">Alagoas</option><option value="AP">Amapá</option><option value="AM">Amazonas</option><option value="BA">Bahia</option><option value="CE">Ceará</option><option value="DF">Distrito Federal</option><option value="ES">Espirito Santo</option><option value="GO">Goiás</option><option value="MA">Maranhão</option><option value="MS">Mato Grosso do Sul</option><option value="MT">Mato Grosso</option><option value="MG">Minas Gerais</option><option value="PA">Pará</option><option value="PB">Paraíba</option><option value="PR">Paraná</option><option value="PE">Pernambuco</option><option value="PI">Piauí</option><option value="RJ">Rio de Janeiro</option><option value="RN">Rio Grande do Norte</option><option value="RS">Rio Grande do Sul</option><option value="RO">Rondônia</option><option value="RR">Roraima</option><option value="SC">Santa Catarina</option><option value="SP">São Paulo</option><option value="SE">Sergipe</option><option value="TO">Tocantins</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        Please select a valid state.
                                        </div>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label for="validationCustom05">CEP</label>
                                    <input value={this.state.data.cep} name="cep" onChange={this.handleInputChange} type="text" className="form-control" id="validationCustom05" required />
                                    <div className="invalid-feedback">
                                        Please provide a valid zip.
                                        </div>
                                    <span><a href="http://www.buscacep.correios.com.br/sistemas/buscacep/buscaCep.cfm" className="badge badge-light float-right">Não sabe seu CEP?</a></span>
                                </div>
                            </div>
                            <button className="btn btn-primary" type="submit" href="/Perfil/Endereco">Atualizar Endereço</button>
                        </div>
                    </div>

                </div>
            </form>
        );
        }else if(!this.state.status) {
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
    handleSubmit = event => {
        const { id } = this.props.match.params;
        fetch("http://localhost:8000/api/Endereco/"+id, {
            method: "put",
            body: JSON.stringify(this.state.data),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(data => {
                if (data.ok) {
                    this.setState({ redirect: true });
                    alert('Endereço atualizado com sucesso');
                    
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
              <Redirect to="/Perfil/Endereco"/>
          </div>
      );
    } else {
        return (
            <div>
                <Perfil />
                
                {this.htmlForm()}
            </div>
        )
    }
    }
}

export default AleteraEndereco;