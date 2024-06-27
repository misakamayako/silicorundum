import requestServer from "../utils/request";

export const getOssSTS = () => {
	return requestServer<STSDTO>("/access/sts");
};
