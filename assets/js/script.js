function irLogin() {
  window.location.href = "/assets/pages/login.html";
}

function irCadastro() {
  window.location.href = "/assets/pages/cadastro.html";
}

function entrar() {
  let email = document.querySelector("input[type='email']").value;
  let senha = document.querySelector("input[type='password']").value;

 
  if (email === "test123" && senha === "123456") {
    window.location.href = "/assets/pages/dashboard.html";
  } else {
    alert("Login inválido");
  }
}

document.addEventListener("DOMContentLoaded", () => {

  const inputs = document.querySelectorAll(".valor");
  const chart = document.querySelector(".chart");
  const saldo = document.getElementById("saldo");

  const saldoInicial = 22567;

  function atualizar() {

    let valores = [];
    let cores = [];

    inputs.forEach(input => {
      let v = Number(input.value);
      let card = input.closest(".card");

      if (!isNaN(v) && v > 0) {
        valores.push(v);

        // 🔥 CORRIGIDO AQUI
        let cor = card.getAttribute("data-cor");
        cores.push(cor);
      }
    });

    let totalGasto = valores.reduce((a,b)=>a+b,0);
    let restante = saldoInicial - totalGasto;

    saldo.innerText = "R$ " + restante;

    let dados = valores.length ? valores : [saldoInicial];
    let coresFinais = valores.length ? cores : ["#ff2a8c"];

    let soma = dados.reduce((a,b)=>a+b,0);

    let inicio = 0;
    let grad = "";

    dados.forEach((v,i)=>{
      let fatia = (v/soma)*100;
      grad += `${coresFinais[i % coresFinais.length]} ${inicio}% ${inicio+fatia}%`;
      if (i < dados.length - 1) grad += ",";
      inicio += fatia;
    });

    chart.style.background = `conic-gradient(${grad})`;
  }

  inputs.forEach(input => {
    input.addEventListener("input", atualizar);
  });

  atualizar();

});