import "./index.css";

import { DAppProvider, Hardhat } from "@usedapp/core";
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
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
