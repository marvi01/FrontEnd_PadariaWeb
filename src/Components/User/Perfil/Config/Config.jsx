import React, { Component } from 'react';
import Perfil from '../Perfil'

class Config extends Component {
    render() {
        return (
            <div>
                <Perfil></Perfil>
                <div className ="float-right">
                    Config
                </div>
            </div>
        );
    }
}

export default Config;