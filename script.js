let totalItens = 0;
let totalValor = 0;

function adicionarAoCarrinho(nome, preco) {
  totalItens++;
  totalValor += preco;

  document.getElementById("total-itens").textContent = totalItens;
  document.getElementById("total-valor").textContent = totalValor.toFixed(2);

  alert(`${nome} foi adicionado ao carrinho!`);
}



// 🔍 Função para pesquisar produtos
function pesquisar() {
    let texto = document.getElementById("searchInput").value.toLowerCase();
    let produtos = document.querySelectorAll(".produto");
    let encontrou = false;

    produtos.forEach(produto => {
        let nomeProduto = produto.querySelector("h3").textContent.toLowerCase();

        if (nomeProduto.includes(texto)) {
            produto.style.display = "block"; // mostra
            encontrou = true;
        } else {
            produto.style.display = "none"; // esconde
        }
    });

    // Mostra mensagem de status da pesquisa
    if (texto === "") {
        document.getElementById("resultado").textContent = "";
        produtos.forEach(p => p.style.display = "block"); // mostra tudo
    } 
    else if (!encontrou) {
        document.getElementById("resultado").textContent = "Nenhum produto encontrado.";
    } 

}

function mostrarMensagem(texto) {
  const aviso = document.createElement("div");
  aviso.className = "msg-sucesso";
  aviso.innerText = texto;

  document.body.appendChild(aviso);

  setTimeout(() => {
    aviso.remove();
  }, 2000);
}

function adicionarAoCarrinho(nome, preco) {
  totalItens++;
  totalValor += preco;

  document.getElementById("total-itens").textContent = totalItens;
  document.getElementById("total-valor").textContent = totalValor.toFixed(2).replace('.', ',');

  mostrarMensagem(`${nome} adicionado ao carrinho!`);
}

