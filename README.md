# test-talenta-365
Test Talenta 365

Prerequisitos para despliegue en entorno de desarrollo

##Instalación de docker, docker compose y kubernetes
la instalación se puede realiza descargando el ejecutable desde este link https://www.docker.com/products/docker-desktop

## Instalacion de skaffold 
Skaffold se utiliza en entorno de desarrollo junto con kubernetes, se puede descargar desde este link https://skaffold.dev/docs/install/

## Instalación obligatorio de ingress-nginx
la instalación para mac se realiza con el siguiente comando
*kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.41.0/deploy/static/provider/cloud/deploy.yaml* 
y la documentación se puede encontrar en https://kubernetes.github.io/ingress-nginx/deploy/

### Pasos
- Descargar el repositorio *https://github.com/cristian-guerrero/test-talenta-365*
- instalar ingress-nginx con el siguiente comando: kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.41.0/deploy/static/provider/cloud/deploy.yaml 
- Ejecutar el comando *skaffold dev*
- En los modelos de cada proyecto descomentar la linea de sync en la parte baja del index de la carpeta de modelos para que se creen las tablas y volverlo a comentar para que no se borren los datos con cada cambio
- agregar el dominio biblioteca.dev al archivo host que se encuentra en /etc/host 
- verificar el funcinamiento con Postman
- se debe crear al menos un usuario y un libro para poder realizar reservas

Las url de los servicios son las siguientes:
- Usuarios : biblioteca.dev/api/usuarios
- Libros: biblioteca.dev/api/libros
- Prestamos biblioteca.dev/api/prestamos

Las imágenes de cada uno de los servicios se encuentra en docker hub por lo tanto no es necesario crear en local cada una de las imagenes
de así serlo se debe ingresar a cada una de las carpetas de los servicios y ejecutar el comando: 
*docker build -t guerrerocristian/event-bus .*  donde *event-bus* seria el nombre de la carpeta y no olvidar el punto al final.

Adicionalmente se creó un event bus en NodeJs que no es accesible desde fuera del cluster.

Es recomendable instalar las dependencias en local para no visualizar errores en el IDE.