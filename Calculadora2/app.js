let resultado = document.getElementById("resultado");

resultado.value = "0";

// --------------------- NÚMEROS ---------------------
function appendNumber(num) {
    if (resultado.value === "0") {
        resultado.value = num;
    } else {
        resultado.value += num;
    }
}

// --------------------- PUNTO DECIMAL ---------------------
function appendDecimal() {
    let valor = resultado.value;
    let ultimaParte = "";

    for (let i = valor.length - 1; i >= 0; i--) {
        if ("+-*/".includes(valor[i])) break;
        ultimaParte = valor[i] + ultimaParte;
    }
    if (!ultimaParte.includes(".")) {
        resultado.value += ".";
    }
}

// --------------------- OPERADORES ---------------------
function appendOperator(op) {
    if (resultado.value === "0") {
        alert("El formato usado no es válido!");
        return;
    }

    let ultimo = resultado.value.slice(-1);

    if ("+-*/".includes(ultimo)) return;

    resultado.value += op;
}

// --------------------- LIMPIAR TODO ---------------------
function clearAll() {
    resultado.value = "0";
}

// --------------------- BORRAR UNO ---------------------
function deleteLast() {
    if (resultado.value.length === 1) {
        resultado.value = "0";
    } else {
        resultado.value = resultado.value.slice(0, -1);
    }
}

// --------------------- PORCENTAJE ---------------------
function percent() {
    try {
        resultado.value = (parseFloat(resultado.value) / 100).toString();
    } catch {
        resultado.value = "Error";
        setTimeout(() => resultado.value = "0", 2000);
    }
}

// --------------------- CALCULAR ---------------------
function calculate() {
    try {
        let expr = resultado.value.replace(/×/g, "*");

        if (expr.includes("/0")) throw new Error("division_cero");

        let res = eval(expr);

        if (isNaN(res)) throw new Error("expresion_invalida");

        resultado.value = res;
        setTimeout(() => resultado.value = "0", 3000);

    } catch {
        resultado.value = "Error";
        setTimeout(() => resultado.value = "0", 3000);
    }
}
