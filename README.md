# Breaking traceability

Este repositorio dispone del código del trabajo de final de grado de Oriol Punyed Vilabella, del área de sistemas distribuidos.

Oasis Wall, es un proyecto que trata de demostrar como a pesar de la gran trazabilidad y transparencia que ofrece la blockchain, se puede llegar a romper la trazabilidad de una transacción, perdiendo a su la posibilidad de seguir su rastro.

# Requerimientos

- Se requiere tener NodeJS instalado.

IMPORTANTE: Este proyecto se ha realizado sobre la versión v18.12.0 de NodeJS y se ha probado en MacOS y en Windows, por lo que se recomienda tener instalada esta versión instalada: https://nodejs.org/download/release/v18.12.0/ y usar MacOS o Windows.

# Instalación

Para instalar en su máquina local el proyecto, debe clonar este mismo repositorio:
https://gitlab.com/opunyed/breaking-traceability-tfg

Para clonar el proyecto, hay que acceder a la URL anterior (este mismo repositorio) y clicar en el botón azul de Clone, y seguidamente escoger si se desea clonar mediante HTTPS o SSH.

En el paso anterior se asume que el usuario tiene los conocimientos para clonar localmente un repositorio, de lo contrario, se recomienda seguir el siguiente tutorial oficial de GitLab: https://docs.gitlab.com/ee/gitlab-basics/start-using-git.html

Una vez clonado el proyecto, procedemos a la instalación de las dependencias. Las dependencias que tiene el proyecto para poder arrancar, se encuentran en el archivo package.json.

Para proceder a la instalación de todas estas dependencias, hay que situarse en la raíz del proyecto y lanzar el comando:

```
npm install
```

Este comando realizará la instalación limpia de todas las dependencias del proyecto en la versión especificada tal y como se especifica en el archivo package.json. 

Esta instalación puede demorarse un rato, sin embargo, tan solo tendrá que realizarse una vez.

# Uso

Una vez se tiene todo instalado, tan solo queda levantar el servidor de desarrollo en local, para ello hay que lanzar el siguiente comando desde la raíz del proyecto:

```
npm run start
```

Ejecutado el comando anterior, el servidor se levantará por defecto en http://localhost:3000

Con todos los pasos seguidos hasta aquí, el usuario ya dispone de todas las herramientas necesarias instaladas y con el servidor de desarrollo levantado para desarrollar las acciones deseadas al proyecto.