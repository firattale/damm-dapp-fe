import { Contract } from "@ethersproject/contracts";
import { shortenAddress, useEthers, useLookupAddress } from "@usedapp/core";
import React, { useEffect, useState } from "react";
import { useTokenIds, showNFTs } from "./hooks";
import { Body, Button, Container, Header, FlexBox } from "./components";

import { addresses, abis } from "@my-app/contracts";
const WalletButton = () => {
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
};

const App = () => {
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
				<h1>Your NFT Collection</h1>
				{account && <FlexBox>{showNFTs(userTokens)}</FlexBox>}
			</Body>
		</Container>
	);
};

export default App;
