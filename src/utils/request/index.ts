import axios from "axios";
import AlertService from "../AlertService";

const requestServer = axios.create({
	baseURL: "/internalApi",
});
requestServer.interceptors.response.use(
	function success(res) {
		return res;
	},
	function error(error) {
		const message: string =
			error?.response?.data?.message ?? error?.message ?? "未知错误";
		AlertService.error(message);
		return Promise.reject(error);
	},
);
export default requestServer;
