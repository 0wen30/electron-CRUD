window.productosApp.recibir("recibir",({nombre,descripcion,precio})=>{
    const productos = document.querySelector("#productos");
    productos.innerHTML += `
    <div class="card" style="width: 18rem;">
        <div class="card-body">
            <center>
                <h3 class="card-title">${nombre}</h3>
            </center>
            <hr/>
            <p class="card-text">${descripcion}</p>
            <hr/>
            <p class="card-text">${precio}</p>
            <a href="#" class="btn btn-danger">Eliminar</a>
        </div>
    </div>
    `;
    productos.querySelectorAll(".btn-danger").forEach(botonRojo=>{
        botonRojo.addEventListener("click",(e)=>{
            e.target.parentElement.parentElement.remove()
        });
    })
});