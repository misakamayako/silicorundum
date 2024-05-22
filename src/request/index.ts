import axios from "axios";

const instance = axios.create({
	baseURL: "internalApi",
});
instance.interceptors.response.use(response => {
	if (response.status == 401) {
		window.location.href = "/login";
	}
	return response;
});
export default instance