import { useState } from "react";
import ImageResource from "../../../component/Uploader/ImageUploader.tsx";

export default function UploadImageList() {
	const [fileList, setFileList] = useState<File[]>([]);
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
					key={it.size}
					onRemove={() => {
						fileList.splice(index, 1);
						setFileList([...fileList]);
					}}
				/>
			))}
		</div>
	);
}
