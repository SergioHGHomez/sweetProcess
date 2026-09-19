
    class Producto{
        constructor({producto, nombre, categoria, precio, activo, foto
    }){

        this.producto = producto;
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;
        this.activo = activo;
        this.foto = foto;
        }
    }

    function guardarProducto(Producto){
       debugger;
        if(typeof Producto !== "object") return;

        let productos = traerProductos();

        productos.push(Producto);

        localStorage.setItem("productos", JSON.stringify(productos));
    }

    function agregarProducto(datosProducto){
        let productos = traerProductos();
        let nuevoId = productos.reduce((maxId, producto) => Math.max(maxId, producto.ProductoID), 0) + 1;

        productos.push({ ProductoID: nuevoId, Foto: "", ...datosProducto });
        localStorage.setItem("productos", JSON.stringify(productos));
        return nuevoId;
    }

    function obtenerProductoPorId(id){
        let productos = traerProductos();
        return productos.find(producto => producto.ProductoID == id);
    }

    function actualizarProducto(id, datosActualizados){
        let productos = traerProductos();
        let index = productos.findIndex(producto => producto.ProductoID == id);

        if(index === -1) return false;

        productos[index] = { ...productos[index], ...datosActualizados };
        localStorage.setItem("productos", JSON.stringify(productos));
        return true;
    }

    function traerProductos(){
        let productos = JSON.parse(localStorage.getItem("productos"));
        debugger;
        if(productos){
            return productos;
        }

        return [];
    }

    function cargaInicial(){
        let productos = traerProductos();
        if (productos.length === 0){
            var PrecargaProductos = [
  {
    "ProductoID": 1,
    "Nombre": "Tres Leches",
    "Categoria": "Pasteles",
    "Precio": 24000,
    "Activo": true,
    "Foto": "src/productos/cheesecake-frutos-rojos.jpeg"
  },
  {
    "ProductoID": 2,
    "Nombre": "Flan de Caramelo",
    "Categoria": "Pasteles",
    "Precio": 18000,
    "Activo": true,
    "Foto": "src/productos/postre-limon.jpeg"
  },
  {
    "ProductoID": 3,
    "Nombre": "Alfajores",
    "Categoria": "Galletas",
    "Precio": 12000,
    "Activo": true,
    "Foto": "src/productos/alfajores.jpg"
  },
  {
    "ProductoID": 4,
    "Nombre": "Polvorones",
    "Categoria": "Galletas",
    "Precio": 10000,
    "Activo": true,
    "Foto": "src/productos/Polvorones.jpg"
  },
  {
    "ProductoID": 5,
    "Nombre": "Café de Olla",
    "Categoria": "Bebidas",
    "Precio": 6000,
    "Activo": true,
    "Foto": "src/productos/cafe-de-la-olla.jpg"
  },
  {
    "ProductoID": 6,
    "Nombre": "Champurrado",
    "Categoria": "Bebidas",
    "Precio": 7000,
    "Activo": true,
    "Foto": "src/productos/Champurrado.jpg"
  },
  {
    "ProductoID": 7,
    "Nombre": "Pastel Tres Chocolates",
    "Categoria": "Pasteles",
    "Precio": 32000,
    "Activo": false,
    "Foto": "src/productos/cheesecake-maracumango-1.jpeg"
  },
  {
    "ProductoID": 8,
    "Nombre": "Cuernitos Dulces",
    "Categoria": "Galletas",
    "Precio": 9000,
    "Activo": true,
    "Foto": "src/productos/cheesecake-maracumango-2.jpeg"
  }
];

            localStorage.setItem("productos", JSON.stringify(PrecargaProductos));
        }
    }


    function renderProductos(){
        let productos = traerProductos();
        let productosHTML = "";
        for (let i = 0; i < productos.length; i++) {
            productosHTML += `
            <tr>
                <td>${productos[i].Foto ? `<img class="product-thumb" src="../${productos[i].Foto}" alt="${productos[i].Nombre}">` : `<div class="product-thumb">Drop an image</div>`}</td>
                <td class="product-name">${productos[i].Nombre}</td>
                <td>${productos[i].Categoria}</td>
                <td>${productos[i].Precio}</td>
                <td><span class="product_status product_status--${productos[i].Activo ? "active" : "inactive"}">${productos[i].Activo ? "Activo" : "Inactivo"}</span></td>
                <td>
                    <div class="actions-cell">
                        <button class="link-action link-action--edit" data-id="${productos[i].ProductoID}">Editar</button>
                        <button class="link-action link-action--danger" data-id="${productos[i].ProductoID}">${productos[i].Activo ? "Desactivar" : "Activar"}</button>
                    </div>
                </td>
            </tr>
            `;
        }

        document.getElementById("admin-product__content").innerHTML = productosHTML;
    }


    const CONTRASENA_POR_DEFECTO = "nolimits123";

    function traerUsuarios(){
        let usuarios = JSON.parse(localStorage.getItem("usuarios"));
        if(usuarios){
            return usuarios;
        }

        return [];
    }

    function agregarUsuario(datosUsuario){
        let usuarios = traerUsuarios();
        let nuevoId = usuarios.reduce((maxId, usuario) => Math.max(maxId, usuario.UsuarioID), 0) + 1;

        usuarios.push({ UsuarioID: nuevoId, ...datosUsuario });
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        return nuevoId;
    }

    function obtenerUsuarioPorId(id){
        let usuarios = traerUsuarios();
        return usuarios.find(usuario => usuario.UsuarioID == id);
    }

    function actualizarUsuario(id, datosActualizados){
        let usuarios = traerUsuarios();
        let index = usuarios.findIndex(usuario => usuario.UsuarioID == id);

        if(index === -1) return false;

        usuarios[index] = { ...usuarios[index], ...datosActualizados };
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        return true;
    }

    function cargaInicialUsuarios(){
        let usuarios = traerUsuarios();
        if (usuarios.length === 0){
            var PrecargaUsuarios = [
  { "UsuarioID": 1, "Nombre": "Jorge Peña", "Correo": "jorge.pena@nolimits.co", "Rol": "Cocinero", "Activo": true },
  { "UsuarioID": 2, "Nombre": "Luis Herrera", "Correo": "luis.herrera@nolimits.co", "Rol": "Repartidor", "Activo": true },
  { "UsuarioID": 3, "Nombre": "Diana Ortiz", "Correo": "diana.ortiz@nolimits.co", "Rol": "Repartidor", "Activo": true },
  { "UsuarioID": 4, "Nombre": "Sofía Ramírez", "Correo": "sofia.ramirez@nolimits.co", "Rol": "Administrador", "Activo": true },
  { "UsuarioID": 5, "Nombre": "Pablo Reyes", "Correo": "pablo.reyes@nolimits.co", "Rol": "Cocinero", "Activo": false }
];

            PrecargaUsuarios = PrecargaUsuarios.map(usuario => ({ ...usuario, Contrasena: CONTRASENA_POR_DEFECTO }));

            localStorage.setItem("usuarios", JSON.stringify(PrecargaUsuarios));
            return;
        }

        // usuarios guardados antes de existir el campo Contrasena
        if (usuarios.some(usuario => !usuario.Contrasena)){
            usuarios = usuarios.map(usuario => ({ ...usuario, Contrasena: usuario.Contrasena || CONTRASENA_POR_DEFECTO }));
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
        }
    }

    function validarEmpleado(correo, contrasena){
        let usuario = traerUsuarios().find(u => u.Correo.toLowerCase() === String(correo).trim().toLowerCase());

        if(!usuario) return { ok: false, motivo: "no-existe" };
        if(!usuario.Activo) return { ok: false, motivo: "inactivo" };
        if(contrasena !== (usuario.Contrasena || CONTRASENA_POR_DEFECTO)) return { ok: false, motivo: "contrasena" };

        return { ok: true, usuario: usuario };
    }

    function rutaPorRol(rol){
        const rutas = {
            "Administrador": "../Administracion/home.html",
            "Cocinero": "../Cocina/home.html",
            "Repartidor": "../Logistica/home.html"
        };

        return rutas[rol] || "index.html";
    }

    function renderUsuarios(){
        let usuarios = traerUsuarios();
        let usuariosHTML = "";
        for (let i = 0; i < usuarios.length; i++) {
            usuariosHTML += `
            <tr>
                <td class="user-name">${usuarios[i].Nombre}</td>
                <td>${usuarios[i].Correo}</td>
                <td>${usuarios[i].Rol}</td>
                <td><span class="product_status user_status--${usuarios[i].Activo ? "active" : "inactive"}">${usuarios[i].Activo ? "Activo" : "Inactivo"}</span></td>
                <td>
                    <div class="actions-cell">
                        <button class="link-action link-action--edit" data-id="${usuarios[i].UsuarioID}">Editar</button>
                        <button class="link-action link-action--reset" data-id="${usuarios[i].UsuarioID}">Restablecer contraseña</button>
                        <button class="link-action link-action--danger" data-id="${usuarios[i].UsuarioID}">${usuarios[i].Activo ? "Desactivar" : "Activar"}</button>
                    </div>
                </td>
            </tr>
            `;
        }

        document.getElementById("admin-user__content").innerHTML = usuariosHTML;
    }



    function traerClientes(){
        let clientes = JSON.parse(localStorage.getItem("clientes"));
        if(clientes){
            return clientes;
        }

        return [];
    }

    function registrarCliente(datosCliente){
        let clientes = traerClientes();
        let correo = String(datosCliente.Correo).trim().toLowerCase();

        if(clientes.some(cliente => cliente.Correo.toLowerCase() === correo)){
            return { ok: false, motivo: "existe" };
        }

        let nuevoId = clientes.reduce((maxId, cliente) => Math.max(maxId, cliente.ClienteID), 0) + 1;
        let cliente = { ClienteID: nuevoId, Nombre: datosCliente.Nombre, Correo: correo, Contrasena: datosCliente.Contrasena };

        clientes.push(cliente);
        localStorage.setItem("clientes", JSON.stringify(clientes));
        return { ok: true, cliente: cliente };
    }

    function validarCliente(correo, contrasena){
        let cliente = traerClientes().find(c => c.Correo.toLowerCase() === String(correo).trim().toLowerCase());

        if(!cliente) return { ok: false, motivo: "no-existe" };
        if(cliente.Contrasena !== contrasena) return { ok: false, motivo: "contrasena" };

        return { ok: true, cliente: cliente };
    }
