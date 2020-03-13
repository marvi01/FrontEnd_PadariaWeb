import React, { Component } from 'react';
import './CadFunc.css';

class CadFunc extends Component {
    render() {
        return (
            <div>
                <form className="conteiner">
                    <div class="form-row">
                        <div class="form-group col-md-3">
                            <label for="inputEmail4">Nome</label>
                            <input type="text" class="form-control" id="inputEmail4" />
                        </div>
                        <div class="form-group col-md-3">
                            <label for="inputPassword4">Sobrenome</label>
                            <input type="text" class="form-control" id="inputPassword4" />
                        </div>
                        <div class="form-group col-md-3">
                            <label for="inputPassword4">CPF</label>
                            <input type="text" class="form-control" id="inputPassword4" />
                        </div>
                        <div class="form-group col-md-2">
                            <label for="inputEmail4">Telefone</label>
                            <input type="number" class="form-control" id="inputEmail4" />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-4">
                            <label for="inputCity">Rua</label>
                            <input type="text" class="form-control" id="inputCity" />
                        </div>
                        <div class="form-group col-md-2">
                            <label for="inputState">Numero</label>
                            <input type="number" id="inputState" class="form-control"/>
                        </div>
                        <div class="form-group col-md-2">
                            <label for="inputZip">Bairro</label>
                            <input type="text" class="form-control" id="inputZip" />
                        </div>
                        <div class="form-group col-md-2">
                            <label for="inputZip">Cidade</label>
                            <input type="text" class="form-control" id="inputZip" />
                        </div>
                        <div class="form-group col-md-1">
                            <label for="inputZip">UF</label>
                            <select type="text" class="form-control" id="inputZip" >
                                <option>MG</option>
                                <option>SP</option>
                                <option>RJ</option>
                                </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-4">
                            <label for="inputEmail4">Salario</label>
                            <input type="text" class="form-control" id="inputEmail4" />
                        </div>
                        <div class="form-group col-md-3">
                            <label for="inputPassword4">Cargo</label>
                            <input type="text" class="form-control" id="inputPassword4" />
                        </div>
                        <div class="form-group col-md-2">
                            <label for="inputPassword4">Horário Inicio</label>
                            <input type="time" class="form-control" id="inputPassword4" />
                        </div>
                        <div class="form-group col-md-2">
                            <label for="inputPassword4">Horário Final</label>
                            <input type="time" class="form-control" id="inputPassword4" />
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="gridCheck" />
                            <label class="form-check-label" for="gridCheck">
                                Check me out </label>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-dark">Cadastrar</button>
                </form>
            </div>
        )
    }
}
export default CadFunc;