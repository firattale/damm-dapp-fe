import { useLogs } from "@usedapp/core";
import metadatas from "@my-app/contracts/src/metadata.json";
import { Image, ImageContainer } from "../components";

export const useTokenIds = (filter) => {
	const logs = useLogs(filter, {
		fromBlock: 0,
		toBlock: "latest",
	});
	if (logs?.value) {
		return logs.value.map((value) => {
			return +value.data[2];
		});
	}
	return null;
};

export const showNFTs = (userTokens) => {
	return userTokens ? (
		metadatas
			.filter((metadata) => {
				return userTokens.includes(metadata.id);
			})
			.map((metadata, index) => {
				return (
					<ImageContainer key={index}>
						<Image src={metadata.ipfs_image} />
						<p>{metadata.name}</p>
					</ImageContainer>
				);
			})
	) : (
		<>Loading...</>
	);
};
