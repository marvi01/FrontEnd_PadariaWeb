import React from 'react';
import './App.css';
import MenuSuperior from './Components/MenuSuperior/MenuSuperior';
import Rodape from './Components/Rodape/Rodape';
import Funcionarios from './Components/Funcionarios/Funcionarios';
import Estoque from './Components/Estoque/Estoque';
import Vendas from './Components/Vendas/Vendas';
import MenuPrincipal from './Components/MenuPrincipal/MenuPrincipal'
import Login from './Components/Login/Login';
import CadFunc from './Components/Funcionarios/CadastrarFuncionario/CadFunc';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <MenuSuperior/>
      <div>
      <Switch> 
        <Route path = "/Login" exact component = {Login}/>  
        <Route path ="/Estoque" exact  component = {Estoque} />
        <Route path ="/Vendas"   component = {Vendas} />
        <Route path ="/" exact component = {MenuPrincipal}/>
        <Route path ="/Funcionarios" exact component = {Funcionarios} />
        <Route path = "/Funcionarios/CadastrarFuncionario" component ={CadFunc} />
        <div></div>
      </Switch>
      </div>
      <Rodape/>
      
    </div>
  );
}

export default App;
