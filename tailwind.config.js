/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                test: "#0B192C",
                test2: "#1E3E62",
                test3: "#153448",
                test4: "#153448",
                test5: "#164B60"
            },
        },
    },
    plugins: [],
} 