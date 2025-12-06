const display = document.getElementById("resultado");
const botones = document.querySelectorAll("button");

let parenAbierto = false;


display.value = "0";


function agregar(valor) {

  if (display.value === "Error") {
    display.value = "0";
  }


  if (display.value === "0" && valor >= "0" && valor <= "9") {
    display.value = valor;
    return;
  }


  if (display.value === "0" && valor === ".") {
    display.value = "0.";
    return;
  }

  if (valor === "." && display.value.includes(".")) {
    return;
  }

  if (
    display.value === "0" &&
    (valor === "+" ||
      valor === "-" ||
      valor === "*" ||
      valor === "/" ||
      valor === "%")
  ) {
    display.value = "Error";
    return;
  }

  display.value += valor;
}

function borrarTodo() {
  display.value = "0";
  parenAbierto = false;
}


function parentesis() {
  if (display.value === "0") {
    display.value = "(";
    parenAbierto = true;
  } else if (parenAbierto == true) {
    display.value += ")";
    parenAbierto = false;
  } else {
    display.value += "(";
    parenAbierto = true;
  }
}

function potencia2() {
  try {
    let numero = eval(display.value);
    let resultado = numero * numero;

    display.value = Number(resultado.toFixed(3));
    borrarDespues();
  } catch {
    display.value = "Error";
  }
}

function borrarDespues() {
  setTimeout(() => (display.value = "0"), 2000);
}


function calcularRaiz() {
  try {
    let numero = eval(display.value);
    if (numero < 0) throw new Error();

    let resultado = Math.sqrt(numero);

    display.value = Number(resultado.toFixed(3));
    borrarDespues();
  } catch {
    display.value = "Error";
  }
}

function divisionNM() {
  try {
    let numero = eval(display.value);
    if (numero === 0) throw new Error("division zero");
    let resultado = 1 / numero;

    display.value = Number(resultado.toFixed(3));
    borrarDespues();
  } catch (error) {
    display.value = "Error";
  }
}

function borrarUltimo() {
  if (display.value.length === 1) {
    display.value = "0";
  } else {
    display.value = display.value.slice(0, -1);
  }
}


function porcentaje() {
  try {
    let numero = eval(display.value);
    display.value = numero / 100;
  } catch (e) {
    display.value = "Error";
  }
}

function potenciaN() {
  display.value += "^";
}

function raizN() {
  if (display.value.includes("√")) {
    // Calcular n * √x
    let expr = display.value;
    let partes = expr.split("√");
    let n = parseFloat(partes[0]);
    let x = parseFloat(partes[1]);
    if (isNaN(n) || isNaN(x) || x < 0) {
      display.value = "Error";
      return;
    }
    let resultado = n * Math.sqrt(x);
    display.value = Number(resultado.toFixed(3));
    borrarDespues();
  } else {
    display.value += "√";
  }
}

function calcular() {
  try {
    if (display.value.includes("/0")) {
      throw new Error("division zero");
    }

    let expr = display.value;

    // Manejar n√x - n * √x
    if (expr.includes("√")) {
      let partes = expr.split("√");
      if (partes.length === 2) {
        let n = parseFloat(partes[0]);
        let x = parseFloat(partes[1]);
        if (isNaN(n) || isNaN(x) || x < 0) {
          throw new Error("invalido");
        }
        let resultado = n * Math.sqrt(x);//FORMULA
        display.value = Number(resultado.toFixed(3));
        borrarDespues();
        return;
      }
    }

    // Manejar potencia: x^n - x**n
    if (expr.includes("^")) {
      let partes = expr.split("^");
      if (partes.length === 2) {
        let base = parseFloat(partes[0]);
        let exponente = parseFloat(partes[1]);
        if (isNaN(base) || isNaN(exponente)) {
          throw new Error("invalido");
        }
        let resultado = Math.pow(base, exponente);
        display.value = Number(resultado.toFixed(3));
        borrarDespues();
        return;
      }
    }

    let resultado = eval(expr);

    if (isNaN(resultado) || resultado === Infinity) {
      throw new Error("invalido");
    }

    display.value = resultado;

    setTimeout(function () {
      display.value = "0";
    }, 2000);
  } catch (error) {
    display.value = "Error";
  }
}


function manejarClickBoton(event) {
  let valor = event.target.textContent;


  if (valor === "×") {
    valor = "*";
  }

  if (valor === "C") {
    borrarTodo();
  } else if (valor === "()") {
    parentesis();
  } else if (valor === "=") {
    calcular();
  } else if (valor === "%") {
    porcentaje();
  } else if (valor === "√") {
    calcularRaiz();
  } else if (valor === "←") {
    borrarUltimo();
  } else if (valor === "x^n") {
    potenciaN();
  } else if (valor === "n√") {
    raizN();
  } else if (valor === "x^2") {
    potencia2();
  } else {
    agregar(valor);
  }
}


for (let i = 0; i < botones.length; i++) {
  botones[i].addEventListener("click", manejarClickBoton);
}
