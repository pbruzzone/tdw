const pantalla = document.getElementById('pantalla');
const teclas = document.querySelector('.calculadora-teclas');

let primerOperando = null;
let operador = null;
let esperandoPorSegundoOperando = false;

teclas.addEventListener('click', (event) => {
    const elemento = event.target;

    if (!elemento.matches('button')) {
        return;
    }

    if (elemento.classList.contains('operador')) {
        procesarOperador(elemento.value);
        return;
    }

    if (elemento.classList.contains('decimal')) {
        entradaDecimal(elemento.value);
        return;
    }

    if (elemento.classList.contains('ac')) {
        resetearCalculadora();
        return;
    }

    entradaDigito(elemento.value);
});

function entradaDigito(digito) {
    if (esperandoPorSegundoOperando) {
        pantalla.value = digito;
        esperandoPorSegundoOperando = false;
    } else {
        pantalla.value = pantalla.value === '0' 
        ? digito 
        : pantalla.value + digito;
    }
}

function entradaDecimal(punto) {
    if (esperandoPorSegundoOperando) {
        pantalla.value = '0.';
        esperandoPorSegundoOperando = false;
        return;
    }
    if (!pantalla.value.includes(punto)) {
        pantalla.value += punto;
    }
}

function procesarOperador(proximoOperador) {
    const entradaValor = parseFloat(pantalla.value);

    if (operador && esperandoPorSegundoOperando) {
        operador = proximoOperador;
        return;
    }

    if (primerOperando === null) {
        primerOperando = entradaValor;
    } else if (operador) {
        const resultado = realizarCalculo[operador](primerOperando, entradaValor);

        if (resultado === 'Error: División por cero') {
            pantalla.value = resultado;
            resetearCalculadora(); 
            return;
        }
        pantalla.value = String(resultado);
        primerOperando = resultado;
    }

    esperandoPorSegundoOperando = true;
    operador = proximoOperador;
}

const realizarCalculo = {
    '/': (primero, segundo) => {
        if (segundo === 0) {
            return 'Error: División por cero';
        }
        return primero / segundo;
    },
    '*': (primero, segundo) => primero * segundo,
    '+': (primero, segundo) => primero + segundo,
    '-': (primero, segundo) => primero - segundo,
    '=': (primero, segundo) => segundo 
};

function resetearCalculadora() {
    pantalla.value = '0';
    primerOperando = null;
    operador = null;
    esperandoPorSegundoOperando = false;
}
