import React, { Component } from 'react';
import '../EspProduto/EspProd.css'
import './AddProd.css'
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
            <div className=" posicao loc bg-middle-brown">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label htmlFor="inputEmail4">Nome do Produto</label>
                            <input onChange={this.handleInputChange} type="text" name="nomeProd" className="form-control" id="inputText1" />
                        </div>
                        </div>
                        <div className="form-row">
                        <div className="form-group col-md-4">
                            <label htmlFor="inputPassword4">Preço</label>
                            <input onChange={this.handleInputChange} type="text" name="valor" className="form-control" id="inputNumber1" />
                        </div>
                        </div>
                        <div className="form-row">
                        <div className="form-group col-md-6">
                        <label htmlFor="imagem">Imagem</label>
                        <input accept=".jpeg, .png, .jpg" onChange={(e)=> this.onChangeFile(e)} type="file" name="imagem" className="form-control" id="imagem"  />
                    </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAddress">Descrição</label>
                        <textarea onChange={this.handleInputChange} name="descricao" type="text" className="form-control col-md-7" id="inputAddress" placeholder="Detalhes do Produto" />
                    </div>
                    
                
                    <button type="submit" className="btn btn-primary">Criar Produto</button>
                </form>
            </div>
        )
    }
    onChangeFile =(e)=>{
      console.log("file to upload:", e.target.files[0]);
      let file = e.target.files[0]

      if (file){
        const reader = new FileReader();
        reader.onload = this.handleReaderLoaded.bind(this)
        reader.readAsBinaryString(file)
      }
    }
    handleReaderLoaded = (readerEvt) =>{
      let binaryString = readerEvt.target.result;
      this.setState(prevState => ({
        data: { ...prevState.data,"imagem" : btoa(binaryString) }
      }));
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
        console.log(token.data.access_token)
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
              alert('Produto cadastrado com sucesso');
              window.location.replace("http://localhost:3000/")
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