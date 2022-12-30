import { useLogs } from "@usedapp/core";

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
