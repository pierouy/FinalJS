class Producto{
    constructor(codigo, nombre, precio, imagen){
        this.codigo = codigo
        this.nombre = nombre
        this.precio = precio
        this.imagen = imagen
    }
}

let productos = [];

const cards = document.querySelector('#cards');

fetch('assets/data/data.json')  // Ruta ajustada
    .then(response => response.json())
    .then(data => {
        productos = data
        // Aquí tienes los productos cargados desde el JSON
        for (let i = 0; i < productos.length; i++) {
            const div = document.createElement('div');
            div.classList = "col-md-6 col-lg-4 mb-4";
            div.innerHTML = `
                <div id="card${i}" class="card">
                    <img src="${productos[i].imagen}" class="card-img-top" alt="Producto ${productos[i].codigo}">
                    <div class="card-body">
                        <h3 class="card-title">${productos[i].nombre}</h3>
                        <p class="card-text">$${productos[i].precio}</p>
                        <button class="btn btn-primary btn-agregar-carrito" onclick="agregarAlCarrito(${i})">Agregar al Carrito</button>
                    </div>
                </div>
            `;
            cards.appendChild(div);
        }
    })
    .catch(error => {
        console.error('Error al cargar los productos:', error);
    });

function agregarAlCarrito(indice) {
    console.log(indice)
    let carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];

    // Obtengo el producto usando el índice
    const producto = productos[indice];
    console.log(producto)
    console.log(producto.codigo)

    //Veo si ya está en el carrito
    const productoEnCarrito = carrito.find(item => item.codigo === producto.codigo);

    if (!productoEnCarrito) {
        // Si no está, lo agrego
        carrito.push(new Producto(producto.codigo, producto.nombre, producto.precio, producto.imagen));
        sessionStorage.setItem('carrito', JSON.stringify(carrito));

        // Mostrar notificación con Toastify
        Toastify({
            text: `Se agregó ${producto.nombre} al carrito`,
            duration: 3000, // Duración en milisegundos
            gravity: "top", // Posición de la notificación
            positionLeft: false, // Alinear a la derecha
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)", // Colores de fondo
            className: "toastify-style", // Clase CSS personalizada
        }).showToast();
    } else {
        // Si ya está, aviso y no agrego
        Toastify({
            text: 'El producto ya está en el carrito',
            duration: 3000,
            gravity: "top", // Mostrar en la parte superior
            positionLeft: false, // Alinear a la derecha
            backgroundColor: "linear-gradient(to right, #f85032, #e73827)", // Colores de fondo
            className: "toastify-style", // Clase CSS personalizada
        }).showToast();
    }
}

