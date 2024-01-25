document.addEventListener('DOMContentLoaded', () => {
    
    const listaProductos = [
        { nombre: 'Laptop', marca: 'Asus', precio: 1000, imagen: 'img/laptop.webp' },
        { nombre: 'Desktop', marca: 'MaNitro5', precio: 800, imagen: 'img/ah_t200_1nw.webp' },
        { nombre: 'Monitor', marca: 'Lgd', precio: 200, imagen: 'img/Asus.webp' },
        { nombre: 'Teclado', marca: 'Hyperx', precio: 50, imagen: 'img/teclado.webp' },
        { nombre: 'SSD', marca: 'king', precio: 120, imagen: 'img/hdd.webp' },
        { nombre: 'Memoria RAM', marca: 'Ram Ddr4 8gb Fury Hyperx ', precio: 80, imagen: 'img/black452.webp' },
        { nombre: 'Pad', marca: 'Lenovo', precio: 15, imagen: 'img/Ergonomic_mouse_pad.webp' },
        { nombre: 'Fuente', marca: 'Vx650', precio: 90, imagen: 'img/gf1650w.webp' },
        { nombre: 'Placa de Video', marca: 'GeForce RTX 3060', precio: 350, imagen: 'img/6700Xteagle3.webp' }
    ];

    let carritoDeCompras = [];
    const simboloMoneda = '$';
    const contenedorProductos = document.querySelector('#items');
    const contenedorCarrito = document.querySelector('#carrito');
    const contenedorTotal = document.querySelector('#total');
    const botonVaciar = document.querySelector('#boton-vaciar');
    const almacenamientoLocal = window.localStorage;

    function mostrarProductos() {
        listaProductos.forEach((producto) => {
            const nodoProducto = document.createElement('div');
            nodoProducto.classList.add('card', 'col-sm-4');

            const nodoCuerpo = document.createElement('div');
            nodoCuerpo.classList.add('card-body');
            
            const nodoTitulo = document.createElement('h5');
            nodoTitulo.classList.add('card-title');
            nodoTitulo.textContent = producto.nombre;
            
            const nodoImagen = document.createElement('img');
            nodoImagen.classList.add('img-fluid');
            nodoImagen.setAttribute('src', producto.imagen);
            
            const nodoPrecio = document.createElement('p');
            nodoPrecio.classList.add('card-text');
            nodoPrecio.textContent = `${simboloMoneda}${producto.precio}`;
            
            const nodoBoton = document.createElement('button');
            nodoBoton.classList.add('btn', 'btn-primary');
            nodoBoton.textContent = '+';
            nodoBoton.setAttribute('marcador', producto.nombre);
            nodoBoton.addEventListener('click', agregarAlCarrito);

            nodoCuerpo.appendChild(nodoImagen);
            nodoCuerpo.appendChild(nodoTitulo);
            nodoCuerpo.appendChild(nodoPrecio);
            nodoCuerpo.appendChild(nodoBoton);
            nodoProducto.appendChild(nodoCuerpo);
            contenedorProductos.appendChild(nodoProducto);
        });
    }

    function agregarAlCarrito(evento) {
        carritoDeCompras.push(evento.target.getAttribute('marcador'))
        mostrarCarrito();
        guardarEnAlmacenamiento();
    }

    function mostrarCarrito() {
        contenedorCarrito.textContent = '';
        const carritoSinDuplicados = [...new Set(carritoDeCompras)];
        carritoSinDuplicados.forEach((item) => {
            const miItem = listaProductos.find((producto) => producto.nombre === item);
            const cantidadItem = carritoDeCompras.reduce((total, itemId) => {
                return itemId === item ? total += 1 : total;
            }, 0);
            const nodoItem = document.createElement('li');
            nodoItem.classList.add('list-group-item', 'text-right', 'mx-2');
            nodoItem.textContent = `${cantidadItem} x ${miItem.nombre} = ${simboloMoneda}${miItem.precio}`;
            
            const nodoBoton = document.createElement('button');
            nodoBoton.classList.add('btn', 'btn-danger', 'mx-5');
            nodoBoton.textContent = 'X';
            nodoBoton.style.marginLeft = '1rem';
            nodoBoton.dataset.item = item;
            nodoBoton.addEventListener('click', eliminarDelCarrito);
            nodoItem.appendChild(nodoBoton);
            contenedorCarrito.appendChild(nodoItem);
        });

        contenedorTotal.textContent = calcularTotal();
    }

    function eliminarDelCarrito(evento) {
        const nombreItem = evento.target.dataset.item;
        carritoDeCompras = carritoDeCompras.filter((item) => item !== nombreItem);
        mostrarCarrito();
        guardarEnAlmacenamiento();
    }

    function calcularTotal() {
        return carritoDeCompras.reduce((total, item) => {
            const miItem = listaProductos.find((producto) => producto.nombre === item);
            return total + miItem.precio;
        }, 0).toFixed(2);
    }

    function vaciarCarrito() {
        carritoDeCompras = [];
        mostrarCarrito();
        localStorage.clear();
    }

    function guardarEnAlmacenamiento(){
        almacenamientoLocal.setItem('carrito', JSON.stringify(carritoDeCompras));
    }

    function cargarDesdeAlmacenamiento() {
        if (almacenamientoLocal.getItem('carrito') != null) {
            carritoDeCompras = JSON.parse(almacenamientoLocal.getItem('carrito'));
        }
    }

    botonVaciar.addEventListener('click', vaciarCarrito);

    cargarDesdeAlmacenamiento();
    mostrarProductos();
    mostrarCarrito();
});
