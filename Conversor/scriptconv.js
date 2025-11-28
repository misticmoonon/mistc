function converter() {
    let valor = document.getElementById("valor").value;
    let moeda = document.getElementById("moeda").value;

    if (valor === "" || valor <= 0) {
        alert("Digite um valor válido!");
        return;
    }

    // Taxas de câmbio aproximadas (exemplo)
    const taxas = {
        USD: 900,   // 1 USD → 900 AOA
        EUR: 980,   // 1 EUR → 980 AOA
        GBP: 1150,  // 1 GBP → 1150 AOA
        BRL: 180,   // 1 BRL → 180 AOA
        CNY: 125    // 1 CNY → 125 AOA
    };

    let resultado = valor * taxas[moeda];

    document.getElementById("resultado").innerHTML =
        `Valor em Kwanza: <strong>${resultado.toLocaleString("pt-AO")} AOA</strong>`;
}

/* 
Para usar taxas reais automaticamente, substitua as taxas por:
fetch(`https://api.exchangerate-api.com/v4/latest/${moeda}`)
   .then(r => r.json())
   .then(dados => {
        let taxa = dados.rates["AOA"];
   });
*/
