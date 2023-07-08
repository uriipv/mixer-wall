# Hardhat - Breaking traceability

This repository has the code of my final degree project, from distributed systems area.

Mixer Wall, is a project that tries to demonstrate how despite the great traceability and transparency offered by the blockchain, it is possible to break the traceability of a transaction, losing the possibility to follow its trace.

# Requerimientos

- It is required to have NodeJS installed.

IMPORTANT: This project is built on NodeJS version v18.12.0 and has been tested on MacOS and Windows, so it is recommended to have this version installed: https://nodejs.org/download/release/v18.12.0/ and use MacOS or Windows.

# Instalación

To install the project on your local machine, please, run the following command:

```
npm install
```

This command will perform a clean installation of all project dependencies in the specified version as specified in the package.json file.

This installation may take a while, however, it will only need to be performed once.

# Usage

The next step is to set up a JSON-RPC server on Hardhat Network, this will create a blockchain locally, being our computer a node which will validate the transactions. To do this, we must launch the command:

```
npx hardhat node
```

Next, once the node is up, the smart contract must now be deployed on the local blockchain. The smart contract is located in the contracts folder but first it must be compiled and then deployed. To do this, the command

```
npx hardhat compile
```

Once compiled, now you have to deploy. To do this Hardhat provides you with a script which you just have to adapt which is the smart contract you want to deploy indicating the name of the smart contract located in the contracts folder.

Then, having the script pointing to the smart contract you want to publish on the network, you just have to launch the following command:

```
npx hardhat run scripts/deploy.js --network localhost
```

With the previous steps we have already set up the development environment and we could connect the frontend to the localhost network to perform the relevant tests or run it on another network if desired.
