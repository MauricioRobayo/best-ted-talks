type ThemeType = typeof defaultTheme;

declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {}
}

const defaultTheme = {
  colors: {
    ted: "#E62B1E",
    main: "#444",
  },
};

export default defaultTheme;
