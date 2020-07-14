import React, { Component } from 'react';
import './HeaderSuperior.css';

class HeaderSuperior extends Component { //Nós temos um componente, que ao ser chamado vai exibir no site o html dentro de render()


    render() {
        return (
            <div className="bg-light d-none d-sm-block" id="header-top">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col">
                            <ul className="nav">
                                <li className="nav-item">
                                    <a className="cor nav-link" href="#">(37) 99839-3353</a>
                                </li>
                                <li className="nav-item">
                                    <a className="cor nav-link" href="#">(37) 99855-9165</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-auto">
                            <ul class="nav social-icons">
                                <li class="nav-item">
                                    <a class="nav-link" href="#">
                                        <i class="fab fa-instagram"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HeaderSuperior;