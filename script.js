java
let totalItens = 0;
let totalValor = 0;

function adicionarAoCarrinho(nome, preco) {
  totalItens++;
  totalValor += preco;

  document.getElementById("total-itens").textContent = totalItens;
  document.getElementById("total-valor").textContent = totalValor.toFixed(2);

  alert(`${nome} foi adicionado ao carrinho!`);
}


