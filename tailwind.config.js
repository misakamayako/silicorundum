import generated from "@tailwindcss/forms";

/** @type {import("tailwindcss").Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			animation: {
				"spin-once": "spin-once .4s linear",
			},
			keyframes: {
				"spin-once": {
					"0%": { transform: "rotate(0deg)" },
					"100%": { transform: "rotate(360deg)" },
				},
			},
		},
	},
	plugins: [generated],
};
