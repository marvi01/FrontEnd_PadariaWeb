import React, { Component } from 'react';
import './MenuSuperior.css';
import log from '../../imagens/log.jpg';
import { Link } from 'react-router-dom';
class MenuSuperior extends Component {
    render() {
        return (
            <div className= "headerpadrao"> 
            <nav  className="navbar navbar-expand-lg navbar-light bg-light headerpadrao">
            <Link to="/"><h2 className="titulo">Dona Formiga</h2></Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div  className="collapse navbar-collapse" id="navbarSupportedContent">
 
    <ul  className="navbar-nav mr-auto">

      <li className="nav-item active">
      <Link className="navbar-brand" to="/Funcionarios" > Funcionarios </Link>
      </li>
      <li className="nav-item">
      <Link className="navbar-brand" to="/Estoque"> Estoque </Link>
      </li>
      <li className="nav-item">
      <Link  className="navbar-brand" to="/Vendas"> Vendas </Link>
      </li>
      <li className="nav-item">
      <Link  className="navbar-brand" to="/Produto"> Produtos </Link>
      </li>
    </ul>
   
    
    
  </div>
  <form className="form-inline my-2 my-lg-0">
      <input className="form-control mr-sm-2" type="search" placeholder="Procurar" aria-label="Search"/>
      <button className="btn btn-outline-dark" type="submit">⌕</button>
      <Link to="/Login" ><img alt='some value' className="figuras " src={log} /></Link>

    </form>
</nav>
</div>
          /*  <header>
                <div >
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