import axios from "axios";

const requestServer = axios.create({
	baseURL: "/internalApi",
});
export default requestServer;
