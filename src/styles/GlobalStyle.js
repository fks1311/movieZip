const { createGlobalStyle } = require("styled-components");
const { default: reset } = require("styled-reset");
import "@/styles/font.css";

const GlobalStyle = createGlobalStyle`
html {
    ${reset}
    font-size:62.5%;
    // padding:2em 3em;
    font-family: 'establishRetrosansOTF', sans-serif;
    background-color: ${({ theme }) => theme.color.bgColor};
}`;

export default GlobalStyle;
