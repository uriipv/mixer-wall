# Hardhat - Breaking traceability

Este repositorio dispone del código del trabajo de final de grado de Oriol Punyed Vilabella, del área de sistemas distribuidos.

Para crear un entorno de pruebas donde poder tener tu nodo de blockchain en tu maquina local, se ha utilizado Hardhat. Con este framework podremos montar un entorno de desarrollo en local donde poder probar todos los cambios que hagamos al smart contract sin la necesidad de tener que desplegarlo en una red real.

# Requerimientos

- Se requiere tener NodeJS instalado.

IMPORTANTE: Este proyecto se ha realizado sobre la versión v18.12.0 de NodeJS y se ha probado en MacOS y en Windows, por lo que se recomienda tener instalada esta versión instalada: https://nodejs.org/download/release/v18.12.0/ y usar MacOS o Windows.

# Instalación

Para instalar en su máquina local el proyecto, debe clonar este mismo repositorio:
https://gitlab.com/opunyed/hardhat-tfg

Para clonar el proyecto, hay que acceder a la URL anterior (este mismo repositorio) y clicar en el botón azul de Clone, y seguidamente escoger si se desea clonar mediante HTTPS o SSH.

En el paso anterior se asume que el usuario tiene los conocimientos para clonar localmente un repositorio, de lo contrario, se recomienda seguir el siguiente tutorial oficial de GitLab: https://docs.gitlab.com/ee/gitlab-basics/start-using-git.html

Una vez descargado el proyecto, procedemos a la instalación de las dependencias. Las dependencias que tiene el proyecto para poder arrancar, se encuentran en el archivo package.json.

Para proceder a la instalación de todas estas dependencias, hay que situarse en la raíz del proyecto y lanzar el comando:

```
npm install
```

Este comando realizará la instalación limpia de todas las dependencias del proyecto en la versión especificada tal y como se especifica en el archivo package.json.

Esta instalación puede demorarse un rato, sin embargo, tan solo tendrá que realizarse una vez.

# Uso

El próximo paso es levantar un servidor JSON-RPC sobre Hardhat Network, con esto se creará una blockchain en local, siendo nuestro ordenador un nodo el cual validará las transacciones. Para ello, hay que lanzar el comando:

```
npx hardhat node
```

Seguidamente, una vez levantado el nodo, ahora hay que desplegar el smart contract en la blockchain local. El smart contract se encuentra en la carpeta de contracts pero primero hay que compilarlo para seguidamente desplegarlo. Para ello hay que lanzar el comando:

```
npx hardhat compile
```

Una vez compilado, ahora hay que hacer el despliegue. Para ello Hardhat te facilita un script el cual solo hay que adaptar cual es el smart contract que deseas desplegar indicando el nombre del smart contract situado en la carpeta de contracts.

Seguidamente, ya teniendo el script apuntando al smart contract que deseamos publicar en la red, tan solo hay que lanzar el siguiente comando:

```
npx hardhat run scripts/deploy.js --network localhost
```

Con los pasos anteriores ya hemos montado el entorno de desarrollo y podríamos conectar el frontend a la red de localhost para así realizar las pruebas pertinentes o ejecutarlo en otra red si así se desea.