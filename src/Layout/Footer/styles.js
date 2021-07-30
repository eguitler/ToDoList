import styled from "@emotion/styled";

export const FooterStyled = styled.footer`
    height: 100px;
    margin-top: 50px;
    width: 100%;
    display: grid;
    place-items: center;
    box-shadow: 0 0 10px rgba(1,1,1, .3);
    span {
        color: rgba(1,1,1, .5);

        a {
            text-decoration: underline;
        }
    }
`