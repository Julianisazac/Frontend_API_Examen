const url = 'http://localhost:8282/HistoriasClinicas '
// const url = 'https://api-hc-gdad.onrender.com/HistoriasClinicas'
const regresarListar = () => {
    window.location.href = 'index.html';
}

const listarHistoria = async () => {
    let objectId = document.getElementById('contenido');
    let contenido = '';
    
    await cogerPrecioDolar();

    fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then((res) => res.json())
        .then(function (data) {
            let listarHistoria = data.msg;

            listarHistoria.map(function (historia) {
                objectoHistoria = Object.keys(historia).map(key => key + '=' + encodeURIComponent(historia[key])).join('&');

                contenido = contenido + '<tr>' +
                    `<td>` + historia.idHistoriasClinicas + `</td>` +
                    `<td>` + historia.nombres + '</td>' +
                    `<td>` + historia.apellidos + `</td>` +
                    `<td>` + historia.fechaNacimiento + `</td>` +
                    `<td>` + historia.genero + `</td>` +
                    `<td>` + historia.fechaAtencion + `</td>` +
                    `<td>` + historia.medicos + `</td>` +
                    `<td>` + historia.precioDolar + `</td>` + 
                    `<td> <button type="button" onclick="redirreccionarEditar('${objectoHistoria}')" class="btn btn-primary">Editar</button></td>` +
                    `<td> <button type="button" onclick=" confirmarEliminar('${historia.idHistoriasClinicas}')"" class="btn btn-danger">Eliminar</button></td>` +
                    `</tr>`;
            });

            objectId.innerHTML = contenido;

        });
};


const cogerPrecioDolar = async () => {
    try {
        const response = await fetch('https://www.datos.gov.co/resource/mcec-87by.json');
        if (!response.ok) {
            throw new Error('Error al capturar el dólar');
        }
        const data = await response.json();
        const precioDolar = parseFloat(data[0].valor);
        document.getElementById('dolar').value = precioDolar.toFixed(2);
    } catch (error) {
        console.error(error.message);
    }
};

document.addEventListener('DOMContentLoaded', cogerPrecioDolar);


const registrarHistoria = () => {
    const id = document.getElementById('id').value;
    const nombres = document.getElementById('Nombre').value
    const apellidos = document.getElementById('apellido').value
    const nacimiento = document.getElementById('fecha').value
    const generos = document.getElementById('genero').value
    const atencion = document.getElementById('fecha1').value
    const doctor = document.getElementById('medico').value
    const dolar = document.getElementById('dolar').value


    if (id.length == 0) {
        document.getElementById('idHelp').innerHTML = 'Dato requerido'
    }
    else if (nombres.length == 0) {
        document.getElementById('nombreHelp').innerHTML = 'Dato requerido'
    }
    else if (apellidos.length == 0) {
        document.getElementById('apellidoHelp').innerHTML = 'Dato requerido'
    }
    else if (nacimiento.length == 0) {
        document.getElementById('fechaHelp').innerHTML = 'Dato requerido'
    }
    else if (generos.length == 0) {
        document.getElementById('generocoHelp').innerHTML = 'Dato requerido'
    }
    else if (atencion.length == 0) {
        document.getElementById('fecha1Help').innerHTML = 'Dato requerido'
    }
    else if (doctor.length == 0) {
        document.getElementById('medicoHelp').innerHTML = 'Dato requerido'
    }
    else if (dolar.length == 0) {
        document.getElementById('dolarHelp').innerHTML = 'Dato requerido'
    }
    else {
        let historia = {
            idHistoriasClinicas: id, //lo primero es la clave, lo segundo es lo que se va a enviar.
            nombres: nombres,
            apellidos: apellidos,
            fechaNacimiento: nacimiento,
            genero: generos,
            fechaAtencion: atencion,
            medicos: doctor,
            precioDolar: dolar,
        }
        //Fecth permite reaizar peticiones http a una url
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(historia), //Convertir el objeto a JSON
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then((res) => res.json())//Obtener respuesta de la petición
            .then(json => {
                alert(json.msg)

                setTimeout(() => {
                    regresarListar();
                }, 1000);

            })
            cogerPrecioDolar()
    }

}


