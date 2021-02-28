import React, { useState, useEffect } from 'react';
import './Carrinho.css';
import {  Redirect } from 'react-router-dom';




export default function Carrinho(props) {

    const [Prod, setProd] = useState(true);
    const [count, setcount] = useState(true);
    const [Valor, setValor] = useState(true);
    const [redirect, setredirect] = useState(false);
    
    

    const prencherArray = () => {
        var array = []
        var array2 = []
        for (let i = 0; i < 99; i++) {
            let tranformador = sessionStorage.getItem(i);
            if (tranformador != null) {
                let tranformado = JSON.parse(tranformador);
                array2.push(tranformado.valorfinal);
                array.push(tranformado);
            }
        }
        setProd(array);
        setValor(array2);
    }

    useEffect(() => {
        prencherArray()
    }, [count]);

    const exibiTotal = () => {
        var recebe = 0;
        if (Valor && Valor.length) {
            var valor
            const colunaFinal = Valor.reduce(function (total, numero) {
                valor = total + numero;
                return valor;
            }, 0);
            recebe = colunaFinal + 0;
            console.log(colunaFinal);
            sessionStorage.setItem("valcarrinho",colunaFinal);
        }
        const HtmlTotal = (
            <tr >
                <th scope="row">Total</th>
                <td></td>
                <td></td>
                <td></td>
                <td>R$ {recebe.toFixed(2).replace(".", ",")}</td>
                <td><button onClick={carrinho}   className="btn btn-success">Confirmar</button></td>

            </tr>
        )
        return HtmlTotal;


    }
    const carrinho = () => {
        if (Prod && Prod.length) {
           let verifica = window.confirm('Deseja finalizar a compra?');
           setredirect(verifica);
           if(verifica){
               console.log(verifica);
            return(
            <div> 
            <Redirect to="/ConfirmaCompra" />
            </div>)
           }
        }
        else {
            alert( 'Nenhum Produto Cadastrado')
        }
    }
    const redireciona =()=>{
        if(redirect){
         return(
         <div> 
         <Redirect to="/ConfirmaCompra" />
         </div>)
        }

    }
    const a = () => {
        setcount(1)
    }

    const exibiCarrinho = () => {
        console.log(JSON.stringify(Prod));
        if (Prod && Prod.length) {
            const ProdutoCarrinho = Prod.map((item, indice) =>
                (

                    <tr key={indice}>
                        <th scope="row">{indice + 1}</th>
                        <td>
                            <img src={"https://i.ibb.co/" + item.imagem} className="img-tamanho mr-3" alt="..." />
                        </td>
                        <td>{item.nomeProd}</td>
                        <td>{item.quantidade}</td>
                        <td>R$ {item.valorfinal.toFixed(2).replace(".", ",")}</td>
                        <td><a onClick={() => {
                            sessionStorage.removeItem(item.id);
                            alert('Deletado com sucesso ')
                        }} href="/Carrinho" className="btn btn-danger " role="button" aria-pressed="true">Excluir</a></td>

                    </tr>
                )
            )

            return ProdutoCarrinho;
        } else {
            return (
                <tr>
                    <th>
                        Nenhum produto encontrado no carrinho :(
                    </th>

                </tr>)
        }

    }

    function headTabela() {
        const head = (
            <thead className="thead-dark">
                <tr>
                    <th scope="col"></th>
                    <th scope="col">Imagem</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Quantidade</th>
                    <th scope="col">Valor total</th>
                    <th scope="col">Excluir</th>
                </tr>
            </thead>
        )
        return head;
    }

    return (
        <div>
            {redireciona()}
            <table className="table">
                {headTabela()}
                <tbody>
                    {exibiCarrinho()}
                    {exibiTotal()}
                </tbody>
            </table>
        </div>)

}
 //}   <img className="card-img-top img-fluid " src={"https://i.ibb.co/"+item.imagem} />
