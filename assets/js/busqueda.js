import funciones from "./utils/funciones.js";
const { peticiones } = funciones

$(document).ready(function () {
    $("#formulario").submit( async function(event) {
        event.preventDefault();
        $("#alert-error").addClass('d-none')
        $("#listado-superheroes").html("")
        let busqueda = $("#txt-busqueda").val()
        let url = `https://superheroapi.com/api.php/10225832066284806/search/${busqueda}`

        //Opción 1 para esperar que termine de ejecutar la petición (sin el async)
        /*let respuesta = peticiones(url)
        respuesta.then((data) => console.log(data)) */

        //Opción 2 para esperar que termine de ejecutar la petición (arriba se agrega el async)
        let respuesta = await peticiones(url)

        if (respuesta.response === 'error') {
            return $("#alert-error").removeClass('d-none')
        }

        respuesta.results.forEach(element => {
            let raza = element.appearance.race === 'null' ? 'No Definido' : element.appearance.race
            //let [,peso] = element.appearance.height //acceder al indice con destructuring

            $("#listado-superheroes").append(`
            <div class="col-12 col-sm-6 col-lg-4">
            <div class="card">
                <img src="${element.image.url}" class="card-img-top" alt="${element.name}">
                <div class="card-body">
                        <h5 class="card-title">${element.name}</h5>
                        <div><span class="fw-bold">Género: </span> ${element.appearance.gender}</div>
                        <div><span class="fw-bold">Raza: </span> ${raza}</div>
                        <div><span class="fw-bold">Altura: </span> ${element.appearance.height[1]}</div>
                        <div><span class="fw-bold">Peso: </span> ${element.appearance.weight[1]}</div>
                    </div>
                </div>
            </div>
            `)
        });
        console.log(respuesta);
    })
})