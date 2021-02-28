import React from 'react';
import './App.css';
import MenuSuperior from './Components/User/MenuSuperior/MenuSuperior';
import Login from './Components/User/Login/Login';
import { Switch, Route } from 'react-router-dom';
import Produto from './Components/User/Produto/Produto';
import EspProduto from './Components/User/Produto/EspProduto/EspProd';
import Carrinho from './Components/User/Carrinho/Carrinho';
import Cadastro from './Components/User/Cadastro/Cadastro';
import ConfirmCompra from './Components/User/ConCompra/ConfirmCompra';
import Perfil from './Components/User/Perfil/Perfil'
import SeusDados from './Components/User/Perfil/SeusDados/SeusDados'
import Endereco from './Components/User/Perfil/Endereco/Endereco';
import AltEndereco from './Components/User/Perfil/Endereco/AlterarEndereco/AlterarEndereco'
import MeusPedidos from './Components/User/Perfil/MeusPedidos/MeusPedidos';
import Config from './Components/User/Perfil/Config/Config';
import AddProd from './Components/User/Produto/AddProd/AddProd';
import UpdateProd from './Components/User/Produto/UpdateProd/UpdateProd';
import teste from './Components/User/teste';
import PedidoEspec from './Components/User/Perfil/MeusPedidos/PedidoEspec';
import Vendas from './Components/Admin/Vendas/Vendas';
import Pedidos from './Components/Admin/Pedidos/Pedidos';
import VendaEspec from './Components/Admin/Vendas/VendaEspec';
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
        <Route path="/AdicionarProduto" exact component={AddProd} />
        <Route path="/AtualizarProduto/:id" exact component={UpdateProd}/>
        <Route path = "/Carrinho" exact component= {Carrinho}/>
        <Route path = "/Cadastro" exact component= {Cadastro}/>
        <Route path = "/Login" exact component = {Login}/>  
        <Route path = "/Perfil"exact component ={Perfil} />
        <Route path = "/Perfil/SeusDados" exact component = {SeusDados}/>
        <Route path = "/Perfil/Endereco" exact component = {Endereco}/>
        <Route path = "/Perfil/MeusPedidos" exact component = {MeusPedidos}/>
        <Route path = "/Perfil/Configuracoes" exact component = {Config}/>  
        <Route path = "/ConfirmaCompra" exact component = {ConfirmCompra}/>
        <Route path = "/Perfil/Endereço/AlterarEnderco/:id" exact component = {AltEndereco}/>
        <Route path = "/teste" exact component = {teste}/>
        <Route path = "/Perfil/MeusPedidos/Pedido/:id" exact component = {PedidoEspec}  />
        <Route path = "/Vendas" exact component = {Vendas} />
        <Route path = "/Pedidos" exact component = {Pedidos} />
        <Route path = "/Admin/Venda/:id" exact component ={VendaEspec}/>
      </Switch>
      </div>
      
    </div>
  );
}

export default App;
