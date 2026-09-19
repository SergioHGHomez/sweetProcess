
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
    "Foto": ""
  },
  {
    "ProductoID": 2,
    "Nombre": "Flan de Caramelo",
    "Categoria": "Pasteles",
    "Precio": 18000,
    "Activo": true,
    "Foto": ""
  },
  {
    "ProductoID": 3,
    "Nombre": "Alfajores",
    "Categoria": "Galletas",
    "Precio": 12000,
    "Activo": true,
    "Foto": ""
  },
  {
    "ProductoID": 4,
    "Nombre": "Polvorones",
    "Categoria": "Galletas",
    "Precio": 10000,
    "Activo": true,
    "Foto": ""
  },
  {
    "ProductoID": 5,
    "Nombre": "Café de Olla",
    "Categoria": "Bebidas",
    "Precio": 6000,
    "Activo": true,
    "Foto": ""
  },
  {
    "ProductoID": 6,
    "Nombre": "Champurrado",
    "Categoria": "Bebidas",
    "Precio": 7000,
    "Activo": true,
    "Foto": ""
  },
  {
    "ProductoID": 7,
    "Nombre": "Pastel Tres Chocolates",
    "Categoria": "Pasteles",
    "Precio": 32000,
    "Activo": false,
    "Foto": ""
  },
  {
    "ProductoID": 8,
    "Nombre": "Cuernitos Dulces",
    "Categoria": "Galletas",
    "Precio": 9000,
    "Activo": true,
    "Foto": ""
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
                <td><div class="product-thumb">Drop an image</div></td>
                <td class="product-name">${productos[i].Nombre}</td>
                <td>${productos[i].Categoria}</td>
                <td>${productos[i].Precio}</td>
                <td><span class="product_status product_status--${productos[i].Activo ? "active" : "inactive"}">${productos[i].Activo ? "Activo" : "Inactivo"}</span></td>
                <td>
                    <div class="actions-cell">
                        <button class="link-action link-action--edit">Editar</button>
                        <button class="link-action link-action--danger">Desactivar</button>
                    </div>
                </td>
            </tr>
            `;
        }

        document.getElementById("admin-product__content").innerHTML = productosHTML;
    }

