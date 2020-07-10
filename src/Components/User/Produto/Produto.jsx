/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import './Produto.css';
import { Link } from 'react-router-dom';


class Produto extends Component {

    constructor(props) {
        super(props);
        this.state = {
                id: 0,
                nomeProd: "",
                descricao: "",
                valor: 0,
                imagem: "",
                quantidade: 0,
                created_at: "",
                updated_at: "",
                categoria_id: 0,
                valorfinal:null
        };
    };
    componentDidMount() {
        fetch("http://localhost:8000/api/Produtos")
        .then(data => data.json().then(data => this.setState({ data })))
        .catch(erro=>this.setState(erro));
        
    }
    exibeErro() {
        const { erro } = this.state;
    
        if (erro) {
          return (
            <div className="alert alert-danger" role="alert">
              Erro de conexão com o servidor
            </div>
          );
        }
      }
      teste(){
       console.log(sessionStorage.length); 
      }
      exibeProduto()
      {
        const { data } = this.state;
        console.log(data)
        if (data && data.length){
            const Prod = data.map((item,indice)=>(
                
            <div  key = {indice}  className="card tamanho group" >
                <img className="card-img-top img-fluid " src={"https://i.ibb.co/"+item.imagem} />
                <div text align= "center" className="body card-body">
                    <h5 className="card-title">{item.nomeProd}</h5>
                    <h3 className="card-text"> R${item.valor.toFixed(2).replace(".", ",")}</h3>
            
                    <Link to ={`Produtos/${item.id}`}  className="btn btn-warning ">Comprar</Link>
                    
                </div>
            </div>
            )   
             )
             return Prod;
              } else{
                return(
                <div className="alert alert-light">
               <p>Nenhum produto encontrado :(</p>
              </div>)
             }

       }
       
       //
    render() {
        return (
            
                 
            <div>{this.exibeErro() || this.exibeProduto()}
              {this.teste()}
            </div>
        );
    };


};
export default Produto;