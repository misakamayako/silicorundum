import OSS from "ali-oss";
import { getOssSTS } from "../../api/OSS.ts";
import LazyBy from "../lazyBy.ts";

const refreshSTSToken = async () => {
	const info = (await getOssSTS()).data.data;
	return {
		accessKeyId: info.accessKeyId,
		accessKeySecret: info.accessKeySecret,
		stsToken: info.securityToken,
	};
};

const OSSService = new LazyBy<OSS>(async () => {
	const initData = await refreshSTSToken();
	return new OSS({
		accessKeyId: initData.accessKeyId,
		accessKeySecret: initData.accessKeySecret,
		stsToken: initData.stsToken,
		region: "oss-cn-shanghai",
		refreshSTSToken,
		refreshSTSTokenInterval: 300000,
	});
});
export default OSSService;
