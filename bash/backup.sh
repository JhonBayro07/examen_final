#!/bin/bash

FECHA=$(date +"%Y-%m-%d_%H-%M-%S")

ARCHIVO="bash/backup_bd_ventas_$FECHA.sql"

sudo docker exec mariadb_usuarios mariadb-dump \
-u root \
-proot123 \
bd_ventas > "$ARCHIVO"

echo "Respaldo creado correctamente: $ARCHIVO"