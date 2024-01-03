// // /** @type {import('tailwindcss').Config} */
// export default {
//   darkMode: ["class"],
// content: [
//   "./pages/**/*.{js,jsx}",
//   "./components/**/*.{js,jsx}",
//   "./app/**/*.{js,jsx}",
//   "./src/**/*.{js,jsx}",
// ],
//   theme: {
//     container: {
//       center: true,
//       padding: "2rem",
//       screens: {
//         "2xl": "1400px",
//       },
//     },
//     extend: {
//       colors: {
//         bgPrimary: "pink-600",
//         bgSecondary: "#212130",
//         bgTertiary: "#282D42",
//         bgQuaternary: "fuchsia-600",
//         textPrimary: "white",
//         textSecondary: "pink-600",
//         textTertiary: "slate-400",
//       },
//       screens: {
//         xs: "480px",
//         ss: "700px",
//         sm: "780px",
//         md: "1024px",
//         lg: "1186px",
//         xl: "1260px",
//         "2xl": "1536px",
//       },
//       boxShadow: {
//         card: "0px 35px 120px -15px #211e35",
//       },
//       keyframes: {
//         "accordion-down": {
//           from: { height: "0" },
//           to: { height: "var(--radix-accordion-content-height)" },
//         },
//         "accordion-up": {
//           from: { height: "var(--radix-accordion-content-height)" },
//           to: { height: "0" },
//         },
//       },
//       animation: {
//         "accordion-down": "accordion-down 0.2s ease-out",
//         "accordion-up": "accordion-up 0.2s ease-out",
//       },
//     },
//   },
//   plugins: [require("tailwindcss-animate")],
// };

//   /** @type {import('tailwindcss').Config} */

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        bgPrimary: "pink-600",
        bgSecondary: "#212130",
        bgTertiary: "#282D42",
        bgQuaternary: "fuchsia-600",
        textPrimary: "white",
        textSecondary: "pink-600",
        textTertiary: "slate-400",
      },
      screens: {
        xs: "480px",
        ss: "700px",
        sm: "780px",
        md: "900px",
        lg: "1024px",
        xl: "1330px",
        "2xl": "1536px",
        res : "1290px"
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "slide-in": {
          "0%": {
            transform: "translateX(-200px)",
          },
          "100%": {
            transform: "translateX(0px)",
          },
        },
        "slide-fwd": {
          "0%": {
            transform: "translateX(200px)",
          },
          "100%": {
            transform: "translateX(0px)",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-out": {
          "0%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
          },
        },
        "fade-out-up": {
          "0%": {
            opacity: "1",
            transform: "translateY(0)",
          },
          "100%": {
            opacity: "0",
            transform: "translateY(-20px)",
          },
        },
        shimmer: {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: "0.5",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-in": "slide-in 0.5s ease-out",
        "slide-fwd":
          "slide-fwd 0.45s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "fade-in": "fade-in 0.5s ease-out",
        "fade-in-up": "fade-in-up 0.5s ease-out",
        "fade-out": "fade-out 0.5s ease-out",
        "fade-out-up": "fade-out-up 0.5s ease-out",
        "shimmer": "shimmer 1.5s ease-in-out infinite",
      },
      fontFamily : {
        "poppins" : "Poppins"
      }
    },

  },
  plugins: [require("tailwindcss-animate")],
};
