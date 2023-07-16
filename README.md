# Mixer Wall - Breaking traceability

This repository has the code of my final degree project, from distributed systems area.

Mixer Wall, is a project that tries to demonstrate how despite the great traceability and transparency offered by the blockchain, it is possible to break the traceability of a transaction, losing the possibility to follow its trace.

# Requirements

- It is required to have NodeJS installed.

IMPORTANT: This project is built on NodeJS version v18.12.0 and has been tested on MacOS and Windows, so it is recommended to have this version installed: https://nodejs.org/download/release/v18.12.0/ and use MacOS or Windows.

# Installation

To install the project on your local machine, you must clone this same repository:
https://github.com/uriipv/mixer-wall.git

In the previous step it is assumed that the user has the knowledge to clone a repository locally, otherwise, it is recommended to follow the following official GitHub tutorial:  https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository


Once the project is cloned, we proceed to install the dependencies. The dependencies that the project has to be able to start, are in the package.json file.

To proceed with the installation of all these dependencies, we must go to the root of the project and launch the command:

```
npm install
```

This command will perform a clean installation of all project dependencies in the specified version as specified in the package.json file. 

This installation may take a while, however, it will only need to be performed once.

# Usage

Once everything is installed, the only thing left to do is to start the development server locally, to do so, launch the following command from the root of the project:

```
npm run start
```

After executing the above command, the server will be up by default at http://localhost:3000.

With all the steps followed up to this point, the user already has all the necessary tools installed and the development server up to develop the desired actions for the project.
