const config = {
    initialColorMode: "light",
    useSystemColorMode: false,
    disableTransitionOnChange: false,
}
const theme = {
  styles: {
    global: () => ({
      "*": {
        transition: "background-color .3s linear",
      },
    }),
  },
  config
};

export default theme;