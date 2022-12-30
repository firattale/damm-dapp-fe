This project was bootstrapped with [Create Eth App](https://github.com/paulrberg/create-eth-app).

## Project Structure

The default template is a monorepo created with [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/).

Workspaces makes it possible to setup multiple packages in such a way that we only need to run `yarn install` once to install all of them in
a single pass. Dependencies are hoisted at the root.

```
my-eth-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
└── packages
    ├── contracts
    │   ├── README.json
    │   ├── package.json
    │   └── src
    │       ├── abis
    │       │   ├── erc20.json
    │       │   └── ownable.json
    │       ├── addresses.js
    │       └── index.js
    ├── react-app
       ├── README.md
       ├── node_modules
       ├── package.json
       ├── public
       │   ├── favicon.ico
       │   ├── index.html
       │   ├── logo512.png
       │   ├── manifest.json
       │   └── robots.txt
       ├── logo192.png
       └── src
           ├── App.css
           ├── App.js
           ├── App.test.js
           ├── index.css
           ├── index.js
           ├── serviceWorker.js
           └── setupTests.js


```

Owing to this dependency on Yarn Workspaces, Create Eth App can't be used with npm.

## Available Scripts

- `cd packages/contracts` - get into the contracts folder
- `npx hardhat node` - run a hardhat node
- `npx hardhat run --network localhost scripts/deploy.js` - deploy the contact to hardhat network
- copy the contract address from terminal and paste it to /contracts/src/addresses.js
- you need to get the first account private key from Hardhat Node and add it to your Metamask with Localhost Net .
- `react-app:start` to start FE project in the main folder.
- Once you connect your wallet you will see the NFT's on the screen.
