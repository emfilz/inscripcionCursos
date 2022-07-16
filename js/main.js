function botonFormulario(){
    let botonInscripcion = document.getElementById("botonInscripcion");
    botonInscripcion.addEventListener("click", inscribir);
}

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
            Swal.fire({
                icon: 'error',
                title: 'Por favor completa todos los datos',
                text: `El dato ${campo.campo} esta vacio`,
                footer: 'Los datos los vamos a utilizar para armar tu ficha de estudiante'
              })              
            datosCorrectos = false;
            break;
        }
    }

    let planElegido = "";
    if(datosCorrectos){
        if(document.getElementById("plan1").checked){
            planElegido = `Plan regular mes a mes`;
            formulario.push({campo: 'Plan de pago elegido', valor: planElegido});
        }else if(document.getElementById("plan2").checked){
                planElegido = `Suscripción mensual`;
                formulario.push({campo: 'Plan de pago elegido', valor: planElegido});
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Por favor completa todos los datos',
                text: `No elegiste tu Plan de Pago`,
                footer: 'Los datos los vamos a utilizar para armar tu ficha de estudiante'
              })  
            datosCorrectos = false;
        }
    }

    datosCorrectos ? confirmar(planElegido, formulario) : "";

}

function confirmar(planElegido, formulario){
    const maxInscripciones = 1000;
    Swal.fire({
        title: 'Ya tenemos todos tus datos',
        text: `Elegiste el Plan de Pago ${planElegido}`,
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Modificar'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch('https://jsonplaceholder.typicode.com/posts')
                .then( (res) => res.json())
                .then( (data) => {
                    if (data.length < maxInscripciones){
                        emailjs.sendForm("service_vxcc1fw", "template_vmtcb1r", document.getElementById("formularioInsc"), "QphrKaQYBCnDdJbkf")
                            .then(function(response) {
                                sessionStorage.setItem("FormularioInscripcion",JSON.stringify(formulario));
                                window.location.href = "./fichadeestudiante.html";
                            }, function(error) {
                                console.log('FAILED...', error);
                        });
                    }else{
                        alert(data.length)
                    }
            })
        }
    })
}

function fichaEstudiante(){
    const formulario = JSON.parse(sessionStorage.getItem("FormularioInscripcion"));
    let ficha = ``;
    for (campo of formulario){
        ficha = ficha + `<p><span class="respuesta_campo">${campo.campo}: </span><span class="respuesta_valor">${campo.valor}</span></p>`;
    }
    document.getElementById(`respuesta_ficha`).innerHTML = ficha;
}
