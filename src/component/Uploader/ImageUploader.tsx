import OSSService from "../../utils/OSSService/OSSService.ts";
import generateRandomId from "../../utils/generateRandomId";
import { useEffect, useRef, useState } from "react";
import AlertService from "../../utils/AlertService";
import ArrowPathIcon from "@heroicons/react/20/solid/ArrowPathIcon";
import DocumentDuplicateIcon from "@heroicons/react/20/solid/DocumentDuplicateIcon";
import copyToClipboard from "../../utils/writeClipboard.ts";
import TrashIcon from "@heroicons/react/20/solid/TrashIcon";

type ImageResourceProps = {
	readonly file: File;
	onRemove: () => void;
};

enum UploadStatus {
	init,
	uploading,
	done,
	error,
}

async function uploadFile(file: File): Promise<string> {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	OSSService.useBucket("misaka-temp-bucket");
	return (
		await OSSService.put(
			generateRandomId() +
				file.name.substring(file.name.lastIndexOf(".")),
			file,
		)
	).url;
}

export default function ImageResource({ file, onRemove }: ImageResourceProps) {
	const [uploadingStatus, setUploadingStatus] = useState(UploadStatus.init);
	const [localImgURL, setLocalImgURL] = useState<string>("");
	const finalURL = useRef<string>("");
	useEffect(() => {
		setLocalImgURL(URL.createObjectURL(file));
		return () => {
			localImgURL && URL.revokeObjectURL(localImgURL);
		};
	}, []);

	function handleFile() {
		if (uploadingStatus === UploadStatus.done) return;
		setUploadingStatus(UploadStatus.uploading);
		uploadFile(file)
			.then((result) => {
				finalURL.current = result;
				setUploadingStatus(UploadStatus.done);
			})
			.catch((error: Error) => {
				AlertService.error(error.message);
				setUploadingStatus(UploadStatus.error);
			});
	}

	return (
		<div className={["relative", "mb-2"].join(" ")}>
			<img
				src={localImgURL}
				alt=""
				className={"peer"}
				onLoad={handleFile}
			/>
			{uploadingStatus !== UploadStatus.init ? (
				<div
					className={[
						"z-10",
						"absolute",
						"left-0",
						"top-0",
						"bg-gray-500",
						"bg-opacity-20",
						"flex",
						"justify-center",
						"items-center",
						"w-full",
						"h-full",
						"peer-hover:visible",
						"hover:visible",
						uploadingStatus === UploadStatus.done
							? "invisible"
							: null,
					].join(" ")}
				>
					{uploadingStatus !== UploadStatus.done ? (
						<ArrowPathIcon
							className={[
								uploadingStatus === UploadStatus.uploading
									? "animate-spin"
									: "hover:animate-spin-once",
								"cursor-pointer",
								"w-12",
							].join(" ")}
							onClick={handleFile}
						/>
					) : (
						<>
							<DocumentDuplicateIcon
								className={["cursor-pointer", "w-8"].join(" ")}
								onClick={() =>
									copyToClipboard(
										`![${file.name}](${finalURL.current})`,
									)
								}
							/>
							<TrashIcon
								className={["cursor-pointer", "w-8"].join(" ")}
								onClick={onRemove}
							/>
						</>
					)}
				</div>
			) : null}
		</div>
	);
}
