import { useEffect, useState } from "react";
import ImageResource from "../../../component/Uploader/ImageUploader.tsx";

interface Props {
	imgList: string[];
}

export default function UploadImageList(props: Props) {
	const [fileList, setFileList] = useState<Array<File | string>>([]);
	useEffect(() => {
		setFileList([
			...fileList.filter((it) => typeof it !== "string"),
			...props.imgList,
		]);
	}, [props]);
	return (
		<div
			className={[
				"h-full",
				"overflow-y-auto",
				"empty:after:content-['将图片拖动到这里上传']",
			].join(" ")}
			onDragOver={(e) => e.preventDefault()}
			onDrop={(e) => {
				e.preventDefault();
				setFileList(fileList.concat(Array.from(e.dataTransfer.files)));
			}}
		>
			{fileList.map((it, index) => (
				<ImageResource
					file={it}
					key={typeof it === "string" ? it : it.size}
					onRemove={() => {
						fileList.splice(index, 1);
						setFileList([...fileList]);
					}}
				/>
			))}
		</div>
	);
}
