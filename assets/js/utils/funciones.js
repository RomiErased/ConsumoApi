const peticiones = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((respuesta) => respuesta.json())
            .then((data) => resolve(data))
    }) 
}

export default { peticiones }