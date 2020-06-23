import React, {Component} from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

class Login extends Component{
    render(){
        return(
            <fieldset className = "layout">
            
  <div className="form-group">
      <h3 align = "center">Logar</h3>
    <label for="exampleInputEmail1">Email </label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>

  </div>
  <div className="form-group">
    <label for="exampleInputPassword1">Senha</label>
    <input type="password" className="form-control" id="exampleInputPassword1"></input>
  </div>
  <div className="form-group form-check ">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"></input>
    <div className="">
    <label className="form-check-label" for="exampleCheck1">Lembre-se de mim</label>
    <p><Link to='/Cadastro' className="form-check-label texto">Cadastre-se </Link></p>
    </div>
  </div>
  <button type="submit" class="btn btn-outline-success">Submit</button>

</fieldset>
        );
    }
}
export default Login;