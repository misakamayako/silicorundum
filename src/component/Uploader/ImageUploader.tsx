import { useState } from "react";
import { Loading } from "../Loading/Loading.tsx";

interface ImageUploaderProps {
	file: File;
}
export function ImageUploader(props: ImageUploaderProps) {
	const [loading, setLoading] = useState(true);
	const [fileUrl, setFileUrl] = useState("");
	const fileReader = new FileReader();
	fileReader.onload = (e) => {
		setFileUrl(e.target!.result as string);
	};
	fileReader.readAsDataURL(props.file);
	function copyUrl() {
		if (!loading) navigator.clipboard.writeText(fileUrl);
	}
	return (
		<div onClick={copyUrl}>
			<img src={fileUrl} alt="" className={"w-full"} />
			{loading ? <Loading /> : null}
		</div>
	);
}
