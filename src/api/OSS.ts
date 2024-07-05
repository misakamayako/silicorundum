import requestServer from "../utils/request";

export const getOssSTS = () => {
	return requestServer<ResponseDTO<STSDTO>>("/access/sts");
};
