import React, { Component } from 'react'
import './Funcionarios.css'
import { Link } from 'react-router-dom';
class Funcionarios extends Component {
    render() {
        return (
            <div>
                <fieldset className="tabela">
                <table class="table ">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">Codigo</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Salario</th>
                            <th scope="col">Comissão</th>
                            <th scope="col">Telefone</th>
                            <th scope="col">Editar | Excluir</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>R$ 1000,00</td>
                            <td>3%</td>
                            <td>111111</td>
                            <td><button type="button" class="btn btn-outline-secondary espaco" >Editar</button><button type="button" class="btn btn-outline-danger espaco">  Deletar</button></td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>R$ 1100,00</td>
                            <td>4%</td>
                            <td>222222</td>
                            <td><button type="button" class="btn btn-outline-secondary espaco" >Editar</button><button type="button" class="btn btn-outline-danger espaco">  Deletar</button></td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Larry</td>
                            <td>R$ 1200,00</td>
                            <td>2%</td>
                            <td>333333</td>
                            <td><button type="button" class="btn btn-outline-secondary espaco" >Editar</button><button type="button" class="btn btn-outline-danger espaco">  Deletar</button></td>
                        </tr>
                        <tr>
                            <th scope="row">4</th>
                            <td>Barney</td>
                            <td>R$ 998,00</td>
                            <td>3%</td>
                            <td>444444</td>
                            <td><button type="button" class="btn btn-outline-secondary espaco" >Editar</button><button type="button" class="btn btn-outline-danger espaco">  Deletar</button></td>
                        </tr>
                    </tbody>
                </table>
                
                </fieldset>
                <Link to="/Funcionarios/CadastrarFuncionario" type="button" class="btn btn-success cadastro">Cadastrar novo Funcionario</Link>
            </div>
        )
    }
}
export default Funcionarios;