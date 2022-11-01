document.querySelector("form").addEventListener("submit", (e) => {

    e.preventDefault();
    const nombre = document.querySelector("#nombre").value;
    const descripcion = document.querySelector("#descripcion").value;
    const precio = document.querySelector("#precio").value;

    window.productosApp.enviar("enviar",{nombre,descripcion,precio});

});





