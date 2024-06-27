import { useState } from "react";
import ImageResource from "../../../component/Uploader/ImageUploader.tsx";

export default function UploadImageList() {
	const [fileList, setFileList] = useState<File[]>([]);
	return (
		<div
			className={["h-full", "overflow-y-auto"].join(" ")}
			onDrop={(e) => {
				e.preventDefault();
				setFileList(fileList.concat(Array.from(e.dataTransfer.files)));
			}}
			onDragOver={(e) => e.preventDefault()}
		>
			{fileList.map((it, index) => (
				<ImageResource
					key={it.size}
					file={it}
					onRemove={() => {
						fileList.splice(index, 1);
						setFileList([...fileList]);
					}}
				/>
			))}
		</div>
	);
}
