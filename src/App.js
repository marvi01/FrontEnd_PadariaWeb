import React from 'react';
import './App.css';
import MenuSuperior from './Components/User/MenuSuperior/MenuSuperior';
import Login from './Components/User/Login/Login';
import { Switch, Route } from 'react-router-dom';
import Produto from './Components/User/Produto/Produto';
import EspProduto from './Components/User/EspProduto/EspProd';
import Carrinho from './Components/User/Carrinho/Carrinho';
import Cadastro from './Components/Cadastro ';
import HeaderSuperior from './Components/User/HeaderSuperior/HeaderSuperior'

function App() {
  return (
    <div className="corpo">
      <header>
        <MenuSuperior/>
      </header>
      <div>
      <Switch> 
        <Route path = "/Login" exact component = {Login}/>  
        <Route path ="/" exact component = {Produto}/>
        <Route path ="/Produtos" exact component = {Produto} />
        <Route path = "/Produtos/:id" exact component = {EspProduto}/>
        <Route path = "/Carrinho" exact component= {Carrinho}/>
        <Route path = "/Cadastro" exact component= {Cadastro}/>
        <div></div>
      </Switch>
      </div>
      
    </div>
  );
}

export default App;
