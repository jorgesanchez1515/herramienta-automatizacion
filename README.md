
# API REST

Para hacer uso de la herramienta se deberá ejecutar primero la API REST

La API se encargará de recibir las peticiones de la aplicación y acceder a firebase.

Para ello se debe añadir los datos de firebase al fichero src/firebase/index.js

![firebaseConfig](https://user-images.githubusercontent.com/88329284/130078916-55673b62-c81f-48fe-b268-2b6ab926a8a4.png)

También se debe especificar el origen de las peticiones en el archivo src/index.js

![image](https://user-images.githubusercontent.com/88329284/130079160-cea87640-51a7-478f-bc7f-5330286561ab.png)

Por defecto es localhost:3000 pero podría ser localhost:5000 o cualquier otro host y puerto que se estén utilizando.

Para ejecutar la API se utiliza el comando node src/index.js 

Una vez ejecutado el comando debería aparecer por consola el mensaje "server using port 8080"


# Herramienta

La aplicación está construida en react. Para ejecutarlo se puede usar yarn o npm.

Para la subida de imagenes a firebase se debe especificar la ruta en el storage de firebase que quermos utilizar

ej. 

Si especificamos la siguiente ruta misimagenes/Jorge/Sanchez/  
Las imagenes se guardarán en firebase de la siguiente forma

![image](https://user-images.githubusercontent.com/88329284/130080687-4a4c4474-436a-4671-b60f-5604ad5824da.png)

![image](https://user-images.githubusercontent.com/88329284/130080503-a4c48023-9a2e-4aac-a83c-b7850a77ff4f.png)

Al guardar las imágenes se recibe por pantalla el html correspondiente con las url de las imágenes en firebase.

Para la creación de los formpularios tendremos que introducir la url del google-form y darle al boton de search

Cuando nos aparezca el mensaje de que se ha descargado el formulario podremos darle al botón de convert para 

obtener el formulario como queremos.
