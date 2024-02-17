/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./index.html',
		'./src/**/*.{html,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gryffindor': "url('./icons/gryffindor.png')",
				'hufflepuff': "url('./icons/hufflepuff.png')",
				'ravenclaw': "url('./icons/ravenclaw.png')",
				'slytherin': "url('./icons/slytherin.png')"
			}
		},
	},
	plugins: [],
}

