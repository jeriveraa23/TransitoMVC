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

