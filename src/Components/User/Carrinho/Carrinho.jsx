import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';




export default function Carrinho(props) {

    const [Prod, setProd] = useState(true);
    const [count, setcount] = useState(true);
    const [Valor, setValor] = useState(true);

    const prencherArray = () => {
        var array = []
        var array2 = []
        for (let i = 0; i < 10; i++) {
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
        }
        console.log(recebe);
        const HtmlTotal = (
            <tr >
                <th scope="row">Total</th>
                <td></td>
                <td></td>
                <td></td>
                <td>R$ {recebe.toFixed(2).replace(".", ",")}</td>
                <td><button type="button" class="btn btn-success">Confirmar</button></td>

            </tr>
        )
        return HtmlTotal;


    }

    const exibiCarrinho = () => {
        console.log(Prod)
        if (Prod && Prod.length) {
            const ProdutoCarrinho = Prod.map((item, indice) =>
                (

                    <tr key={indice}>
                        <th scope="row">{indice + 1}</th>
                        <td>
                            {//}       <img className="card-img-top img-fluid " src={"https://i.ibb.co/" + item.imagem} />
                            }</td>
                        <td>{item.nomeProd}</td>
                        <td>{item.quantidade}</td>
                        <td>R$ {item.valorfinal.toFixed(2).replace(".", ",")}</td>
                        <td><a onClick={() => {
                            sessionStorage.removeItem(indice);
                            alert('Deletado com sucesso ')
                        }} href="/Carrinho" class="btn btn-danger " role="button" aria-pressed="true">Excluir</a></td>

                    </tr>
                )
            )
            return ProdutoCarrinho;
        } else {
            return (
                <div className="alert alert-light">
                    <p>Nenhum produto encontrado no carrinho :(</p>
                </div>)
        }

    }

    function headTabela() {
        const head = (
            <thead class="thead-dark">
                <tr>
                    <th scope="col">#</th>
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
            <table class="table">
                {headTabela()}
                <tbody>
                    {exibiCarrinho()}
                    {exibiTotal()}
                </tbody>
            </table>
        </div>)
    
}
 //}   <img className="card-img-top img-fluid " src={"https://i.ibb.co/"+item.imagem} />
