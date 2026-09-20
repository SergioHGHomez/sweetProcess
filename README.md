# sweetProcess

## Usuarios precargados (empleados)

Se crean automáticamente en `localStorage` (clave `usuarios`) la primera vez que se abre el login o el panel de administración. Todos usan la contraseña por defecto **`nolimits123`**.

| Nombre | Correo | Contraseña | Rol | Estado | Acceso tras iniciar sesión |
|---|---|---|---|---|---|
| Jorge Peña | jorge.pena@nolimits.co | `nolimits123` | Cocinero | Activo | `Cocina/home.html` |
| Luis Herrera | luis.herrera@nolimits.co | `nolimits123` | Repartidor | Activo | `Logistica/home.html` |
| Diana Ortiz | diana.ortiz@nolimits.co | `nolimits123` | Repartidor | Activo | `Logistica/home.html` |
| Sofía Ramírez | sofia.ramirez@nolimits.co | `nolimits123` | Administrador | Activo | `Administracion/home.html` |
| Pablo Reyes | pablo.reyes@nolimits.co | `nolimits123` | Cocinero | Inactivo | No puede iniciar sesión |

Los clientes no vienen precargados: se registran desde la pestaña **Cliente** del login y se guardan en `localStorage` (clave `clientes`).
