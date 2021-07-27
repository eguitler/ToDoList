import { css } from "@emotion/react";

const GlobalStyles = css`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;

        font-family: ---apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        color: #222;
        outline: none;
        -webkit-tap-highlight-color: transparent;
    }

    body {
        background-color: #f0f0f0;

        & ul {
            list-style: none;
        }

        & a {
            text-decoration: none;
            cursor: pointer;
        }
    }
`;

export default GlobalStyles;
