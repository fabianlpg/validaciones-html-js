export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    };

    //console.log(input.parentElement);
    if (input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMsgDeError(tipoDeInput, input);
    };
};

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];

const mensajesDeError = {
    nombre: {
        valueMissing: "El nombre no puede estar vacio.",
    }, 
    email: {
        valueMissing: "El correo no puede estar vacio.",
        typeMismatch: "Estructura de correo electrónico no valida.",
    }, 
    password: {
        valueMissing: "La contraseña es necesaria para crear tu cuenta en este sitio.",
        patternMismatch: "Al menos 6 caracteres, máximo 12, debe considerar minusculas, mayusculas, números y no puede contener caracteres especiales.",
    },
    nacimiento: {
        //valueMissing: "Selecciona una fecha de nacimiento valida",
        //customError: "Debes tener al menos 18 años.",
        customError: "Selecciona una fecha de nacimiento valida.",
    },
    number: {
        valueMissing: "Introduce tu número telefónico a 10 dígitos.",
        patternMismatch: "El formato requerido es (XX) XXXX - XXXX",
    },
    direccion: {
        valueMissing: "Introduce una direccioón valida.",
        patternMismatch: "Formato mínimo: calle, lote, manzana, número exterior y/o interior.",
    },
    ciudad: {
        valueMissing: "Introduce tu ciudad o municipio.",
        patternMismatch: "La ciudad debe contener al menos 4 caracteres.",
    },
    estado: {
        valueMissing: "Introduce tu estado o provincia.",
        patternMismatch: "El estado debe contener al menos 4 caracteres.",
    },
};

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
};

function mostrarMsgDeError(tipoDeInput, input) {
    let msg = "";
    tipoDeErrores.forEach( error => {
        if (input.validity[error]){
            //console.log(tipoDeInput, error);
            //console.log(input.validity[error]);

            //console.log(mensajesDeError[tipoDeInput][error]);
            msg = mensajesDeError[tipoDeInput][error];
        }
    })
    return msg;
};

function validarNacimiento(input) {
    const fechaIngresada = new Date(input.value);
    let mensaje = "";
    if(!mayorEdad(fechaIngresada)){
        mensaje = "Debes tener al menos 18 años.";
    };
    input.setCustomValidity(mensaje);
    input.reportValidity();
};

function mayorEdad(fechaIngresada) {
    const currentDate = new Date();
    const diferenciaFechas = new Date(
        fechaIngresada.getUTCFullYear() + 18,
        fechaIngresada.getUTCMonth(),
        fechaIngresada.getUTCDate());
    return diferenciaFechas <= currentDate;
};