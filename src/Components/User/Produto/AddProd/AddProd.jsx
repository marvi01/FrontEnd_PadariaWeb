import React, { Component } from 'react';

class AddProd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                "nomeProd": "",
                "descricao": "",
                "valor": 0,
                "imagem": "",
                "quantidade": 0,
                "created_at": "",
                "updated_at": "",
                "categoria_id": 1,
                "valorfinal": 0
            },
            status: false
        };
    };
    formProd = () => {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-row">
                        <div className="form-group col-md-3">
                            <label htmlFor="inputEmail4">Nome do Produto</label>
                            <input onChange={this.handleInputChange} type="text" name="nomeProd" className="form-control" id="inputText1" />
                        </div>
                        </div>
                        <div className="form-row">
                        <div className="form-group col-md-3">
                            <label htmlFor="inputPassword4">Preço</label>
                            <input onChange={this.handleInputChange} type="text" name="valor" className="form-control" id="inputNumber1" />
                        </div>
                        </div>
                        <div className="form-row">
                        <div className="form-group col-md-3">
                        <label htmlFor="inputAddress2">Imagem</label>
                        <input onChange={this.handleInputChange} type="file" name="imagem" className="form-control" id="inputAddress2"  />
                    </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAddress">Descrição</label>
                        <textarea onChange={this.handleInputChange} name="descricao" type="text" className="form-control col-md-7" id="inputAddress" placeholder="Detalhes do Produto" />
                    </div>
                    
                
                    <button type="submit" className="btn btn-primary">Sign in</button>
                </form>
            </div>
        )
    }
    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState(prevState => ({
          data: { ...prevState.data, [name]: value }
        }));
        console.log(this.state.data);
      };
      handleSubmit = event => {
        console.log(this.state.data);
        let token = JSON.parse(sessionStorage.getItem('JWT_token'));
        fetch("http://localhost:8000/api/Produtos", {
          method: "post",
          body: JSON.stringify(this.state.data),
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+token.data.access_token
          }
        })
          .then(data => {
            if (data.ok) {
              this.setState({ redirect: true });
              console.log(data);
              alert('Produto cadastrado com sucesso')
              return data.json();
    
            } else {
              data.json().then(data => {
                if (data.error) {
                  this.setState({ erro: data.error });
                }
              });
            }
          }).catch(erro => this.setState({ erro: erro }));
        event.preventDefault();
      };
    render() {
        return (
            <div>
                {this.formProd()}
            </div>
        );
    }
}

export default AddProd;