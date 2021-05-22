import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Arial, Helvetica, sans-serif;
    color: ${({ theme }) => theme.colors.main};
    background-color: ${({ theme }) => theme.colors.background}
  }
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.ted}
  }
`;

export default GlobalStyle;
