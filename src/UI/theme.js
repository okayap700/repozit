import "@fontsource/poppins";
import "@fontsource/roboto";
import "@fontsource/prociono"
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      over: "#554D45",
      white: "#FFFFFF",
      gre: "#F5ECEB",
      ash: 'rgba(173, 142, 130, 255)',
      brown: "#4B2E2A",
      beig: "#958A7C",
      brow: "#f2e3df",
      gree: "#405433",
      blac: "#2F2C2C",
    },
  },

  fonts: {
    heading: "sans-serif, ",
    body: "Poppins, Roboto, Prociono, sans-serif",
  },

  styles: {
    global: {
      body: {
        bg: "brand.beige",
        color: "",
      },
      a: {
        color: "",
        _hover: {
          textDecoration: "underline",
          color: "",
        },
      },
    },
    components: {
      Button: {
        baseStyle: {
          borderRadius: "full",
          fontWeight: "bold",
        },
        // variants: {
        //     solid: {
        //         bg: "brand.500",
        //         color: "white",
        //         _hover: {
        //             bg: "brand.600",
        //         },
        //     },
        //     primary: {
        //         bg: "brand.500",
        //         color: "white",
        //         _hover: {
        //             bg: "brand.600",
        //         },
        //     },
        //     secondary: {
        //         bg: "gray.50",
        //         color: "gray.700",
        //         _hover: {
        //             bg: "gray.100",
        //         },
        //     },
        // },
      },
    },
  },
});

export default theme;
