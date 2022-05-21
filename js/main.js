let botonInscripcion = document.getElementById("botonInscripcion");
botonInscripcion.addEventListener("click", inscribir);

function inscribir(){
    let formulario = [];
    formulario.push({campo: 'Nombre', valor: document.getElementById("nombre").value});
    formulario.push({campo: 'Apellido', valor: document.getElementById("apellido").value});
    formulario.push({campo: 'Fecha de nacimiento', valor: document.getElementById("nacimiento").value});
    formulario.push({campo: 'Email', valor: document.getElementById("correo").value});
    formulario.push({campo: 'DNI o número de identificación', valor: document.getElementById("dni").value});
    formulario.push({campo: 'Teléfono', valor: document.getElementById("telefono").value});
    formulario.push({campo: 'Dirección', valor: document.getElementById("direccion").value});
    formulario.push({campo: 'Provincia', valor: document.getElementById("provincia").value});
    formulario.push({campo: 'Localidad', valor: document.getElementById("localidad").value});
    formulario.push({campo: 'País', valor: document.getElementById("pais").value});
    formulario.push({campo: 'Nivel educativo', valor: document.getElementById("educativo").value});
    formulario.push({campo: 'Ocupación laboral o profesión', valor: document.getElementById("profesion").value});
    formulario.push({campo: '¿Que estudiaste?', valor: document.getElementById("carrera").value});
    formulario.push({campo: '¿Como te enteraste del curso de Marketing Digital y Community Manager?', valor: document.getElementById("enterarse").value});
    formulario.push({campo: '¿Por cuáles de estos medios te comunicaste antes de completar la inscripción al curso?', valor: document.getElementById("comunicarse").value});
    
    let datosCorrectos = true;
    for (const campo of formulario){    
        if(campo.valor == ""){
            alert(`Es necesario completar el campo ${campo.campo}`);
            datosCorrectos = false;
            break;
        }
    }

    if(datosCorrectos){
        if(document.getElementById("plan1").checked){
            formulario.push({campo: 'Plan de pago elegido', valor: `Plan regular mes a mes`});
        }else if(document.getElementById("plan2").checked){
                formulario.push({campo: 'Plan de pago elegido', valor: `Suscripción mensual`});
        }else{
            alert(`Es necesario elegir un plan de pago`);
            datosCorrectos = false;
        }
    }
  
    if (datosCorrectos){
        let ficha = ``;
        for (campo of formulario){
            ficha = ficha + `<p><span class="respuesta_campo">${campo.campo}: </span><span class="respuesta_valor">${campo.valor}</span></p>`;
        }
        document.getElementById(`respuesta_ficha`).innerHTML = ficha;

        document.getElementById(`respuesta`).classList.remove(`invisble`);
        document.getElementById(`respuesta`).classList.add(`visible`);
    }
}
