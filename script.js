function irLogin() {
  window.location.href = "login.html";
}

function irCadastro() {
  window.location.href = "cadastro.html";
}

function entrar() {
  let email = document.querySelector("input[type='email']").value;
  let senha = document.querySelector("input[type='password']").value;

  if (email === "test123" && senha === "123456") {
    window.location.href = "dashboard.html";
  } else {
    alert("Login inválido");
  }
}

const saldoInicial = 22567;


function atualizar() {

  const inputs = document.querySelectorAll(".valor");
  const chart = document.querySelector(".chart");
  const saldo = document.getElementById("saldo");

  let valores = [];
  let cores = [];

  inputs.forEach(input => {
    let v = parseFloat(input.value);
    let card = input.closest(".card");

    if (!isNaN(v) && v > 0) {
      valores.push(v);

      let cor = card.getAttribute("data-cor");
      if (cor) cores.push(cor);
    }
  });

  let totalGasto = valores.reduce((a,b)=>a+b,0);
  let restante = saldoInicial - totalGasto;

  saldo.innerText = "R$ " + restante;

  let dados = valores.length ? valores : [saldoInicial];
  let coresFinais = valores.length ? cores : ["#ff2a8c"];

  let soma = dados.reduce((a,b)=>a+b,0);

  let inicio = 0;
  let gradParts = [];

  dados.forEach((v, i) => {
    let fatia = (v / soma) * 100;
    let cor = coresFinais[i] || "#ff2a8c";

    gradParts.push(`${cor} ${inicio}% ${inicio + fatia}%`);
    inicio += fatia;
  });

  let grad = gradParts.join(", ");
  chart.style.background = `conic-gradient(${grad})`;


  const cards = document.querySelectorAll(".card");

cards.forEach(card => {
  const input = card.querySelector(".valor");
  const fill = card.querySelector(".fill");

  if (!input || !fill) return;

  let valor = parseFloat(input.value);

  
  let texto = card.querySelector(".porcentagem");
  if (!texto) {
    texto = document.createElement("span");
    texto.className = "porcentagem";
    card.appendChild(texto);
  }

  if (!isNaN(valor) && valor > 0 && soma > 0) {
    let porcentagem = (valor / soma) * 100;

    fill.style.width = porcentagem + "%";
    texto.innerText = porcentagem.toFixed(1) + "%";
  } else {
    fill.style.width = "0%";
    texto.innerText = "";
  }
});
}

document.addEventListener("DOMContentLoaded", () => {

  const inputs = document.querySelectorAll(".valor");
  inputs.forEach(input => {
    input.addEventListener("input", atualizar);
  });

  
  const btn = document.querySelector(".add-btn");
  const form = document.querySelector(".form-add");

  btn.onclick = () => {
    form.style.display = form.style.display === "flex" ? "none" : "flex";
  };

  atualizar();
});

function adicionar() {

  const nome = document.getElementById("novaCategoria").value;
  const valor = document.getElementById("novoValor").value;

  if (!valor) return;

  const grid = document.querySelector(".grid");

  const cores = [
  "#ff2a8c", "#7a3cff", "#1c4ea3",
  "#0f7a5c", "#ff9900", "#00c2ff"
];


const usadas = Array.from(document.querySelectorAll(".card"))
  .map(c => c.getAttribute("data-cor"));


const disponiveis = cores.filter(c => !usadas.includes(c));


const pool = disponiveis.length ? disponiveis : cores;


const cor = pool[Math.floor(Math.random() * pool.length)];

  const nova = document.createElement("div");
  nova.className = "card";
  nova.setAttribute("data-cor", cor);
  nova.style.background = cor;

  nova.innerHTML = `
    <input class="nome" value="${nome}">
    <input class="valor" type="number" value="${valor}">
  `;

  grid.appendChild(nova);

  

  nova.querySelector(".valor").addEventListener("input", atualizar);


  atualizar();
}