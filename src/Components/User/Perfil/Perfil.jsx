import React, { Component } from 'react';
import { Link } from 'react-router-dom';



class Perfil extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }


    render() {
        return (
            

                        <div className="list-group" id="list-tab" role="tablist">
                            <i className="list-group-item  bg-dark-brown" id="list-home-list">Perfil</i>
                            <Link className="list-group-item list-group-item-action" id="list-home-list"  role="tab" aria-controls="home" to="/Perfil/SeusDados" >Seus Dados</Link>
                            <Link className="list-group-item list-group-item-action" id="list-profile-list"  href="#list-profile" role="tab" aria-controls="profile" to="/Perfil/Endereco">Endereços</Link>
                            <Link className="list-group-item list-group-item-action" id="list-messages-list"  href="#list-messages" role="tab" aria-controls="messages"to="/Perfil/MeusPedidos">Meus Pedidos</Link>
                            <Link className="list-group-item list-group-item-action" id="list-settings-list"  href="#list-settings" role="tab" aria-controls="settings"to="/Perfil/Configuracoes">Configurações</Link>
                        </div>
                    

        );
    }
}


export default Perfil;