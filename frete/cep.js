// 📦 Cálculo de frete via API corrigido
async function calcularFrete() {
    const cep = document.getElementById("cepInput").value.replace(/\D/g, "");
    const resultado = document.getElementById("resultadoFrete");

    if (cep.length !== 8) {
        resultado.innerHTML = "❌ CEP inválido (use 8 números)";
        return;
    }

    resultado.innerHTML = "⏳ Calculando...";

    try {

        // 🔥 CORREÇÃO: faltavam ASPAS na URL
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const dados = await response.json();

        if (dados.erro) {
            resultado.innerHTML = "❌ CEP não encontrado";
            return;
        }

        const estado = dados.uf;
        let frete = 0;
        let prazo = "7 a 12 dias úteis";

        switch (estado) {
            case "SP":
            case "RJ":
            case "MG":
            case "ES":
                frete = 45.50;
                prazo = "3 a 7 dias úteis";
                break;

            case "PR":
            case "SC":
            case "RS":
                frete = 57.50;
                prazo = "4 a 8 dias úteis";
                break;

            case "BA":
            case "PE":
            case "CE":
            case "PB":
            case "RN":
            case "MA":
            case "PI":
            case "AL":
                frete = 16.90;
                prazo = "6 a 10 dias úteis";
                break;

            default:
                frete = 100.00;
                prazo = "7 a 12 dias úteis";
        }

        resultado.innerHTML = `
            📦 <strong>Frete:</strong> R$ ${frete.toFixed(2)} <br>
            ⏰ <strong>Prazo:</strong> ${prazo} <br>
            🏙️ ${dados.localidade} - ${dados.uf}
        `;

    } catch (erro) {
        resultado.innerHTML = "❌ Erro ao consultar CEP";
        console.log(erro);
    }
}
