import OSS from "ali-oss";
import { getOssSTS } from "../../api/OSS.ts";

const refreshSTSToken = async () => {
	const info = (await getOssSTS()).data.data;
	return {
		accessKeyId: info.accessKeyId,
		accessKeySecret: info.accessKeySecret,
		stsToken: info.securityToken,
	};
};
const initData = await refreshSTSToken();
const OSSService = new OSS({
	accessKeyId: initData.accessKeyId,
	accessKeySecret: initData.accessKeySecret,
	stsToken: initData.stsToken,
	region: "oss-cn-shanghai",
	refreshSTSToken,
	refreshSTSTokenInterval: 300000,
});
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
window.OSSService = OSSService;
export default OSSService;
