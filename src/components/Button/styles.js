import styled from "@emotion/styled";

export const ButtonStyled = styled.button`
    height: 100%;
    width: 100%;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    user-select: none;
    opacity: 1;
    filter: saturate(1);
    transition: all 300ms;

    &.primary {
        background-color: rgba(46, 137, 255, 0.8);
        border: none;
        color: #f0f0f0;

        :hover {
            background-color: rgba(46, 137, 255, 1);
        }
    }

    &.default {
        background-color: transparent;
        border: 1px solid transparent;
        color: rgba(46, 137, 255, 1);

        :hover {
            border: 1px solid rgba(46, 137, 255, 1);
        }
    }

    &.disabled {
        pointer-events: none;
        opacity: 0.7;
        filter: saturate(0.3);
    }
`;
