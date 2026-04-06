# Sistema de Gestión de Tránsito – Sabaneta

Este proyecto corresponde al desarrollo de una aplicación web orientada a la gestión de información relacionada con vehículos e infracciones de tránsito en el municipio de Sabaneta.

La solución fue construida utilizando una arquitectura por capas basada en el modelo MVC (Modelo–Vista–Controlador), lo que permite separar la lógica de negocio, la interfaz de usuario y el acceso a los datos. De esta manera se logra una mejor organización del sistema y se facilita su mantenimiento.

El sistema permite registrar y administrar información sobre propietarios, vehículos, agentes de tránsito, cámaras de detección e infracciones, así como consultar información relacionada con estas entidades.

## Descripción General del Sistema

Dentro del sistema se gestiona la matrícula de vehículos, donde se registra información como la placa del vehículo, la marca, la fecha de matrícula y el propietario correspondiente.

El propietario puede ser una persona o una empresa, ambos con información básica como identificación, nombre y dirección. Un propietario puede tener varios vehículos registrados, mientras que cada vehículo pertenece únicamente a un propietario.

Los vehículos pueden clasificarse en diferentes tipos, como automóvil, motocicleta o vehículo pesado.

Cuando un vehículo comete una infracción, esta queda registrada en el sistema junto con la fecha en la que ocurrió y el medio por el cual fue detectada, ya sea por un agente de tránsito o por una cámara de detección.

## Arquitectura del Proyecto

El sistema fue desarrollado siguiendo una arquitectura por capas basada en el modelo MVC:

- **Modelo:** encargado de la gestión de los datos y la comunicación con la base de datos.
- **Vista:** interfaz web desde donde el usuario interactúa con el sistema.
- **Controlador:** capa que gestiona la lógica de negocio y la comunicación entre la vista y el modelo.

Esta organización permite que cada parte del sistema tenga responsabilidades claras y facilita la escalabilidad del proyecto.

## Funcionalidades del Sistema

La aplicación permite administrar la información principal del sistema de tránsito mediante diferentes módulos. Entre las funcionalidades implementadas se encuentran:

- gestión de propietarios
- gestión de vehículos
- registro de agentes de tránsito
- registro de cámaras de detección
- registro de infracciones
- consulta de información relacionada con propietarios e infracciones

Cada uno de estos módulos permite realizar operaciones de registro, consulta, actualización y eliminación de información.

## Tecnologías Utilizadas

Para el desarrollo de la aplicación se utilizaron las siguientes tecnologías:

**Backend**
- Node.js
- Express

**Frontend**
- React
- Vite

**Base de Datos**
- PostgreSQL

**Contenedores**
- Docker
- Docker Compose

Estas herramientas permiten construir una aplicación web moderna y facilitar su ejecución en distintos entornos.

## Persistencia de la Información

Para el almacenamiento de los datos se utilizó una base de datos relacional PostgreSQL, lo que permite mantener la integridad de la información y establecer relaciones entre las entidades principales del sistema.

## Requisitos

Antes de ejecutar el proyecto es necesario tener instalado:

- Docker Desktop

Docker permite ejecutar automáticamente todos los servicios necesarios para el sistema, incluyendo la base de datos, el servidor backend y la aplicación frontend.

## Ejecución del Proyecto

1. Clonar el repositorio

git clone https://github.com/jeriveraa23/TransitoMVC.git

2. Ingresar al directorio del proyecto

cd TransitoMVC

3. Ejecutar el sistema

docker-compose up --build

Este comando iniciará automáticamente la base de datos, el backend y el frontend del sistema.

## Acceso al Sistema

Una vez iniciado el proyecto, la aplicación estará disponible en:

http://localhost:5173

Desde esta dirección se puede acceder a la interfaz web y utilizar las diferentes funcionalidades del sistema.

## Diagrama de Clases
![diagrama de clases](https://github.com/user-attachments/assets/d297cb9e-d7b8-48a2-b9b9-aa9067caeeef)

## Módulo Nuevo: Imágenes de Vehículos

Se agregó una funcionalidad para asociar una imagen a cada vehículo, con tres acciones principales:

- subir imagen al crear o editar un vehículo
- mostrar la imagen desde el listado de vehículos
- eliminar la imagen para reemplazarla por otra

### Cómo funciona

El flujo se implementó de extremo a extremo entre frontend, GraphQL, servicio de negocio, repositorio y base de datos:

1. En el formulario de vehículos se selecciona una imagen y se convierte a formato Data URL Base64.
2. El frontend envía la imagen como campo `imagen` en una mutación GraphQL.
3. El backend valida formato (`image/*`) y tamaño máximo (2 MB).
4. El repositorio transforma Base64 a `BYTEA` y guarda también el `mime type`.
5. Al consultar vehículos, el backend reconstruye la imagen como Data URL para poder renderizarla en la interfaz.
6. Para eliminar imagen, se ejecuta una mutación que deja los campos de imagen en `NULL`.

### Archivos modificados para habilitar el módulo

#### Backend

- `backend/src/database/schema.sql`
	- Se agregaron las columnas `imagen BYTEA` y `imagen_mime_type VARCHAR(50)` en la tabla `vehiculos`.
- `backend/src/graphql/typeDefs.js`
	- Se extendió `type Vehiculo` con `imagen` y `tiene_imagen`.
	- Se agregaron `vehiculoPorId`, `actualizarImagenVehiculo` y `eliminarImagenVehiculo`.
- `backend/src/graphql/resolvers.js`
	- Se conectaron las nuevas operaciones de imagen al servicio de vehículos.
- `backend/src/services/vehiculo.service.js`
	- Se añadieron validaciones de formato y tamaño de imagen.
	- Se implementaron operaciones de actualizar y eliminar imagen.
- `backend/src/repositories/vehiculo.repository.js`
	- Se implementó parseo Data URL Base64 -> `Buffer` para persistencia.
	- Se implementó mapeo `BYTEA` -> Data URL para respuesta al frontend.
- `backend/server.js`
	- Se ajustó el límite del body parser de GraphQL para soportar carga de imágenes (evitar error 413).

#### Frontend

- `frontend/src/services/vehiculoService.js`
	- Se actualizaron queries/mutations para enviar, consultar y eliminar imagen.
	- Se agregó consulta por ID para mostrar imagen en modal.
- `frontend/src/components/vehiculos/formVehiculo.jsx`
	- Se agregó input de archivo, previsualización y validaciones de tamaño/tipo.
	- Se mejoró manejo de errores al enviar imagen.
- `frontend/src/components/vehiculos/tablaVehiculos.jsx`
	- Se agregó botón “Mostrar imagen”, modal de visualización y botón “Eliminar imagen”.
- `frontend/src/pages/VehiculosPage.jsx`
	- Se conectaron notificaciones y recarga de datos después de acciones de imagen.

### Consideraciones técnicas

- Solo se mantiene una imagen por vehículo.
- Subir una nueva imagen reemplaza la anterior.
- Si se elimina la imagen, el vehículo queda sin imagen y puede cargarse otra.
- El límite de imagen es 2 MB por validación de negocio.

### Prueba rápida del módulo

1. Crear un propietario.
2. Crear un vehículo con imagen (menor a 2 MB).
3. En el listado, pulsar “Mostrar imagen”.
4. En el modal, pulsar “Eliminar imagen”.
5. Editar el vehículo y subir una nueva imagen.

