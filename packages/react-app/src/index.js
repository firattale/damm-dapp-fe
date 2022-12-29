import "./index.css";

import { DAppProvider, Hardhat } from "@usedapp/core";
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

// IMPORTANT, PLEASE READ
// To avoid disruptions in your app, change this to your own Infura project id.
// https://infura.io/register
// const INFURA_PROJECT_ID = "8b60443ba0a642fd90aa5f5799b0321c";
const config = {
	readOnlyChainId: Hardhat.chainId,
	readOnlyUrls: {
		[Hardhat.chainId]: Hardhat.rpcUrl,
	},
};

ReactDOM.render(
	<React.StrictMode>
		<DAppProvider config={config}>
			<App />
		</DAppProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
