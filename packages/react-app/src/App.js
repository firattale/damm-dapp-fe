import { Contract } from "@ethersproject/contracts";
import { shortenAddress, useCall, useEthers } from "@usedapp/core";
import React, { useEffect, useState } from "react";

import { Body, Button, Container, Header, Image, Link } from "./components";
import logo from "./ethereumLogo.png";

import { addresses, abis } from "@my-app/contracts";
function WalletButton() {
	const [rendered, setRendered] = useState("");

	// const { ens } = useLookupAddress();
	const { account, activateBrowserWallet, deactivate, error } = useEthers();

	useEffect(() => {
		// if (ens) {
		// 	setRendered(ens);
		// } else
		if (account) {
			setRendered(shortenAddress(account));
		} else {
			setRendered("");
		}
	}, [account, setRendered]);

	useEffect(() => {
		if (error) {
			console.error("Error while connecting wallet:", error.message);
		}
	}, [error]);

	return (
		<Button
			onClick={() => {
				if (!account) {
					activateBrowserWallet();
				} else {
					deactivate();
				}
			}}
		>
			{rendered === "" && "Connect Wallet"}
			{rendered !== "" && rendered}
		</Button>
	);
}

function App() {
	// Read more about useDapp on https://usedapp.io/
	const { error: contractCallError, value: tokenBalance } =
		useCall({
			contract: new Contract(addresses.nftContract, abis.erc721),
			method: "name",
			args: [],
		}) ?? {};
	console.log("tokenBalance :>> ", tokenBalance);
	console.log("contractCallError :>> ", contractCallError);
	return (
		<Container>
			<Header>
				<WalletButton />
			</Header>
			<Body>
				<Image src={logo} alt="ethereum-logo" />
				<p>
					Edit <code>packages/react-app/src/App.js</code> and save to reload.
				</p>
				<Link href="https://reactjs.org">Learn React</Link>
				<Link href="https://usedapp.io/">Learn useDapp</Link>
				<Link href="https://thegraph.com/docs/quick-start">Learn The Graph</Link>
			</Body>
		</Container>
	);
}

export default App;
