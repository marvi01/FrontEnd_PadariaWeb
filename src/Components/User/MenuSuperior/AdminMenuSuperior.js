import React, { Component } from 'react';
import './MenuSuperior.css';
//import logo from '../../imagens/LogoPadaria.png'
import { Link } from 'react-router-dom';
import padaria from '../../../imagens/logo.png'
class AdminMenuSuperior extends Component {
    render() {
        return (
            <div className="header-middle py-4 bg-middle-brown">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-4 col-lg-2">
                            <Link to="/">
                                <img src={padaria} alt="Dona Formiga" className="img-fluid" />
                            </Link>Admin
                        </div>
                        <div className="col">
                            <div className="row justify-content-end">
                                <div className="col-lg-6">
                                    <ul className="nav">
                                        <li className="nav-item">
                                            <div class="dropdown nav-link">
                                                <button className="bg-middle-brown border-none btn-reset dropdown-toggle text-dark-brown" type="button" id="categorias" data-toggle="dropdown">
                                                    <i className="fas fa-user-circle mr-2"></i>
                                               Conta</button>
                                                <div class="dropdown-menu bg-dark">
                                                    <a onClick={() => {
                                                        let confirmar = window.confirm('Deseja mesmo Deslogar?');
                                                        if (confirmar) {
                                                            sessionStorage.removeItem('JWT_token');
                                                            sessionStorage.removeItem('admin');
                                                            sessionStorage.removeItem('idSession');
                                                            window.location.reload();
                                                        }
                                                    }} className="dropdown-item text-light pl-4 py-2" >
                                                        <i className="fas fa-user-circle mr-2"></i>Sair</a>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link text-dark-brown" to="/Pedido">
                                                <i className="fas fa-list-alt mr-1"></i>
                                                Pedido
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link text-dark-brown" to="/vendas">
                                                <i className="fas fa-dollar-sign mr-1"></i>
                                                Vendas
                                            </Link>
                                        </li>
                                    </ul>
                                    <div className="input-group shadow-sm">
                                        <input type="text" className="form-control" />
                                        <div className="input-group-append">
                                            <button className="btn btn-dark" type="button">
                                                <i className="fas fa-search"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
export default AdminMenuSuperior;