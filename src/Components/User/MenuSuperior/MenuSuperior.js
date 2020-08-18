import React, { Component } from 'react';
import './MenuSuperior.css';
//import logo from '../../imagens/LogoPadaria.png'
import { Link } from 'react-router-dom';
import padaria from '../../../imagens/logo.png'
import AdminMenuSuperior from './AdminMenuSuperior';
class MenuSuperior extends Component {

    exibir = () => {
        let auth = sessionStorage.getItem('JWT_token');
        let admin = sessionStorage.getItem('admin');
        console.log(admin);
        if (auth && auth.length) {
            if (admin === '1') {
                return (
                    <div>
                    <AdminMenuSuperior />
                    </div>
                )
            } else {
                return (
                    <div className="header-middle py-3 bg-middle-brown">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-4 col-lg-2">
                                    <Link to="/">
                                        <img src={padaria} alt="Dona Formiga" className="img-fluid" />
                                    </Link>
                                </div>
                                <div className="col">
                                    <div className="row justify-content-end">
                                        <div className="col-lg-7">
                                            <ul className="nav">
                                                <li className="nav-item">
                                                    <Link className="nav-link text-dark-brown" to="/Perfil">
                                                        <i className="fas fa-user-circle mr-1"></i>
                                                    Perfil
                                                </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <a onClick={() => {
                                                        let confirmar = window.confirm('Deseja mesmo Deslogar?');
                                                        if (confirmar) {
                                                            sessionStorage.removeItem('JWT_token');
                                                            sessionStorage.removeItem('admin');
                                                            sessionStorage.removeItem('idSession');
                                                            window.location.reload();
                                                        }
                                                    }}
                                                        className="nav-link text-dark-brown" href="/">
                                                        <i className="fas fa-sign-out-alt mr-1"></i>
                                                    Logout
                                                </a>
                                                </li>
                                                <li className="nav-item">
                                                    <Link className="nav-link text-dark-brown" to="/Carrinho">
                                                        <i className="fas fa-shopping-cart mr-1"></i>
                                                    Carrinho
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
        } else {
            return (
                <div className="header-middle py-3 bg-middle-brown">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-4 col-lg-2">
                                <Link to="/">
                                    <img src={padaria} alt="Dona Formiga" className="img-fluid" />
                                </Link>
                            </div>
                            <div className="col">
                                <div className="row justify-content-end">
                                    <div className="col-lg-7">
                                        <ul className="nav">
                                            <li className="nav-item">
                                                <Link className="nav-link text-dark-brown" to="/Login">
                                                    <i className="fas fa-sign-in-alt mr-1"></i>
                                                Login
                                            </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link text-dark-brown" to="/Cadastro">
                                                    <i className="fas fa-user-plus mr-1"></i>
                                                Cadastro
                                            </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link text-dark-brown" to="/Carrinho">
                                                    <i className="fas fa-shopping-cart mr-1"></i>
                                                Carrinho
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
    render() {
        return this.exibir();
        //this.exibir();
    }
}
export default MenuSuperior;