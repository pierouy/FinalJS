document.addEventListener('DOMContentLoaded', function () {
    const carritoContenido = document.getElementById('carrito-contenido');
    const botonVaciarCarrito = document.getElementById('botonVaciarCarrito');

    const carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];

    if (carrito.length === 0) {
        carritoContenido.innerHTML = '<p>No hay productos en el carrito.</p>';
    } else {
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

        // Para mostrar totales con signo de pesos
        if (carrito.length > 0) {
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
        }

        carritoContenido.innerHTML = contenidoHTML;
    }

    // Para eliminar algo del carrito
    carritoContenido.addEventListener('click', function (event) {
        if (event.target.classList.contains('btn-eliminar')) {
            const codigoProductoAEliminar = parseInt(event.target.getAttribute('data-codigo'))
            const nuevoCarrito = carrito.filter(item => item.codigo !== codigoProductoAEliminar)
            sessionStorage.setItem('carrito', JSON.stringify(nuevoCarrito))
            location.reload(); // Recargo página 
        }
    });

    botonVaciarCarrito.addEventListener('click', function () {
        sessionStorage.removeItem('carrito');
        carritoContenido.innerHTML = '<p>Carrito vaciado.</p>';
    });

    function calcularTotal(carrito) {
        return carrito.reduce((total, producto) => total + producto.precio, 0);
    }
    
    function calcularTotalIva(carrito) {
        const total = calcularTotal(carrito)
        return (total * 1.21)
    }
});