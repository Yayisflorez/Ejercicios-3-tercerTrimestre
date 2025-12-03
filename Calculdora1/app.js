const display = document.getElementById("resultado");
const botones = document.querySelectorAll("button");

let parenAbierto = false;

// Mostrar 0 al iniciar
display.value = "0";

// Función para agregar texto
function agregar(valor) {

    // Si hay un error en pantalla → reemplazar con 0
    if (display.value === "Error") {
        display.value = "0";
    }

    // Reemplazar el 0 si se ingresa un número
    if (display.value === "0" && valor >= "0" && valor <= "9") {
        display.value = valor;
        return;
    }

    // Caso especial para el punto decimal
    if (display.value === "0" && valor === ".") {
        display.value = "0.";
        return;
    }

    // Evitar dos puntos seguidos
    if (valor === "." && display.value.includes(".")) {
        return;
    }

    // Evitar operador como primer carácter
    if (display.value === "0" && (valor === "+" || valor === "-" || valor === "*" || valor === "/" || valor === "%")) {
        display.value = "Error";
        return;
    }

    display.value += valor;
}

// Función borrar todo
function borrarTodo() {
    display.value = "0";
    parenAbierto = false;
}

// Función paréntesis
function parentesis() {
    if (display.value === '0') {
        display.value = '(';
        parenAbierto = true;
    } else if (parenAbierto == true) {
        display.value += ')';
        parenAbierto = false;
    } else {
        display.value += '(';
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
    setTimeout(() => display.value = "0", 2000);
}

// Calcular raíz normal √x
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

// Eliminar último carácter
function borrarUltimo() {
    if (display.value.length === 1) {
        display.value = "0";
    } else {
        display.value = display.value.slice(0, -1);
    }
}

// Porcentaje
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
    try {
        let numero = eval(display.value);
        if (isNaN(numero)) throw new Error();

        // Pedir N al usuario
        let n = prompt("Digite el índice de la raíz (N):");

        n = Number(n);
        if (isNaN(n) || n === 0) throw new Error();

        let resultado = Math.pow(numero, 1 / n);

        display.value = Number(resultado.toFixed(3));
        borrarDespues();

    } catch {
        display.value = "Error";
    }

}


function calcular() {
    try {
        if (display.value.includes("/0")) {
            throw new Error("division zero");
        }

        let resultado = eval(display.value);

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

// Manejar los clics
function manejarClickBoton(event) {
    let valor = event.target.textContent;

    // Convertir × a *
    if (valor === "×") {
        valor = "*";
    }

    if (valor === "C") {
        borrarTodo();
    }
    else if (valor === "()") {
        parentesis();
    }
    else if (valor === "=") {
        calcular();
    }
    else if (valor === "%") {
        porcentaje();
    }
    else if (valor === "√") {
        calcularRaiz();
    }
    else if (valor === "←") {
        borrarUltimo();
    }
    else if (valor === "x^n") {
        potenciaN();
    }
    else if (valor === "n√") {
        raizN();
    }
    else if (valor === "x^2") {
        potencia2();
    }
    else {
        agregar(valor);
    }
}

// Asignar eventos a cada botón
for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", manejarClickBoton);
}
