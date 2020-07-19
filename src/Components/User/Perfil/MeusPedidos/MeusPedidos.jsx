import React, { Component } from 'react';
import Perfil from '../Perfil'

class MeusPedidos extends Component {
    render() {
        return (
            <div>
            <Perfil></Perfil>
            <div className ="float-right">
                Meus Pedidos 
            </div>
        </div>
        );
    }
}

export default MeusPedidos;