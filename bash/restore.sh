#!/bin/bash

ARCHIVO=$1

if [ -z "$ARCHIVO" ]; then
    echo "Debes indicar el archivo de respaldo."
    echo "Ejemplo: ./bash/restore.sh bash/backup_bd_ventas_fecha.sql"
    exit
fi

sudo docker exec -i mariadb_usuarios mariadb \
-u root \
-proot123 \
bd_ventas < "$ARCHIVO"

echo "Base de datos restaurada correctamente."