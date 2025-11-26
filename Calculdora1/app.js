const display = document.getElementById("resultado");
const botones = document.querySelectorAll("button");

// Mostrar 0 al iniciar
display.value = "0";

// Función para agregar texto
function agregar(valor) {

    // Si hay un error en pantalla, reemplazar por lo nuevo
    if (display.value === "Error") {
        display.value = "0";
    }

    // Si el display solo tiene "0" y se agrega número → sustituir
    if (display.value === "0" && valor >= "0" && valor <= "9") {
        display.value = valor;
        return;
    }

    // Si presiona "." cuando hay un "0"
    if (display.value === "0" && valor === ".") {
        display.value = "0.";
        return;
    }

    // No permitir dos puntos
    if (valor === "." && display.value.includes(".")) {
        return;
    }

    // Si intenta poner un operador como primer carácter
    if (display.value === "0" && (valor === "+" || valor === "-" || valor === "*" || valor === "/")) {
        display.value = "Error";
        return;
    }

    display.value += valor;
}

// Función borrar todo
function borrarTodo() {
    display.value = "0";
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
        var numero = eval(display.value);
        display.value = numero / 100;
    } catch (e) {
        display.value = "Error";
    }
}

// Evaluar expresión
function calcular() {
    try {
        if (display.value.includes("/0")) {
            throw new Error("division zero");
        }

        var resultado = eval(display.value);

        if (isNaN(resultado) || resultado === Infinity) {
            throw new Error("invalido");
        }

        display.value = resultado;

        // Después de unos segundos, volver a 0
        setTimeout(function() {
            display.value = "0";
        }, 2000);

    } catch (error) {
        display.value = "Error";
    }
}

// Escuchar todos los botones

function manejarClickBoton(event) {
    let valor = event.target.textContent;


    if (valor === "×") {
        valor = "*";
    }

    if (valor === "C") {
        borrarTodo();
    } 
    else if (valor === "←") {
        borrarUltimo();
    }
    else if (valor === "=") {
        calcular();
    }
    else if (valor === "%") {
        porcentaje();
    }
    else {
        agregar(valor);
    }
}



for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", manejarClickBoton);
}