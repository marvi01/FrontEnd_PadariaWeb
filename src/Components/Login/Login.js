import React, {Component} from 'react';
import './Login.css';

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
  <div className="form-group form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"></input>
    <label className="form-check-label" for="exampleCheck1">Lembre-se de mim</label>
  </div>
  <button type="submit" class="btn btn-outline-success">Submit</button>

</fieldset>
        );
    }
}
export default Login;