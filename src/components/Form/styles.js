import styled from "@emotion/styled";

export const FormStyled = styled.form`
    height: 80px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 5px;

    input {
        height: 50%;
        padding: 5px;
        border-radius: 5px;
        border: 1px solid rgba(1, 1, 1, 0.3);
        flex-grow: 1;

        :focus {
            border: 1px solid rgba(46, 137, 255, 0.8);
            box-shadow: 0 0 5px rgba(46, 137, 255, 0.5);
        }
    }

    .button-wrapper {
        height: 50%;
        width: 100%;
    }

    @media screen and (min-width: 360px) {
        flex-direction: row;
        height: 40px;

        input {
            height: 100%;
        }

        .button-wrapper {
            width: 80px;
            height: 100%;
        }
    }
`;
