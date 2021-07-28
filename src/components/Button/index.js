import styled from "@emotion/styled";
import React from "react";

const ButtonStyled = styled.button`
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
        background-color: #2E89FF;
        border: 1px solid #2E89FF;
        color: #f0f0f0;
    }
    
    &.default {
        background-color: transparent;
        border: 1px solid #2E89FF;
        color: #2E89FF;
    }

    &.disabled {
        pointer-events: none;
        opacity: .7;
        filter: saturate(.5)
    }
`;

const Button = ({ text, primary = false, onClick = null, disabled=false }) => {
    return (
        <ButtonStyled
            className={`${primary ? "primary" : "default"} ${disabled ? "disabled" : ""}`}
            onClick={onClick}
        >
            {text}
        </ButtonStyled>
    );
};

export default Button;
