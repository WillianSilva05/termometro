import * as db_meta from "../meta";
import * as db_vendido from "../vendido";

// Calculando os dias do mês

let faltaParaFimDoMes = document.getElementById("faltaParaFimDoMes");
let myDate = new Date();

Date.prototype.diasNoCorrenteMes = function () {
    var days = [30, 31],
        m = this.getMonth();

    if (m === 1) {
        return this.getFullYear() % 4 === 0 &&
            (this.getFullYear() % 100 !== 0 || this.getFullYear() % 400 === 0)
            ? 29
            : 28;
    } else {
        return days[(m + (m < 7 ? 1 : 0)) % 2];
    }
};

faltaParaFimDoMes.innerHTML = myDate.diasNoCorrenteMes() - myDate.getDate();

// Definindo valores dos cards

let meta = document.getElementById("meta");
meta.innerHTML = db_meta.default.meta;

let vendido = document.getElementById("vendido");
let totalVendido = document.getElementById("totalVendido");
vendido.innerHTML = db_vendido.default.vendido;

totalVendido.value = db_vendido.default.vendido;

let dia = myDate.diasNoCorrenteMes() - myDate.getDate();

let faltaParaMeta = document.getElementById("faltaParaMeta");
faltaParaMeta.innerHTML =
    parseInt(meta.textContent) - parseInt(vendido.textContent);

let metaDoDia = document.getElementById("metaDoDia");
metaDoDia.innerHTML = (Number(faltaParaMeta.textContent) / Number(dia)).toFixed(
    2
);

let cifrao = document.getElementsByClassName("cifrao");

if (Number(db_meta.default.meta) <= Number(db_vendido.default.vendido)) {
    for (let index = 0; index < cifrao.length; index++) {
        cifrao[index].innerHTML = "";
    }
    faltaParaMeta.innerText = "Meta batida!";
    metaDoDia.innerText = "Meta batida!";
} else {
    for (let index = 0; index < cifrao.length; index++) {
        cifrao[index].innerHTML = "R$";
    }
    let faltaParaMeta = document.getElementById("faltaParaMeta");
    faltaParaMeta.innerHTML =
        parseInt(meta.textContent) - parseInt(vendido.textContent);

    let metaDoDia = document.getElementById("metaDoDia");
    metaDoDia.innerHTML = (
        Number(faltaParaMeta.textContent) / Number(dia)
    ).toFixed(2);
}

// Fechando os forms de add

let closeMeta = document.getElementById("closeMeta");

closeMeta.addEventListener("click", () => {
    let alterarMeta = document.getElementById("alterarMeta");

    alterarMeta.style.display = "none"
})

let closeVenda = document.getElementById("closeVenda");

closeVenda.addEventListener("click", () => {
    let addVendaForm = document.getElementById("addVendaForm");

    addVendaForm.style.display = "none"
})

let closeEdit = document.getElementById("closeEdit");

closeEdit.addEventListener("click", () => {
    let editVendaForm = document.getElementById("editVendaForm");

    editVendaForm.style.display = "none"
})