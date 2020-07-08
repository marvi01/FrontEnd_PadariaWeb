import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';




export default function Carrinho(props) {

    const [Prod, setProd] = useState(true);
    const [count, setcount] = useState(true);
    
    
  
   const prencherArray =()=>{
      var array =[]
      for (let i = 0; i < sessionStorage.length; i++) {
        let tranformador =  sessionStorage.getItem(i);
        let tranformado = JSON.parse(tranformador);
          array.push(tranformado);
          
      }
      setProd(array);
  }
  useEffect(() => {
    prencherArray()
  }, [count]);
  const exibiCarrinho= ()=>{
        console.log(Prod)
        if (Prod && Prod.length){
            const ProdutoCarrinho = Prod.map((item,indice)=>(
                
            <div  key = {indice}  className="card tamanho group" >
                <img className="card-img-top img-fluid " src={"https://i.ibb.co/"+item.imagem} />
                <div text align= "center" className="body card-body">
                    <h5 className="card-title">{item.nomeProd}</h5>
                    <h3 className="card-text">Quantidade:{item.quantidade} </h3>
                    <h3 className="card-text"> R${item.valorfinal.toFixed(2).replace(".", ",")}</h3>
                    <Link to ={`Produtos/${item.id}`}  className="btn btn-warning ">Comprar</Link>
                    
                </div>
            </div>
            )   
             )
             return ProdutoCarrinho;
              } else{
                return(
                <div className="alert alert-light">
               <p>Nenhum produto encontrado :(</p>
              </div>)
             }

  }


      return(<div>
          {exibiCarrinho()}
      </div>)
}