const actualizarHistoria = () => {
    const id = document.getElementById('id').value;
    const nombres = document.getElementById('Nombre').value
    const apellidos = document.getElementById('apellido').value
    const nacimiento = document.getElementById('fecha').value
    const generos = document.getElementById('genero').value
    const atencion = document.getElementById('fecha1').value
    const doctor = document.getElementById('medico').value
    const dolar = document.getElementById('dolar').value


    if (id.length == 0) {
        document.getElementById('idHelp').innerHTML = 'Dato requerido'

    }
    else if (nombres.length == 0) {
        document.getElementById('nombreHelp').innerHTML = 'Dato requerido'
    }
    else if (apellidos.length == 0) {
        document.getElementById('apellidoHelp').innerHTML = 'Dato requerido'
    }
    else if (nacimiento.length == 0) {
        document.getElementById('fechaHelp').innerHTML = 'Dato requerido'
    }
    else if (generos.length == 0) {
        document.getElementById('generocoHelp').innerHTML = 'Dato requerido'
    }
    else if (atencion.length == 0) {
        document.getElementById('fecha1Help').innerHTML = 'Dato requerido'
    }
    else if (doctor.length == 0) {
        document.getElementById('medicoHelp').innerHTML = 'Dato requerido'
    }
    else if (dolar.length == 0) {
        document.getElementById('dolarHelp').innerHTML = 'Dato requerido'
    }
    else {
        let historia = {
            idHistoriasClinicas: id, //lo primero es la clave, lo segundo es lo que se va a enviar.
            nombres: nombres,
            apellidos: apellidos,
            fechaNacimiento: nacimiento,
            genero: generos,
            fechaAtencion: atencion,
            medicos: doctor,
            precioDolar:dolar,
        }
        //Fecth permite reaizar peticiones http a una url
        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(historia), //Convertir el objeto a JSON
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then((res) => res.json())//Obtener respuesta de la petición
            .then(json => {
               alert(json.msg)

                setTimeout(() => {
                    regresarListar();
                }, 1000);

            })
            cogerPrecioDolar()
    }


}
const redirreccionarEditar = (historias) => {
    document.location.href = "editarHistoria.html?Historias" + historias
}

const editarHistoria = () => {
    var urlparams = new URLSearchParams(window.location.search);

    document.getElementById('id').value = urlparams.get('idHistoriasClinicas');
    document.getElementById('Nombre').value = urlparams.get('nombres');
    document.getElementById('apellido').value = urlparams.get('apellidos');
    document.getElementById('fecha').value = urlparams.get('fechaNacimiento');
    document.getElementById('genero').value = urlparams.get('genero');
    document.getElementById('fecha1').value = urlparams.get('fechaAtencion');
    document.getElementById('medico').value = urlparams.get('medicos');
    document.getElementById('dolar').value = urlparams.get('precioDolar');
}
const eliminarHistoria = async (idHistoriasClinicas) => {
    try {
        const deleteUrl = `${url}`;  // Solo la ruta base, ya que el ID irá en el cuerpo de la solicitud

        const response = await fetch(deleteUrl, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({ idHistoriasClinicas })  // Incluye el ID en el cuerpo de la solicitud
        });

        if (!response.ok) {
            throw new Error(`Error al eliminar. Código de respuesta: ${response.status}`);
        }

        const json = await response.json();
       alert(json.msg)
        setTimeout(() => {
            regresarListar();
        }, 1000);

    } catch (error) {
        console.error('Error al eliminar la Historia Clinica:', error.message);
        // Puedes manejar el error de alguna manera, por ejemplo, mostrar un mensaje al usuario.
        alert('Error al eliminar la Acudiente. Por favor, inténtalo de nuevo más tarde.');
    }

};
function confirmarEliminar(idHistoriasClinicas) {
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar este Historia Clinica?');

    if (confirmacion) {
        // Llamar a la función eliminarProveedor con el idHistoriasClinicas del proveedor
        eliminarHistoria(idHistoriasClinicas);
    } else {
        console.log('Eliminación cancelada por el usuario.');
    }
}


if (document.querySelector('#btnRegistrar')) { //Si objeto exitste
    document.querySelector('#btnRegistrar')
        .addEventListener('click', registrarHistoria)
}
if (document.querySelector('#btnActualizar')) {//Si objeto existe
    document.querySelector('#btnActualizar')
        .addEventListener('click', actualizarHistoria )

}