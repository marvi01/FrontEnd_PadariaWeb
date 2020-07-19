import React, { Component } from 'react';
import Perfil from '../Perfil'

class SeusDados extends Component {
    


    render() {
        return (

            <div>
                <Perfil></Perfil>
                <div class="form-group">
                  <label for=""></label>
                  <input type="text" name="" id="" class="form-control" placeholder="" aria-describedby="helpId"/>
                  <small id="helpId" class="text-muted">Help text</small>
                </div>
            </div>
        );
    }
}


export default SeusDados;