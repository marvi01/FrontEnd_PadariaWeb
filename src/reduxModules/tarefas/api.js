export function getTodosOsProdutos () {
    return fetch('http://localhost:8000/api/Produtos')
      .then(T => T.json())
  }
   
  export function getProdutoById (id) {
    return fetch(`http://localhost:8000/api/Produtos/${id}`)
      .then(T => T.json())
      .then(T => ({ ...T.pacote, ...T }))
  }
