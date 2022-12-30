import { Contract } from "@ethersproject/contracts";
import { shortenAddress, useEthers, useLookupAddress } from "@usedapp/core";
import React, { useEffect, useState } from "react";
import { useTokenIds } from "./hooks/getTokenIds";
import { Body, Button, Container, Header, Image } from "./components";
import metadatas from "@my-app/contracts/src/metadata.json";

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
	const nftContract = React.useMemo(() => new Contract(addresses.nftContract, abis.erc721), []);
	const { account } = useEthers();
	const filter = {
		contract: nftContract,
		event: "Transfer",
		args: [null, account],
	};
	const userTokens = useTokenIds(filter);

	return (
		<Container>
			<Header>
				<WalletButton />
			</Header>
			<Body>
				{userTokens &&
					metadatas
						.filter((metadata) => {
							return userTokens.includes(metadata.id);
						})
						.map((metadata, index) => {
							return <Image key={index} src={metadata.google_image} />;
						})}
			</Body>
		</Container>
	);
}

export default App;
