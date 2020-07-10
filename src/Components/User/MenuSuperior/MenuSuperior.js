import React, { Component } from 'react';
import './MenuSuperior.css';
//import logo from '../../imagens/LogoPadaria.png'
import { Link } from 'react-router-dom';
import padaria from '../../../imagens/logo.png'
class MenuSuperior extends Component {
    render() {
        return (
            <div className="header-middle py-4 bg-middle-brown">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-4 col-lg-2">
                            <Link to="/">
                            <img src={padaria} alt="Dona Formiga" className="img-fluid" />
                            </Link>
                        </div>
                        <div className="col">
                            <div className="row justify-content-end">
                                <div className="col-lg-6">
                                    <ul class="nav">
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
          /*  <header>
                <div >
                <img  src={logo} className=" titulo img-fluid rounded float-left " alt="Responsive image"></img>
                    <Link to="/"><h2 className="titulo">Ferias</h2></Link>

                    <div className="chave">
                        <nav className="links">
                    <ul>
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                     <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                      {/*}  <Link to="/Login" ><img alt='some value' className="figuras " src={log} /></Link>
                        <Link to="/" ><img alt='some value' className="figuras" src={logout} /></Link>
                        </ul>
                        </nav>

                    </div>
                    <div className="menus" >
                        <nav className="links">

                            <Link className="navbar-brand" to="Menu1" > Primeiro menu </Link>
                            <Link className="navbar-brand" to="Menu2"> Segundo menu </Link>
                            <Link className="navbar-brand" to="Menu3"> Terceiro menu </Link>
                            
                        </nav>
                        
                    </div>
                    <div >
                    
                    </div>
                </div>



                    </header>*/
            /*  <nav className = "navbar navbar-expand-lg navbar-dark bg-dark">
              <img src= {logo}></img>
                  <Link to = "/" className= "navbar-brand">Teste React</a>
                  <button className = "navbar-toggler" type= "button" data-toggle = "collapse" data-target= "#navbarNav" >
                  <span className = "navbar-toggler-icon"></span>
                  </button>
                  <div className = "collapse navbar-collapse" id ="navBarNav" >
                      <ul className = "navnar-nav mr-auto">
                      </ul>
                 </div>
              </nav>*/
        )
    }
}
export default MenuSuperior;