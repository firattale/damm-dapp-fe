import { Contract } from "@ethersproject/contracts";
import { shortenAddress, useCall, useEthers, useLookupAddress } from "@usedapp/core";
import React, { useEffect, useState } from "react";
import { useTokenIds } from "./hooks/getTokenIds";
import { Body, Button, Container, Header } from "./components";

import { addresses, abis } from "@my-app/contracts";
function WalletButton() {
	const [rendered, setRendered] = useState("");

	const { ens } = useLookupAddress();
	const { account, activateBrowserWallet, deactivate, error } = useEthers();

	useEffect(() => {
		if (ens) {
			setRendered(ens);
		} else if (account) {
			setRendered(shortenAddress(account));
		} else {
			setRendered("");
		}
	}, [account, ens, setRendered]);

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
	const nftContract = React.useMemo(() => new Contract(addresses.nftContract, abis.erc721), []);
	const { account } = useEthers();
	const filter = {
		contract: nftContract,
		event: "Transfer",
		args: [null, account],
	};
	const userTokens = useTokenIds(filter);
	const { error: contractCallError, value } =
		useCall({
			contract: nftContract,
			method: "tokenURI",
			args: ["0"],
		}) ?? {};

	useEffect(() => {
		console.log("userTokens", userTokens);
		console.log("value :>> ", value);
	}, [userTokens, value]);

	return (
		<Container>
			<Header>
				<WalletButton />
			</Header>
			<Body></Body>
		</Container>
	);
}

export default App;
