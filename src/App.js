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
import ConfirmCompra from './Components/User/ConCompra/ConfirmCompra';
import Perfil from './Components/User/Perfil/Perfil'
import SeusDados from './Components/User/Perfil/SeusDados/SeusDados'
import Endereco from './Components/User/Perfil/Endereco/Endereco';
import MeusPedidos from './Components/User/Perfil/MeusPedidos/MeusPedidos';
import Config from './Components/User/Perfil/Config/Config';
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
        <Route path = "/Perfil"exact component ={Perfil} />
        <Route path = "/Perfil/SeusDados" exact component = {SeusDados}/>
        <Route path = "/Perfil/Endereco" exact component = {Endereco}/>
        <Route path = "/Perfil/MeusPedidos" exact component = {MeusPedidos}/>
        <Route path = "/Perfil/Configuracoes" exact component = {Config}/>  
        <Route path ="/Admin" exact component = {ProdutoAdmin}/>
        <Route path ="/Admin/Produtos" exact component = {ProdutoAdmin} />
        <Route path = "/Admin/Produtos/:id" exact component = {EspProdutoAdmin}/>
        <Route path = "/Admin/Carrinho" exact component = {CarrinhoAdmin}/>
        <Route path = "/Admin/Cadastro" exact component = {CadastroAdmin}/>
        <Route path = "/ConfirmaCompra" exact component = {ConfirmCompra}/>
        <div></div>
      </Switch>
      </div>
      
    </div>
  );
}

export default App;
