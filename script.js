let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
let total = 0;

// Calcula o total baseado na quantidade
function calcularTotal() {
    total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
}

// Adicionar item ao carrinho
function adicionarCarrinho(nome, preco) {
    const index = carrinho.findIndex(item => item.nome === nome);

    if (index >= 0) {
        carrinho[index].quantidade += 1;
    } else {
        carrinho.push({ nome, preco, quantidade: 1 });
    }

    calcularTotal();
    salvarCarrinho();
    atualizarCarrinho();
}

// Salva o carrinho no localStorage
function salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

// Atualizar popup do carrinho
function atualizarCarrinho() {
    const lista = document.getElementById("listaCarrinho");
    const totalElement = document.getElementById("totalCarrinho");
    const contador = document.getElementById("contadorCarrinho");

    lista.innerHTML = "";

    carrinho.forEach((item, index) => {
        lista.innerHTML += `
    <li>
        <div>
            ${item.nome} - R$ ${item.preco.toFixed(2)}
        </div>

        <div class="quantidade-container">
            <button class="btn-quantidade" onclick="alterarQuantidade(${index}, -1)">-</button>
            <span class="quantidade-numero">${item.quantidade}</span>
            <button class="btn-quantidade" onclick="alterarQuantidade(${index}, 1)">+</button>
        </div>

        
    </li>
`;

    });

    totalElement.textContent = total.toFixed(2);
    contador.textContent = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
}

// Alterar quantidade
function alterarQuantidade(index, delta) {
    carrinho[index].quantidade += delta;

    if (carrinho[index].quantidade <= 0) {
        carrinho.splice(index, 1);
    }

    calcularTotal();
    salvarCarrinho();
    atualizarCarrinho();
}

// Remover item
function removerItem(index) {
    carrinho.splice(index, 1);
    calcularTotal();
    salvarCarrinho();
    atualizarCarrinho();
}

function abrirCarrinho() {
    document.getElementById("carrinhoPopup").style.display = "block";
}

function fecharCarrinho() {
    document.getElementById("carrinhoPopup").style.display = "none";
}

<<<<<<< HEAD
// Finalizar compra
=======
>>>>>>> e0f1b2ca201ddaa0ffc7d8cffce1c33ab8ed6034
function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    localStorage.setItem('total', total.toFixed(2));
    window.location.href = "checkout.html";
}

// Atualiza ao carregar a página
calcularTotal();
atualizarCarrinho();


// 🔍 Buscar produtos
function pesquisar() {
    let texto = document.getElementById("searchInput").value.toLowerCase();
    let produtos = document.querySelectorAll(".produto");
    let encontrou = false;

    produtos.forEach(produto => {
        let nomeProduto = produto.querySelector("h3").textContent.toLowerCase();

        if (nomeProduto.includes(texto)) {
            produto.style.display = "block";
            encontrou = true;
        } else {
            produto.style.display = "none";
        }
    });

    if (texto === "") {
        document.getElementById("resultado").textContent = "";
        produtos.forEach(p => p.style.display = "block");
    } else if (!encontrou) {
        document.getElementById("resultado").textContent = "Nenhum produto encontrado";
    }
}

function abrirProduto(id) {
    window.location.href = "produto.html?id=" + id;
}



