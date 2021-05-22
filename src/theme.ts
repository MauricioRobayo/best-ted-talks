type ThemeType = {
  colors: {
    ted: "#E62B1E";
    main: string;
    secondary: string;
    background: string;
  };
};

declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {}
}

const themes: { light: ThemeType; dark: ThemeType } = {
  light: {
    colors: {
      ted: "#E62B1E",
      main: "#444",
      secondary: "#666",
      background: "white",
    },
  },
  dark: {
    colors: {
      ted: "#E62B1E",
      main: "white",
      secondary: "#ddd",
      background: "#111821",
    },
  },
};

export default themes;
