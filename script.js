let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
let total = 0;

// Calcula o total baseado na quantidade
function calcularTotal() {
    total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
}

// Adicionar item ao carrinho
function adicionarCarrinho(nome, preco) {
    const index = carrinho.findIndex(item => item.nome === nome);

    if(index >= 0) {
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
                ${item.nome} - R$ ${item.preco.toFixed(2)} x ${item.quantidade}
                <button onclick="alterarQuantidade(${index}, -1)">-</button>
                <button onclick="alterarQuantidade(${index}, 1)">+</button>
                <span class="remove-btn" onclick="removerItem(${index})">X</span>
            </li>
        `;
    });

    totalElement.textContent = total.toFixed(2);
    contador.textContent = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
}

// Alterar quantidade
function alterarQuantidade(index, delta) {
    carrinho[index].quantidade += delta;

    if(carrinho[index].quantidade <= 0) {
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

// Função FINAL correta
function finalizarCompra() {
    if(carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    localStorage.setItem('total', total.toFixed(2));
    window.location.href = "checkout.html";
}

// Atualiza quando a página carrega
calcularTotal();
atualizarCarrinho();


// Buscar produtos
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
    } 
    else if (!encontrou) {
        document.getElementById("resultado").textContent = ("Nenhum produto encontrado");
    }
}
