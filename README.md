# Sistema de Gestión de Usuarios

Proyecto desarrollado con Docker Compose, MariaDB, PHP, Apache, React, Node.js y Bash.

## Servicios

- MariaDB: puerto 3307
- Backend PHP: puerto 8080
- Frontend React: puerto 5173

## Ejecución

Para construir y levantar el proyecto:

sudo docker compose up -d --build

## Acceso

Frontend:

http://192.168.1.61:5173

Backend:

http://192.168.1.61:8080

## API REST

- GET /api/roles
- GET /api/usuarios
- POST /api/usuarios
- PUT /api/usuarios/{id}
- DELETE /api/usuarios/{id}

## Bash

Generar respaldo:

./bash/backup.sh

Restaurar respaldo:

./bash/restore.sh bash/nombre_del_respaldo.sql