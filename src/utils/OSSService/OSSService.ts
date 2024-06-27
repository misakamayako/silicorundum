import OSS from "ali-oss";
import { getOssSTS } from "../../api/OSS.ts";
const init = (await getOssSTS()).data;
const OSSService = new OSS({
	accessKeyId: init.accessKeyId,
	accessKeySecret: init.accessKeySecret,
	stsToken: init.securityToken,
	region: "oss-cn-shanghai",
	refreshSTSToken: async () => {
		const info = (await getOssSTS()).data;
		return {
			accessKeyId: info.accessKeyId,
			accessKeySecret: info.accessKeySecret,
			stsToken: info.securityToken,
		};
	},
	refreshSTSTokenInterval: 300000,
});

export default OSSService;
