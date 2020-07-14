import React from 'react';
import './App.css';
import MenuSuperior from './Components/User/MenuSuperior/MenuSuperior';
import Login from './Components/User/Login/Login';
import { Switch, Route } from 'react-router-dom';
import Produto from './Components/User/Produto/Produto';
import EspProduto from './Components/User/EspProduto/EspProd';
import Carrinho from './Components/User/Carrinho/Carrinho';
import Cadastro from './Components/User/Cadastro/Cadastro';
import ProdutoAdmin from './Components/Admin/Produto/Produto';
import EspProdutoAdmin from './Components/Admin/EspProduto/EspProd';
import CarrinhoAdmin from './Components/Admin/Carrinho/Carrinho';
import CadastroAdmin from './Components/Admin/Cadastro/Cadastro';

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
        <Route path = "/Login" exact component = {Login}/>  
        <Route path ="/Admin" exact component = {ProdutoAdmin}/>
        <Route path ="/Admin/Produtos" exact component = {ProdutoAdmin} />
        <Route path = "/Admin/Produtos/:id" exact component = {EspProdutoAdmin}/>
        <Route path = "/Admin/Carrinho" exact component= {CarrinhoAdmin}/>
        <Route path = "/Admin/Cadastro" exact component= {CadastroAdmin}/>
        <div></div>
      </Switch>
      </div>
      
    </div>
  );
}

export default App;
