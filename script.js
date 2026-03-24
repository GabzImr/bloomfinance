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

document.addEventListener("DOMContentLoaded", () => {

  const inputs = document.querySelectorAll(".valor");
  const chart = document.querySelector(".chart");
  const saldo = document.getElementById("saldo");

  const saldoInicial = 22567;

  function atualizar() {

    let valores = [];

    inputs.forEach(input => {
      let v = Number(input.value);
      if (!isNaN(v) && v > 0) {
        valores.push(v);
      }
    });

    let totalGasto = valores.reduce((a,b)=>a+b,0);
    let restante = saldoInicial - totalGasto;

    saldo.innerText = "R$ " + restante;

    if (valores.length === 0) {
      chart.style.background = "#222";
      return;
    }

    let soma = valores.reduce((a,b)=>a+b,0);

    let inicio = 0;
    let cores = ["#ff2a8c","#7a3cff","#1c4ea3","#0f7a5c","#ff9900"];
    let grad = "";

    (valores.length ? valores : [saldoInicial]).forEach((v,i)=>{
      let fatia = (v/soma)*100;
      grad += `${cores[i]} ${inicio}% ${inicio+fatia}%,`;
      inicio += fatia;
    });

    chart.style.background = `conic-gradient(${grad})`;
  }

  inputs.forEach(input => {
    input.addEventListener("input", atualizar);
  });
atualizar();
});