// Troca entre Login e Registro
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

// Capturar inputs
const signupForm = document.querySelector(".sign-up form");
const signinForm = document.querySelector(".sign-in form");

// Impede que atualize a página
document.querySelectorAll("form").forEach(form => {
    form.addEventListener("submit", e => e.preventDefault());
});

// ========== SISTEMA DE CADASTRO ==========
signupForm.querySelector("button").addEventListener("click", () => {
    const nome = signupForm.querySelector('input[type="text"]').value.trim();
    const email = signupForm.querySelector('input[type="email"]').value.trim();
    const senha = signupForm.querySelector('input[type="password"]').value.trim();

    if (!nome || !email || !senha) {
        alert("Preencha todos os campos!");
        return;
    }

    // Verifica se já existe usuário
    const users = JSON.parse(localStorage.getItem("usuarios")) || [];
    const existe = users.find(u => u.email === email);

    if (existe) {
        alert("Este e-mail já está cadastrado!");
        return;
    }

    // Salva usuário
    users.push({ nome, email, senha });
    localStorage.setItem("usuarios", JSON.stringify(users));

    alert("Cadastro realizado com sucesso!");
    container.classList.remove("active"); // volta para tela de login
});

// ========== SISTEMA DE LOGIN ==========
signinForm.querySelector("button").addEventListener("click", () => {
    const email = signinForm.querySelector('input[type="email"]').value.trim();
    const senha = signinForm.querySelector('input[type="password"]').value.trim();

    if (!email || !senha) {
        alert("Preencha todos os campos!");
        return;
    }

    const users = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuario = users.find(u => u.email === email && u.senha === senha);

    if (usuario) {
        alert(`Bem-vindo, ${usuario.nome}!`);
        // Aqui você pode redirecionar:
        
        window.location.href = "index.html";
    } else {
        alert("Email ou senha incorretos!");
    }
});
