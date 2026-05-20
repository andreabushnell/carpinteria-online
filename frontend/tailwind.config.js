export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      colors: {
        primary: "#8B5E3C",
        footer: "#5B3A29",
        accent: "#3FA37C",
        bg: "#F7F5F2",
        surface: "#FFFFFF",
        text: "#2F2F2F",
        muted: "#6B7280",
        border: "#E5E7EB",
        hover: "#F1EFEB",
      },

      fontFamily: {
        display: ["Orbitron", "sans-serif"],
        body: ["Chakra Petch", "sans-serif"],
      },

      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "14px",
      },

      boxShadow: {
        sm: "0 2px 6px rgba(0,0,0,0.08)",
        md: "0 4px 12px rgba(0,0,0,0.12)",
      },

      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "40px",
      },
    },
  },

  plugins: [],
};