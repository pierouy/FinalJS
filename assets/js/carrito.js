let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const carritoContenido = document.getElementById('carrito-contenido');
const botonVaciarCarrito = document.getElementById('botonVaciarCarrito');
const finalizarCompra = document.querySelector("#finalizarcompra");

function calcularTotal(carrito) {
    return carrito.reduce((total, producto) => total + producto.precio, 0);
}

function calcularTotalIva(carrito) {
    const total = calcularTotal(carrito)
    return (total * 1.21)
}

function mostrarCarrito() {
    let contenidoHTML = '<div class="row">';
    for (const producto of carrito) {
        contenidoHTML += `
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <img src="${producto.imagen}" class="card-img-top" alt="Producto ${producto.codigo}">
                        <div class="card-body">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text">$${producto.precio}</p>
                            <button class="btn btn-danger btn-eliminar" data-codigo="${producto.codigo}">Eliminar</button>
                        </div>
                    </div>
                </div>
            `;
    }
    contenidoHTML += '</div>';

    const totalCarrito = calcularTotal(carrito);
    const totalConIvaString = '$' + calcularTotalIva(carrito);
    const totalString = '$' + totalCarrito;

    contenidoHTML += `
                <div class="row mt-4">
                    <div class="col-md-6">
                        <p class="fw-bold">Total de la compra:</p>
                        <input id="inputTotal" type="text" class="form-control" value="${totalString}" disabled>
                    </div>
                    <div class="col-md-6">
                        <p class="fw-bold">Total con IVA:</p>
                        <input id="inputTotalIva" type="text" class="form-control" value="${totalConIvaString}" disabled>
                    </div>
                </div>
            `;
    carritoContenido.innerHTML = contenidoHTML;

    finalizarCompra.disabled = false;
    finalizarCompra.addEventListener("click", () => {
        
        localStorage.removeItem('carrito');

        Swal.fire({
            title: 'Gracias por tu compra!',
            text: 'Te enviaremos los detalles por correo electrónico.',
            icon: 'success'
        });

        carritoContenido.innerHTML = '<p>No hay productos en el carrito.</p>';
        botonVaciarCarrito.disabled = true;
        botonVaciarCarrito.classList.add("hidden");
        finalizarCompra.disabled = true;
        finalizarCompra.classList.add("hidden");
    })
}

botonVaciarCarrito.addEventListener('click', function () {
    localStorage.removeItem('carrito');
    carritoContenido.innerHTML = '<p>Carrito vaciado.</p>';
    botonVaciarCarrito.disabled = true;
    botonVaciarCarrito.classList.add("hidden");
    finalizarCompra.disabled = true;
    finalizarCompra.classList.add("hidden");
});

carritoContenido.addEventListener('click', function (event) {
    if (event.target.classList.contains('btn-eliminar')) {
        const codigoProductoAEliminar = parseInt(event.target.getAttribute('data-codigo'))
        carrito = carrito.filter(item => item.codigo !== codigoProductoAEliminar)
        localStorage.setItem('carrito', JSON.stringify(carrito))
        if (carrito.length) mostrarCarrito()
        else {
            carritoContenido.innerHTML = '<p>No hay productos en el carrito.</p>';
            botonVaciarCarrito.disabled = true;
            botonVaciarCarrito.classList.add("hidden");
            finalizarCompra.disabled = true;
            finalizarCompra.classList.add("hidden");
        }
    }
});

document.addEventListener('DOMContentLoaded', function () {
    if (carrito.length === 0) {
        carritoContenido.innerHTML = '<p>No hay productos en el carrito.</p>';
        botonVaciarCarrito.disabled = true;
        botonVaciarCarrito.classList.add("hidden");
    } else {
        mostrarCarrito();
        finalizarCompra.classList.remove("hidden");
    }

     // Verificar y aplicar la clase "hidden" según el estado del botón
     if (finalizarCompra.disabled) {
        finalizarCompra.classList.add("hidden");
    } else {
        finalizarCompra.classList.remove("hidden");
    }
});