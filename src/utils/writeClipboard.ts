import AlertService from "./AlertService";

export default function copyToClipboard(text: string) {
	navigator.clipboard
		.writeText(text)
		.then(() => {
			AlertService.info("复制成功");
		})
		.catch((err) => {
			AlertService.info("Failed to copy text: " + err);
		});
}
